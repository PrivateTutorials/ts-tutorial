const fetchedUserData = {
    id: 123,
    name: 'Igor',
    job: {title: 'CEO', description: 'Boss'}
};

console.log(fetchedUserData?.job?.title); // means: if nested property exists
