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

// PROMISE CONSTRUCTORS
const readFileWithPromise = file => {
    //promise constructor which takes the executor function with resolve and reject arguments
    return new Promise( (resolve, reject) =>  {
        fs.readFile(file, (err, data) => { // 
            if (err) reject('Could not read the file!') 
            resolve(data); 
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

const getCharacter = async () => {
    try {
        // the const data was the argument in .then( data => ... )
        // use the await keyword in front of the promise and the result is assigned to data
        const data = await readFileWithPromise(`${__dirname}/idGenerator.txt`);
        console.log(`Id "${data}" was retrieved from file`);

        const res = await superagent.get(`https://rickandmortyapi.com/api/character/${data}`);
        const {name, origin } = res.body;
        const textToWrite = `This is ${name} from location ${origin.name}`;

        await writeFileWithPromise('fetchedRes.txt', textToWrite);
        console.log('Response succesfully written!');
    } catch (err) {
        console.log(err);
        throw err;
    }
    return '-- 2) ✅ ready!!! ...' // async functions return promises automatically ... 
};

( async ()=> {
    try {
        console.log(' - 1) will get character data ');
        const char = await getCharacter(); // getCharacter().then( char => console.log(char) )
        console.log(char);
        console.log(' --- 3) done getting character data ');    
    } catch (error) {
        console.log('ERROR 💥');
    }
})();

/*
console.log(' - 1) will get character data ');
getCharacter().then( char => {
    console.log(char); 
    console.log(' --- 3) done getting character data ');
})
/* 

*/

/*
console.log(' - 1) will get character data ')
const char = getCharacter(); // this is running in the background not blocking the event loop and getting to the next line 
console.log(char) // async functions return promises automatically ... this wwill log pending as getCharacter is a async function and jump to the next line 3)
console.log(' --- 3) done getting character data ')
*/




