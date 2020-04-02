interface ErrorContainer { // {'email': 'Invalid email', 'userName': 'empty user name'}
    id: string; // has to be only string because of line below
    [prop: string]: string; // means: I don't know amount of properties an their exact names
                            // I only know, that their key types will be string and its values will be string type
}

const errorBag: ErrorContainer = {
    id: '123',
    email: 'not valid email'
};
