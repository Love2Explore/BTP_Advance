const cds = require("@sap/cds");

const vechile = {}
vechile.getVechile =  async(req)=>{
    const backend = await cds.connect.to('vechile')
    const tx = backend.tx(req);
    return tx.run(req.query);
}

vechile.postVechle =  async(req)=>{
    const backend = await cds.connect.to('vechile')
    const tx = backend.tx(req);
    return tx.run(req.query);
}

module.exports = {
    vechile
}