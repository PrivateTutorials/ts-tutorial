// to be used with submitHandler f()
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

type ProjectStatus = 'active' | 'finished';

enum ProjectStatusEnum { Active, Finished };

class Project {
    status: ProjectStatus;

    constructor(public id: string, public title: string, public description: string, public people: number) {
        this.status = 'active';
    }

}

type Listener = (items: Project[]) => void;

class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
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
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // slice - to return a copy of an array
        }
    }

    public addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }
}

const projectState = ProjectState.getInstance();

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptioInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!; // <HTMLTemplateElement> is the same as <==> as HTMLTemplateElement
        this.hostElement = <HTMLDivElement>document.getElementById('app')!;

        const importedNode = document.importNode(this.templateElement.content, true); // content property exists on HTMLTemplateElement. true - deep import. Returns <form> with children
        this.element = importedNode.firstElementChild as HTMLFormElement; // this.element => form
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement; // the same as el.getElementById
        this.descriptioInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.attach(this.element);
        this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {  // tuple
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptioInputElement.value;
        const enteredPeopleAmount = this.peopleInputElement.value;

        const titleValidatable = {value: enteredTitle, required: true};
        const descriptionValidatable = {value: enteredDescription, minLength: 5};
        const peopleValidatable = {value: +enteredPeopleAmount, min: 0, max: 10};

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

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this)); // here this - is actual 'this' of a class
    }

    private attach(element: HTMLElement) {
        this.hostElement.insertAdjacentElement('afterbegin', element);
    }
}

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[] = [];

    constructor(private type: ProjectStatus) {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-list')!;
        this.hostElement = <HTMLDivElement>document.getElementById('app')!;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement; // this.element => <section> tag
        this.element.id = `${this.type}-projects`;

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

        this.attach(this.element);
        this.renderContent();
    }

    private renderProjects() {
        const ul = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        ul.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            const li = document.createElement('li');
            li.textContent = projectItem.title;
            ul.appendChild(li);
        }
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId; // search the subElement and ad Id to it
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';

    }

    private attach(element: HTMLElement) {
        this.hostElement.insertAdjacentElement('beforeend', element); // before closing tag of the element
    }
}

const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');

