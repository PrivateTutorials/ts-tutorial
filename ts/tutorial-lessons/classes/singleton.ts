class Carr {
    private static instance: Carr;

    private constructor(public brand: string) { // private constructor - for singleton. We can access constructor only from inside class
    }

    static getInstance() {
        if (this.instance) { // OR: Carr.instance
            return this.instance;
        }
        this.instance = new Carr('BMW');
        return this.instance;
    }
}

const bmw = Carr.getInstance();
const tt = Carr.getInstance();
console.log(bmw.brand); // BMW
console.log(tt.brand); // BMW
