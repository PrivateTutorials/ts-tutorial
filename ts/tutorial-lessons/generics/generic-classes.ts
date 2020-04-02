class DataStorage<T> { // better to extend primitive: class DataStorage<T extends number | string> {
    private data: T[] = [];

    addItems(...item: T[]) { // can add only 1 or any amount of items type T
        this.data.push(...item);
    }

    //  removeItem<U>(item: T) { <= new generic type can be introduced for method inside class
    removeItem(item: T) {
        if(this.data.indexOf(item) === -1) { // workaround - not to remove last object in array
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // works only for primitive types. It looks for real values, but not for link references
        // if Objects are passed, then only the last one will be removed: it finds nothing => returned -1 => removed the last value in array
    }

    getItems() {
        return [...this.data];
    }

}

const testStorage = new DataStorage<string>();
testStorage.getItems(); // []

testStorage.addItems('AA');
testStorage.getItems(); // [ 'AA' ]

const testStrings = ['asdasd', 'asdsad'];
testStorage.addItems(...testStrings);
testStorage.getItems(); // [ 'AA', 'asdasd', 'asdsad' ]

const testStorage1 = new DataStorage<number>();
const testStorage2 = new DataStorage<string | number>();
const testStorage3 = new DataStorage<object>();
const testObj1 = {name: 'Igor'};
testStorage3.addItems(testObj1);
testStorage3.removeItem(testObj1); // removeItem({name: 'Igor'}) <= if passed new object, then it can't be deleted by link of existing Object as below
console.log(testStorage3.getItems()); // []
