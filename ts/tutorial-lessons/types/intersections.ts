type Combinable1 = string | number; // | <- union type
type Numeric = boolean | number;

type Universal = Combinable1 & Numeric; // type will be numeric, as only 1 common of them both

const a1: Universal = 23;
// const a2: Universal = 'asds'; <= can't do it
