const { ttdownloader, youtube, otakudesu, ongoing, twitter, fbdown, igstalk, igstory, igdl, pinterest, linkwa, playstore, wattpad, chara, lirik, sholat } = require('../lib/anjay')
const { cekKey, limitAdd, isLimit } = require('../database/db');

async function twitterDl(req, res) {
    const url = req.query.url;
    const apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
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
    twitter(url).then(result => {
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

async function stalkIg(req, res) {
    const username = req.query.username;
    const apikey = req.query.apikey;
    if (username === undefined || apikey === undefined) return res.status(404).send({
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
    igstalk(username).then(result => {
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

async function storyIg(req, res) {
    const username = req.query.username;
    const apikey = req.query.apikey;
    if (username === undefined || apikey === undefined) return res.status(404).send({
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
    igstory(username).then(result => {
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

async function pinterestSearch(req, res) {
    const querry = req.query.querry;
    const apikey = req.query.apikey;
    if (querry === undefined || apikey === undefined) return res.status(404).send({
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
    pinterest(querry).then(result => {
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

async function linkWhatsapp(req, res) {
    const nama = req.query.nama;
    const apikey = req.query.apikey;
    if (nama === undefined || apikey === undefined) return res.status(404).send({
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
    linkwa(nama).then(result => {
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

async function Play(req, res) {
    const nama = req.query.nama;
    const apikey = req.query.apikey;
    if (nama === undefined || apikey === undefined) return res.status(404).send({
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
    playstore(nama).then(result => {
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

async function Wp(req, res) {
    const judul = req.query.judul;
    const apikey = req.query.apikey;
    if (judul === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter judul & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    wattpad(judul).then(result => {
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
async function Char(req, res) {
    const query = req.query.query;
    const apikey = req.query.apikey;
    if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    chara(query).then(result => {
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

async function Solat(req, res) {
    const NO = req.query.NO;
    const apikey = req.query.apikey;
    if (NO === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter Nomor Urut Sholat & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    sholat(NO).then(result => {
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

async function LirikLagu(req, res) {
    const judul = req.query.judul;
    const apikey = req.query.apikey;
    if (judul === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter Judul & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    lirik(judul).then(result => {
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

async function Surat(req, res) {
    const no = req.query.url;
    const apikey = req.query.apikey;
    if (no === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter nomor surah & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    surah(no).then(result => {
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

async function TebakGambar(req, res) {
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
    tebakgambar().then(result => {
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

async function Komiku(req, res) {
    const judul = req.query.judul;
    const apikey = req.query.apikey;
    if (judul === undefined || apikey === undefined) return res.status(404).send({
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
    komiku(judul).then(result => {
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

async function OnGoing(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    ongoing().then(result => {
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

async function Covid19(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    covid().then(result => {
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

async function Otakudesu(req, res) {
    const judul = req.query.judul;
    const apikey = req.query.apikey;
    if (judul === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter judul & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    otakudesu(judul).then(result => {
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


async function ig2(req, res) {
    const url = req.query.url;
    const apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
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
    igdl(url).then(result => {
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

module.exports = { twitterDl, stalkIg, storyIg, pinterestSearch, linkWhatsapp, Play, Wp, Char, Solat, LirikLagu, Surat, TebakGambar, Komiku, OnGoing, Covid19, Otakudesu, ig2 };
