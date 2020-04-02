// interfaces are available only inside namespace, if we don't have export
// export - means feature are available outside file


namespace App {
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;

        dragEndHandler(event: DragEvent): void;
    }

    export interface DragTarget {
        dragOverHandler(event: DragEvent): void;

        dropHandler(event: DragEvent): void;

        dragLeaveHandler(event: DragEvent): void;
    }
}
