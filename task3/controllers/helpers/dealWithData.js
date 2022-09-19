const fs = require('fs');

const readFile = (fileName) => {
    let data;
    try {
        data= JSON.parse(fs.readFileSync(fileName)) || [];
    } catch(e) {
        data = [];
    }

    return data;
}

const writeFile = (fileName, data) => {
    try{
        if(!Array.isArray(data)) throw new Error("invalid")
        fs.writeFileSync(fileName, JSON.stringify(data));
   
    }
    catch(e){
        console.log(e.message)
    }
}

module.exports = {
    readFile,
    writeFile,
}