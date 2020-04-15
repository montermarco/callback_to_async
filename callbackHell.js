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

// read the number from the file
fs.readFile(`${__dirname}/idGenerator.txt`, (err, data) => {
    if (err) console.log(err);
    console.log(`Id "${data}" was retrieved from file`);
    // we'll make a request to api with our random number 
    superagent
        .get(`https://rickandmortyapi.com/api/character/${data}`)
        .end( (err, res) => {
            if (err) console.log(err);
            // we writhe something from the response in another file
            console.log(res.body);
            const {name, origin } = res.body;
            const textToWrite = `This is ${name} from ${origin.name}`;

            fs.writeFile('fetchedRes.txt', textToWrite, err => {
                console.log('Response succesfully written!');
                console.log(`Request took ${Date.now() - start } mlseconds...`)
        });            
    })

   /*
    superagent
        .get(`https://rickandmortyapi.com/api/character/${data}`)
        .then( res => {
            console.log(res.body);

            const {name, origin } = res.body;
            const textToWrite = `This is ${name} from ${origin.name}`;
            fs.writeFile('fetchedRes.txt', textToWrite, err => {
                console.log('Response succesfully written!');
                console.log(`Request took ${Date.now() - start } mlseconds...`)
            })
        })
        .catch(err => {
            console.log(err.message);
        })
   */  
});
