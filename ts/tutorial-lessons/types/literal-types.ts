enum Type {
    NUMB='number',
    STR='only-this-value'
}

function print (income: 'only-this-value' | 'or-this-value'){
    console.log(income);
}

print('only-this-value');
print(Type.STR);
// print('asdas') <= can't do because you don't pass exact values in f()
