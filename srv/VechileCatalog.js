const cds = require("@sap/cds");
const {vechile} = require('./ConnectionHandler')
module.exports = cds.service.impl(async function(){
    //const {VechileInformation,VechileVariant,SafetyCertificate} = this.entities;

    this.on('READ',['VechileInformation','VechileVariant'],async (req)=>{
        const backend = await cds.connect.to('vechile')
        const tx = backend.tx(req);
        return tx.run(req.query);
    })

    this.on('READ',['SafetyCertificate','CertificateType','SafetyCertificate_VH'],async (req)=>{
        const backend = await cds.connect.to('wcm')
        const tx = backend.tx(req);
        return tx.run(req.query);
    })

    this.on('CREATE',['VechileInformation','VechileVariant'], async(req)=>{
        const backend = await cds.connect.to('vechile');
        const tx = backend.tx(req);
        const result = await tx.run(
            req.query 
        );
        return result;
    })
})