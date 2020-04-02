function add1(one: number, two: number, cb: (input: number) => void) {
    const res = one + two;
    cb(res);
}

add1(5, 7, (calcResult) => { // anonymous f()
    console.log(calcResult);
});
