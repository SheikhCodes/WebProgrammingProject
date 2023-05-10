const Datauri = require('datauri/parser');
const path = require('path')
const dataURIChild = new Datauri()

module.exports = (originalname, buffer) => {
    const extname = path.extname(originalname);
    console.log("extname",extname);
    return dataURIChild.format(extname, buffer).content
}