// requuire our packages
const fs = require('fs');
const superagent = require('superagent');

const start = Date.now();

const idGeneratorFile = () => {
    // generate a random number between 1 and 493
    const mySweetRandomId = Math.floor(Math.random() * 493);
    // writhe that number in a txt file
    fs.writeFile('idGenerator.txt', mySweetRandomId, (err) => {
        if (err) console.log(err);
        console.log(`Id ${mySweetRandomId} was written in idGenerator! `);
    });
};

idGeneratorFile();

//TODO ----- From callback hell to promises we need ...
//? Step one -  split the code in then/catch
// chain .then() mthod to our get request pass res to it's cb
// remove the successfull case code in the .then() method
// chain a .catch() method to handle error
// move error code to the .catch() method
//? Step two - promisify fs functions
// write a function that returns a promise for write and read file functions
// use promise constructor and use resolve and reject
// move the code for readFile to a promise
// move its callback to a then
// make the promises return to chain them
// promisify writefile and repeat steps 3 and 4

const readFileWithPromise = file => {
    return new Promise( (resolve, reject) =>  {
        fs.readFile(file, (err, data) => {
            if (err) reject('Could not read the file!') // this is the error available on .catch()
            resolve(data); // this is the data available in the res of .then() method
        })
    })
};

const writeFileWithPromise = (file, data) => {
    return new Promise( (resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Coukld not write the file');
            resolve('File written successfuly!');
        });
    });
};

readFileWithPromise(`${__dirname}/idGenerator.txt`)
    .then(data => {
        console.log(`Id "${data}" was retrieved from file`);
        // we'll make a request to api with our random number 
        return superagent
        .get(`https://rickandmortyapi.com/api/character/${data}`)})
    .then( res => {        
        // we writhe something from the response in another file        
        const {name, origin } = res.body;
        const textToWrite = `This is ${name} from location ${origin.name}`;
        
        return writeFileWithPromise('fetchedRes.txt', textToWrite)                   
    })
    .then( () => {
        console.log('Response succesfully written!');
    })
    .catch( err => {
        console.log(err);
    });


