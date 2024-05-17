const cds = require("@sap/cds");
const {ConnectERX} = require('./ConnectionHandler')
module.exports = cds.service.impl(function(){
    const {VechileInformation} = this.entities;
    this.on('READ',VechileInformation,ConnectERX)
})