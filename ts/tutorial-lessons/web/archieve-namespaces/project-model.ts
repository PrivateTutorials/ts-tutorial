namespace App {
    export type ProjectStatus = 'active' | 'finished';

    export enum ProjectStatusEnum { Active, Finished };

    export class Project {
        status: ProjectStatus;

        constructor(public id: string, public title: string, public description: string, public people: number) {
            this.status = 'active';
        }
    }
}
