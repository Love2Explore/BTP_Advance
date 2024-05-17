const cds = require("@sap/cds");

async function ConnectERX(req){
    const backend = await cds.connect.to('vechile')
    const tx = backend.tx(req);
    return tx.run(req.query);
}

module.exports = {
    ConnectERX
}