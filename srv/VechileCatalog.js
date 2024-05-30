const cds = require("@sap/cds");
const {vechile} = require('./ConnectionHandler')
module.exports = cds.service.impl(function(){
    const {VechileInformation,VechileVariant,SafetyCertificate} = this.entities;

    this.on('READ',[VechileInformation,VechileVariant,SafetyCertificate],async(req)=>{
        const backend = await cds.connect.to('vechile')
        const tx = backend.tx(req);
        return tx.run(req.query);
    })

    this.on('CREATE',[VechileInformation,VechileVariant,SafetyCertificate], async(req)=>{
        const backend = await cds.connect.to('vechile');
        const tx = backend.tx(req);
        const result = await tx.run(
            req.query 
        );
        return result;
    })
})