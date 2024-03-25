const { Gempa } = require("../lib/Gempa");
const { Searchnabi } = require("../lib/kisahnabi");
const { cekKey, limitAdd, isLimit } = require('../database/db');

async function GempaBumi(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    Gempa().then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
}
async function Nabi(req, res) {
const nabi = req.query.nabi;
    const apikey = req.query.apikey;
    if (nabi === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter Query & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    Searchnabi(nabi).then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
}


module.exports = { GempaBumi, Nabi };