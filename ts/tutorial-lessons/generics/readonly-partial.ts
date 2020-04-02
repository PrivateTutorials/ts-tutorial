interface Book {
    title: string;
    description: string;
    readUntil: Date;
}

function createBook(title: string,
                    description: string,
                    readUntil: Date): Book {
    let book: Partial<Book> = {}; // {} - this is an Object, that at the end will be "Book"
                                  // Partial wraps object Book and makes all its properties optional
    book.title = title;
    book.description = description;
    book.readUntil = readUntil;

    return book as Book;
}

const names1: Readonly<string[]> = ['Igor', 'Anna'];
// names1.push('Dog'); <= can't do it
