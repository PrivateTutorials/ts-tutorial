import {Project, ProjectStatus} from "./project-model";
import {Draggable, DragTarget} from "./drag-drop-interfaces";

function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor): any { // methodName - просто имя метода, а descriptor - сама его суть
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };

    return adjustedDescriptor; // возвращаем подправленную суть метода
}

interface Validatable {
    value: string | number;
    required?: boolean; // ? the same as <==> boolean | undefined
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable): boolean {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    public addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    public addProject(title: string, description: string, amountOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, amountOfPeople);

        this.projects.push(newProject);
        this.updateListeners();
    }

    public moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find((project) => project.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // slice - to return a copy of an array
        }
    }
}

const projectState = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!; // <HTMLTemplateElement> is the same as <==> "as HTMLTemplateElement"
        this.hostElement = <T>document.getElementById(hostElementId)!;

        const importedNode = document.importNode(this.templateElement.content, true); // создает копию Node или DocumentFragment из другого документа, для последующей вставки в текущий документ
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(this.element, insertAtStart);
    }

    private attach(element: HTMLElement, insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', element);
    }

    abstract configure?(): void; // ? - optional method
    abstract renderContent(): void; // abstract method can't be private
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
        this.element.addEventListener('dragend', this.dragEndHandler.bind(this));
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title; // element == <li>
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned'; // this.persons - getter
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id); // dataTransfer - special DragEvent property. Attaches data to event
        event.dataTransfer!.effectAllowed = 'move' // how mouse pointer will look
    }

    dragEndHandler(event: DragEvent): void {
        console.log('Drag end');
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptioInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement; // the same as el.getElementById
        this.descriptioInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    public configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this)); // here this - is actual 'this' of a class
    }

    public renderContent(): void {
    }

    private gatherUserInput(): [string, string, number] | void {  // tuple
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptioInputElement.value;
        const enteredPeopleAmount = this.peopleInputElement.value;

        const titleValidatable = {value: enteredTitle, required: true};
        const descriptionValidatable = {value: enteredDescription, minLength: 5};
        const peopleValidatable = {value: +enteredPeopleAmount, min: 0, max: 100};

        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert('Invalid input');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeopleAmount];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptioInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
        // console.log(this.titleInputElement.value); // this points not to class, but to event that called the f() // or to current target of the event
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: ProjectStatus) {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    public configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler.bind(this));
        this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        this.element.addEventListener('drop', this.dropHandler.bind(this));

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === 'active';
                }
                return project.status === 'finished';
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    public renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId; // search the subElement and ad Id to it
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';

    }

    private renderProjects() {
        const ul = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        ul.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
        }
    }

    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') { // if data with that type is attached to our drag event
            // e.g. not allow to drop images
            event.preventDefault(); // default - not allows JS to drop items
            const ul = this.element.querySelector('ul')!;
            ul.classList.add('droppable');
        }

    }

    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? 'active' : 'finished');
    }

    dragLeaveHandler(event: DragEvent): void {
        const ul = this.element.querySelector('ul')!;
        ul.classList.remove('droppable');
    }
}

const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');
