const express = require('express');
const secure = require('ssl-express-www');
const cors = require('cors');
const cheerio = require('cheerio');
const caliph = require('caliph-api')
const hx = require('hxz-api');
const request = require('request');
const mumaker = require('mumaker')
const RA = require('ra-api');
const zrapi = require("zrapi");
const dotenv = require("dotenv").config()
const fs = require('fs');
const zyapi = require('kotz-api');
const router = express.Router(); 
const { readFileTxt, readFileJson } = require('../lib/function');
const { fbDown } = require('../lib/fbdownload');
const { igDownload } = require('../lib/igdownload');
const { GempaBumi, Nabi } = require('../lib/informasi');
const { TiktokDown } = require('../lib/tiktokdownload');
const { ytMp4, ytMp3, ytPlay } = require('../lib/youtube');
const { cekKey, checkLimit, limitAdd, resetLimit } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi } = require('../controllers/randomtext');
const { photoOxy } = require('./oxy');
const { download_Url } = require("../lib/function");
const { twitterDl, stalkIg, storyIg, pinterestSearch, linkWhatsapp, Play, Wp, Char, Solat, LirikLagu, Surat, TebakGambar, Komiku, OnGoing, Covid19, Otakudesu, ig2 } = require ('../lib/paket')
const { fetchJson } = require(__path + '/lib/fetcher.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');

router.get('/checkkey', async (req, res) => {
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
    const limit = await checkLimit(apikey);
    res.send({status: 200, apikey: apikey, limit: limit});
});


router.get('/primbon/zodiak', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  
 if (text === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });


    fetch(encodeURI(`http://revita.herokuapp.com/api/primbon/zodiaku?mimpi=${text}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/primbon/artimimpi', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  
 if (text === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });


    fetch(encodeURI(`http://kocakz.herokuapp.com/api/primbon/tafsirmimpi?mimpi=${text}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/primbon/artinama', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  
  if (text === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });


    fetch(encodeURI(`http://kocakz.herokuapp.com/api/primbon/artinama?name=${text}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });

router.get('/download/mediafire', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;

 if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    fetch(encodeURI(`https://api-json-reysekha.herokuapp.com/api/mediafire/?url=${url}&apikey=Yuzzu`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
});
router.get('/downloader/xnxx', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  
 if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/xnxx/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/downloader/twittervid', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  
  if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/twvid?url=${url}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.getVideo;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });

router.get('/downloader/xvideo', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  
   
 if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/xvideo/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
        });

router.get('/downloader/pornhub', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  
  
 if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/pornhub/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.res;
             res.json({
                 status : true,
                  
                 result
             })
         })
        });

router.get('/downloader/pinterest', async(req, res, next) => {
  const apikey = req.query.apikey;
  const q = req.query.q;
  
  
 if (q === undefined || apikey === undefined) return res.status(404).send({
       status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`https://aqulzz.herokuapp.com/pinterest?q=${q}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
        });




router.get('/stalk/npm', async (req, res, next) => {
          const apikey = req.query.apikey;
  const query = req.query.query;
  
  
 if (query === undefined || apikey === undefined) return res.status(404).send({
       status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
       fetch(encodeURI(`https://registry.npmjs.org/${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/random/faktaunik', async (req, res, next) => {
         const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/faktaunik`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
                  
                 result
             })
         })
         });
router.get('/random/katabijak', async (req, res, next) => {
       const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/katabijak`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
                  
                 result
             })
         })
         });
router.get('/random/pantun', async (req, res, next) => {
        const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/pantun`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
                  
                 result
             })
         })
         });
router.get('/jadwal-bioskop', async(req, res, next) => {
 const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
const { default: Axios } = require('axios')
const cheerio = require('cheerio')

Axios.get('https://jadwalnonton.com/now-playing')
.then(({ data }) => {
     const $ = cheerio.load(data)
     let title = []
     let url = []
     let img = []
 	$('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a').get().map((rest) => {
         url.push($(rest).attr('href'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	title.push($(rest).attr('alt'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	img.push($(rest).attr('src'))
         })
     let result = []
     for (let i = 0; i < url.length; i++) {
          result.push({
               	url: url[i],
               	title: title[i],
               	img: img[i]
          })
     }
     res.json({
 
     status: true,
     result: result
     })
})
});



router.get('/wiki', async (req, res, next) => {
         const judul = req.query.judul   
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

zyapi.wiki(judul)
    .then(result => {
res.json({
                 result
             })  
	})
});
router.get('/mediafire', async (req, res, next) => {
         const link = req.query.link   
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

zyapi.mediafire(link)
    .then(result => {
res.json({
                 result
             })  
	})
});

router.get('/emoji', async (req, res, next) => {
         const query = req.query.query
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


RA.EmojiScrapper(query).then(respon => {
res.json({
                 respon
             })  
	})
});
router.get('/cerpen', async (req, res, next) => {
      
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

RA.RandomCerpen().then(respon => {
res.json({
               result: respon.data
             })  
	})
});
router.get('/nsfw/ahegao', async (req, res, next) => {
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
  const ahegao = JSON.parse(fs.readFileSync(__path +'/data/ahegao.json'));
  const randahegao = ahegao[Math.floor(Math.random() * ahegao.length)];
  download_Url(randahegao, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/ass', async (req, res, next) => {
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
  const ass = JSON.parse(fs.readFileSync(__path +'/data/ass.json'));
  const randass = ass[Math.floor(Math.random() * ass.length)];
  download_Url(randass, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/bdsm', async (req, res, next) => {
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
  const bdsm = JSON.parse(fs.readFileSync(__path +'/data/bdsm.json'));
  const randbdsm = bdsm[Math.floor(Math.random() * bdsm.length)];
  download_Url(randbdsm, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/blowjob', async (req, res, next) => {
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
  const blowjob = JSON.parse(fs.readFileSync(__path +'/data/blowjob.json'));
  const randblowjob = blowjob[Math.floor(Math.random() * blowjob.length)];
  download_Url(randblowjob, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/cuckold', async (req, res, next) => {
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
  const cuckold = JSON.parse(fs.readFileSync(__path +'/data/cuckold.json'));
  const randcuckold = cuckold[Math.floor(Math.random() * cuckold.length)];
  download_Url(randcuckold, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/cum', async (req, res, next) => {
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
  const cum = JSON.parse(fs.readFileSync(__path +'/data/cum.json'));
  const randcum = cum[Math.floor(Math.random() * cum.length)];
  download_Url(randcum, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/ero', async (req, res, next) => {
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
  const ero = JSON.parse(fs.readFileSync(__path +'/data/ero.json'));
  const randero = ero[Math.floor(Math.random() * ero.length)];
  download_Url(randero, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/femdom', async (req, res, next) => {
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
  const femdom = JSON.parse(fs.readFileSync(__path +'/data/femdom.json'));
  const randfemdom = femdom[Math.floor(Math.random() * femdom.length)];
  download_Url(randfemdom, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/foot', async (req, res, next) => {
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
  const foot = JSON.parse(fs.readFileSync(__path +'/data/foot.json'));
  const randfoot = foot[Math.floor(Math.random() * foot.length)];
  download_Url(randfoot, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/gangbang', async (req, res, next) => {
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
  const gangbang = JSON.parse(fs.readFileSync(__path +'/data/gangbang.json'));
  const randgangbang = gangbang[Math.floor(Math.random() * gangbang.length)];
  download_Url(randgangbang, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/glasses', async (req, res, next) => {
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
  const glasses = JSON.parse(fs.readFileSync(__path +'/data/glasses.json'));
  const randglasses = glasses[Math.floor(Math.random() * glasses.length)];
  download_Url(randglasses, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/hentai', async (req, res, next) => {
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
  const hentai = JSON.parse(fs.readFileSync(__path +'/data/hentai.json'));
  const randhentai = hentai[Math.floor(Math.random() * hentai.length)];
  download_Url(randhentai, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/gifs', async (req, res, next) => {
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
  const gifs = JSON.parse(fs.readFileSync(__path +'/data/gifs.json'));
  const randgifs = gifs[Math.floor(Math.random() * gifs.length)];
  download_Url(randgifs, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/jahy', async (req, res, next) => {
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
  const jahy = JSON.parse(fs.readFileSync(__path +'/data/jahy.json'));
  const randjahy = jahy[Math.floor(Math.random() * jahy.length)];
  download_Url(randjahy, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/manga', async (req, res, next) => {
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
  const manga = JSON.parse(fs.readFileSync(__path +'/data/manga.json'));
  const randmanga = manga[Math.floor(Math.random() * manga.length)];
  download_Url(randmanga, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/masturbation', async (req, res, next) => {
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
  const masturbation = JSON.parse(fs.readFileSync(__path +'/data/masturbation.json'));
  const randmasturbation = masturbation[Math.floor(Math.random() * masturbation.length)];
  download_Url(randmasturbation, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/neko', async (req, res, next) => {
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
  const neko = JSON.parse(fs.readFileSync(__path +'/data/neko.json'));
  const randneko = neko[Math.floor(Math.random() * neko.length)];
  download_Url(randpussy, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/orgy', async (req, res, next) => {
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
  const orgy = JSON.parse(fs.readFileSync(__path +'/data/orgy.json'));
  const randorgy = orgy[Math.floor(Math.random() * orgy.length)];
download_Url(randorgy, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/panties', async (req, res, next) => {
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
  const panties = JSON.parse(fs.readFileSync(__path +'/data/panties.json'));
  const randpanties = panties[Math.floor(Math.random() * panties.length)];
  download_Url(randpanties, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/nsfw/pussy', async (req, res, next) => {
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
  const pussy = JSON.parse(fs.readFileSync(__path +'/data/pussy.json'));
  const randpussy = pussy[Math.floor(Math.random() * pussy.length)];
  download_Url(randpussy, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/nsfw/neko2', async (req, res, next) => {
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
  const neko2 = JSON.parse(fs.readFileSync(__path +'/data/neko2.json'));
  const randneko2 = neko2[Math.floor(Math.random() * neko2.length)];
  download_Url(randneko2, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/nsfw/tentacles', async (req, res, next) => {
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
  const tentacles = JSON.parse(fs.readFileSync(__path +'/data/tentacles.json'));
  const randtentacles = tentacles[Math.floor(Math.random() * tentacles.length)];
  download_Url(randtentacles, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/nsfw/thighs', async (req, res, next) => {
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
  const thighs = JSON.parse(fs.readFileSync(__path +'/data/thighs.json'));
  const randthighs = thighs[Math.floor(Math.random() * thighs.length)];
  download_Url(randthighs, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/nsfw/yuri', async (req, res, next) => {
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
  const yuri = JSON.parse(fs.readFileSync(__path +'/data/yuri.json'));
  const randyuri = yuri[Math.floor(Math.random() * yuri.length)];
  download_Url(randyuri, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/nsfw/zettai', async (req, res, next) => {
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

  const zettai = JSON.parse(fs.readFileSync(__path +'/data/zettai.json'));
  const data = zettai[Math.floor(Math.random() * zettai.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/keneki', async (req, res, next) => {
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

  const keneki = JSON.parse(fs.readFileSync(__path +'/data/keneki.json'));
  const data = keneki[Math.floor(Math.random() * keneki.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/megumin', async (req, res, next) => {
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

  const megumin = JSON.parse(fs.readFileSync(__path +'/data/megumin.json'));
  const data = megumin[Math.floor(Math.random() * megumin.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/yotsuba', async (req, res, next) => {
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

  const yotsuba = JSON.parse(fs.readFileSync(__path +'/data/yotsuba.json'));
  const data = yotsuba[Math.floor(Math.random() * yotsuba.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/shinomiya', async (req, res, next) => {
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

  const shinomiya = JSON.parse(fs.readFileSync(__path +'/data/shinomiya.json'));
  const data = shinomiya[Math.floor(Math.random() * shinomiya.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/yumeko', async (req, res, next) => {
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

  const yumeko = JSON.parse(fs.readFileSync(__path +'/data/yumeko.json'));
  const data = yumeko[Math.floor(Math.random() * yumeko.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/tejina', async (req, res, next) => {
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

  const tejina = JSON.parse(fs.readFileSync(__path +'/data/tejina.json'));
  const data = tejina[Math.floor(Math.random() * tejina.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/chiho', async (req, res, next) => {
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

  const chiho = JSON.parse(fs.readFileSync(__path +'/data/chiho.json'));
  const data = chiho[Math.floor(Math.random() * chiho.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/cyberspace', async (req, res, next) => {
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

  const cyberspace = JSON.parse(fs.readFileSync(__path +'/data/CyberSpace.json'));
  const data = cyberspace[Math.floor(Math.random() * cyberspace.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/gaming', async (req, res, next) => {
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

  const gaming = JSON.parse(fs.readFileSync(__path +'/data/GameWallp.json'));
  const data = gaming[Math.floor(Math.random() * gaming.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });


router.get('/wallpaper/islami', async (req, res, next) => {
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


  const islami = JSON.parse(fs.readFileSync(__path +'/data/Islamic.json'));
  const data = islami[Math.floor(Math.random() * islami.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/programing', async (req, res, next) => {
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


  const programing = JSON.parse(fs.readFileSync(__path +'/data/Programming.json'));
  const data = programing[Math.floor(Math.random() * programing.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/teknologi', async (req, res, next) => {
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


  const teknologi = JSON.parse(fs.readFileSync(__path +'/data/Technology.json'));
  const data = teknologi[Math.floor(Math.random() * teknologi.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/mountain', async (req, res, next) => {
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


  const mountain = JSON.parse(fs.readFileSync(__path +'/data/Mountain.json'));
  const data = mountain[Math.floor(Math.random() * mountain.length)];
  data = await fetch(randmountain).then(v => v.buffer())
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/tatasurya', async (req, res, next) => {
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


  const tatasurya = JSON.parse(fs.readFileSync(__path +'/data/tatasurya.json'));
  const data = tatasurya[Math.floor(Math.random() * tatasurya.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/kartun', async (req, res, next) => {
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


  const kartun = JSON.parse(fs.readFileSync(__path +'/data/kartun.json'));
  const data = kartun[Math.floor(Math.random() * kartun.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/random/yuli', async (req, res, next) => {
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


  const yuli = JSON.parse(fs.readFileSync(__path +'/data/yulibocil.json'));
  const data = yuli[Math.floor(Math.random() * yuli.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/pentol', async (req, res, next) => {
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


  const pentol = JSON.parse(fs.readFileSync(__path +'/data/pentol.json'));
  const data = pentol[Math.floor(Math.random() * pentol.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/katakata', async (req, res, next) => {
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


  const katakata = JSON.parse(fs.readFileSync(__path +'/data/katakata.json'));
  const data = katakata[Math.floor(Math.random() * katakata.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/toukachan', async (req, res, next) => {
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


  const toukachan = JSON.parse(fs.readFileSync(__path +'/data/toukachan.json'));
  const data = toukachan[Math.floor(Math.random() * toukachan.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/akira', async (req, res, next) => {
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


  const akira = JSON.parse(fs.readFileSync(__path +'/data/akira.json'));
  const data = akira[Math.floor(Math.random() * akira.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/itori', async (req, res, next) => {
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


  const itori = JSON.parse(fs.readFileSync(__path +'/data/itori.json'));
  const data = itori[Math.floor(Math.random() * itori.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/kurumi', async (req, res, next) => {
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


  const kurumi = JSON.parse(fs.readFileSync(__path +'/data/kurumi.json'));
  const data = kurumi[Math.floor(Math.random() * kurumi.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/miku', async (req, res, next) => {
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


  const miku = JSON.parse(fs.readFileSync(__path +'/data/miku.json'));
  const data = miku[Math.floor(Math.random() * miku.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/pokemon', async (req, res, next) => {
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


  const pokemon = JSON.parse(fs.readFileSync(__path +'/data/pokemon.json'));
  const data = pokemon[Math.floor(Math.random() * pokemon.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/ryujin', async (req, res, next) => {
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


  const ryujin = JSON.parse(fs.readFileSync(__path +'/data/ryujin.json'));
  const data = ryujin[Math.floor(Math.random() * ryujin.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/rose', async (req, res, next) => {
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


  const rose = JSON.parse(fs.readFileSync(__path +'/data/rose.json'));
  const data = rose[Math.floor(Math.random() * rose.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/kaori', async (req, res, next) => {
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


  const kaori = JSON.parse(fs.readFileSync(__path +'/data/kaori.json'));
  const data = kaori[Math.floor(Math.random() * kaori.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/shizuka', async (req, res, next) => {
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

  const shizuka = JSON.parse(fs.readFileSync(__path +'/data/shizuka.json'));
  const data = shizuka[Math.floor(Math.random() * shizuka.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/kaga', async (req, res, next) => {
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


  const kaga = JSON.parse(fs.readFileSync(__path +'/data/kaga.json'));
  const data = kaga[Math.floor(Math.random() * kaga.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/kotori', async (req, res, next) => {
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


  const kotori = JSON.parse(fs.readFileSync(__path +'/data/kotori.json'));
  const data = kotori[Math.floor(Math.random() * kotori.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/mikasa', async (req, res, next) => {
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


  const mikasa = JSON.parse(fs.readFileSync(__path +'/data/mikasa.json'));
  const data = mikasa[Math.floor(Math.random() * mikasa.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/akiyama', async (req, res, next) => {
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


  const akiyama = JSON.parse(fs.readFileSync(__path +'/data/akiyama.json'));
  const data = akiyama[Math.floor(Math.random() * akiyama.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/gremory', async (req, res, next) => {
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

  const gremory = JSON.parse(fs.readFileSync(__path +'/data/gremory.json'));
  const data = gremory[Math.floor(Math.random() * gremory.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/isuzu', async (req, res, next) => {
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

  const isuzu = JSON.parse(fs.readFileSync(__path +'/data/isuzu.json'));
  const data = isuzu[Math.floor(Math.random() * isuzu.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/random/cosplay', async (req, res, next) => {
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

  const cosplay = JSON.parse(fs.readFileSync(__path +'/data/cosplay.json'));
  const data = cosplay[Math.floor(Math.random() * cosplay.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/shina', async (req, res, next) => {
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

  const shina = JSON.parse(fs.readFileSync(__path +'/data/shina.json'));
  const data = shina[Math.floor(Math.random() * shina.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/kagura', async (req, res, next) => {
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

  const kagura = JSON.parse(fs.readFileSync(__path +'/data/kagura.json'));
  const data = kagura[Math.floor(Math.random() * kagura.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/shinka', async (req, res, next) => {
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

  const shinka = JSON.parse(fs.readFileSync(__path +'/data/shinka.json'));
  const data = shinka[Math.floor(Math.random() * shinka.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/eba', async (req, res, next) => {
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

  const eba = JSON.parse(fs.readFileSync(__path +'/data/eba.json'));
  const data = eba[Math.floor(Math.random() * eba.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/deidara', async (req, res, next) => {
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

  const Deidara = JSON.parse(fs.readFileSync(__path +'/data/deidara.json'));
  const data = Deidara[Math.floor(Math.random() * Deidara.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/trans', async (req, res, next) => {
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

  const trans = JSON.parse(fs.readFileSync(__path +'/data/trans.json'));
  const data = trans[Math.floor(Math.random() * trans.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/jeni', async (req, res, next) => {
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

  const jeni = JSON.parse(fs.readFileSync(__path +'/data/jeni.json'));
  const data = jeni[Math.floor(Math.random() * jeni.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/jiso', async (req, res, next) => {
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

  const jiso = JSON.parse(fs.readFileSync(__path +'/data/jiso.json'));
  const data = jiso[Math.floor(Math.random() * jiso.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/satanic', async (req, res, next) => {
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
  const satanic = JSON.parse(fs.readFileSync(__path +'/data/satanic.json'));
  const data = satanic[Math.floor(Math.random() * satanic.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/cecan2', async (req, res, next) => {
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

  const cecan2 = JSON.parse(fs.readFileSync(__path +'/data/cecan2.json'));
  const data = cecan2[Math.floor(Math.random() * cecan2.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/cogan2', async (req, res, next) => {
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

  const cogan2 = JSON.parse(fs.readFileSync(__path +'/data/cogan2.json'));
  const data = cogan2[Math.floor(Math.random() * cogan2.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/itachi', async (req, res, next) => {
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

  const Itachi = JSON.parse(fs.readFileSync(__path +'/data/itachi.json'));
  const data = Itachi[Math.floor(Math.random() * Itachi.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/madara', async (req, res, next) => {
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

  const Madara = JSON.parse(fs.readFileSync(__path +'/data/madara.json'));
  const data = Madara[Math.floor(Math.random() * Madara.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/yuki', async (req, res, next) => {
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

  const Yuki = JSON.parse(fs.readFileSync(__path +'/data/yuki.json'));
  const data = Yuki[Math.floor(Math.random() * Yuki.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/asuna', async (req, res, next) => {
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

  const asuna = JSON.parse(fs.readFileSync(__path +'/data/asuna.json'));
  const data = asuna[Math.floor(Math.random() * asuna.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/ayuzawa', async (req, res, next) => {
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

  const ayuzawa = JSON.parse(fs.readFileSync(__path +'/data/ayuzawa.json'));
  const data = ayuzawa[Math.floor(Math.random() * ayuzawa.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/chitoge', async (req, res, next) => {
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

  const chitoge = JSON.parse(fs.readFileSync(__path +'/data/chitoge.json'));
  const data = chitoge[Math.floor(Math.random() * chitoge.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });


router.get('/wallpaper/gremory', async (req, res, next) => {
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

  const gremory = JSON.parse(fs.readFileSync(__path +'/data/gremory.json'));
  const data = gremory[Math.floor(Math.random() * gremory.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/isuzu', async (req, res, next) => {
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

  const isuzu = JSON.parse(fs.readFileSync(__path +'/data/isuzu.json'));
  const data = isuzu[Math.floor(Math.random() * isuzu.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/random/cosplay', async (req, res, next) => {
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

  const cosplay = JSON.parse(fs.readFileSync(__path +'/data/cosplay.json'));
  const data = cosplay[Math.floor(Math.random() * cosplay.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/shina', async (req, res, next) => {
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

  const shina = JSON.parse(fs.readFileSync(__path +'/data/shina.json'));
  const data = shina[Math.floor(Math.random() * shina.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/kagura', async (req, res, next) => {
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

  const kagura = JSON.parse(fs.readFileSync(__path +'/data/kagura.json'));
  const data = kagura[Math.floor(Math.random() * kagura.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/shinka', async (req, res, next) => {
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

  const shinka = JSON.parse(fs.readFileSync(__path +'/data/shinka.json'));
  const data = shinka[Math.floor(Math.random() * shinka.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/eba', async (req, res, next) => {
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
  const eba = JSON.parse(fs.readFileSync(__path +'/data/eba.json'));
  const data = eba[Math.floor(Math.random() * eba.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/deidara', async (req, res, next) => {
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

  const Deidara = JSON.parse(fs.readFileSync(__path +'/data/deidara.json'));
  const data = Deidara[Math.floor(Math.random() * Deidara.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/trans', async (req, res, next) => {
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

  const trans = JSON.parse(fs.readFileSync(__path +'/data/trans.json'));
  const data = trans[Math.floor(Math.random() * trans.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/jeni', async (req, res, next) => {
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

  const jeni = JSON.parse(fs.readFileSync(__path +'/data/jeni.json'));
  const data = jeni[Math.floor(Math.random() * jeni.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/jiso', async (req, res, next) => {
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

  const jiso = JSON.parse(fs.readFileSync(__path +'/data/jiso.json'));
  const data = jiso[Math.floor(Math.random() * jiso.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/satanic', async (req, res, next) => {
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

  const satanic = JSON.parse(fs.readFileSync(__path +'/data/satanic.json'));
  const data = satanic[Math.floor(Math.random() * satanic.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/anjing', async (req, res, next) => {
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

  Anjing = JSON.parse(fs.readFileSync(__path +'/data/anjing.json'));
  const data = Anjing[Math.floor(Math.random() * Anjing.length)]
  
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
	router.get('/wallpaper/kucing', async (req, res, next) => {
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
  Kucing = JSON.parse(fs.readFileSync(__path +'/data/kucing.json'));
  const data = Kucing[Math.floor(Math.random() * Kucing.length)]
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/anime', async (req, res, next) => {
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
  const Wai23 = JSON.parse(fs.readFileSync(__path +'/data/wallhp2.json'));
  const data = Wai23[Math.floor(Math.random() * Wai23.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/wallhp', async (req, res, next) => {
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
  const Wai22 = JSON.parse(fs.readFileSync(__path +'/data/wallhp.json'));
  const data = Wai22[Math.floor(Math.random() * Wai22.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
	
	

router.get('/wallpaper/cecan2', async (req, res, next) => {
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
  const cecan2 = JSON.parse(fs.readFileSync(__path +'/data/cecan2.json'));
  const data = cecan2[Math.floor(Math.random() * cecan2.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/cogan2', async (req, res, next) => {
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

  const cogan2 = JSON.parse(fs.readFileSync(__path +'/data/cogan2.json'));
  const data = cogan2[Math.floor(Math.random() * cogan2.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/itachi', async (req, res, next) => {
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

  const Itachi = JSON.parse(fs.readFileSync(__path +'/data/itachi.json'));
  const data = Itachi[Math.floor(Math.random() * Itachi.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/madara', async (req, res, next) => {
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

  const Madara = JSON.parse(fs.readFileSync(__path +'/data/madara.json'));
  const data = Madara[Math.floor(Math.random() * Madara.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/yuki', async (req, res, next) => {
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

  const Yuki = JSON.parse(fs.readFileSync(__path +'/data/yuki.json'));
  const data = Yuki[Math.floor(Math.random() * Yuki.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/asuna', async (req, res, next) => {
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

  const asuna = JSON.parse(fs.readFileSync(__path +'/data/asuna.json'));
  const data = asuna[Math.floor(Math.random() * asuna.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/ayuzawa', async (req, res, next) => {
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

  const ayuzawa = JSON.parse(fs.readFileSync(__path +'/data/ayuzawa.json'));
  const data = ayuzawa[Math.floor(Math.random() * ayuzawa.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/chitoge', async (req, res, next) => {
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

  const chitoge = JSON.parse(fs.readFileSync(__path +'/data/chitoge.json'));
  const data = chitoge[Math.floor(Math.random() * chitoge.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });


router.get('/wallpaper/gremory', async (req, res, next) => {
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

  const gremory = JSON.parse(fs.readFileSync(__path +'/data/gremory.json'));
  const data = gremory[Math.floor(Math.random() * gremory.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/isuzu', async (req, res, next) => {
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

  const isuzu = JSON.parse(fs.readFileSync(__path +'/data/isuzu.json'));
  const data = isuzu[Math.floor(Math.random() * isuzu.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/random/cosplay', async (req, res, next) => {
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

  const cosplay = JSON.parse(fs.readFileSync(__path +'/data/cosplay.json'));
  const data = cosplay[Math.floor(Math.random() * cosplay.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/shina', async (req, res, next) => {
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

  const shina = JSON.parse(fs.readFileSync(__path +'/data/shina.json'));
  const data = shina[Math.floor(Math.random() * shina.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/kagura', async (req, res, next) => {
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

  const kagura = JSON.parse(fs.readFileSync(__path +'/data/kagura.json'));
  const data = kagura[Math.floor(Math.random() * kagura.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/shinka', async (req, res, next) => {
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
  const shinka = JSON.parse(fs.readFileSync(__path +'/data/shinka.json'));
  const data = shinka[Math.floor(Math.random() * shinka.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/eba', async (req, res, next) => {
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

  const eba = JSON.parse(fs.readFileSync(__path +'/data/eba.json'));
  const data = eba[Math.floor(Math.random() * eba.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/deidara', async (req, res, next) => {
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

  const Deidara = JSON.parse(fs.readFileSync(__path +'/data/deidara.json'));
  const data = Deidara[Math.floor(Math.random() * Deidara.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/trans', async (req, res, next) => {
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

  const trans = JSON.parse(fs.readFileSync(__path +'/data/trans.json'));
  const data = trans[Math.floor(Math.random() * trans.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
 
router.get('/wallpaper/montor', async (req, res, next) => {
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
  const Mon = JSON.parse(fs.readFileSync(__path +'/data/montor.json'));
  const data = Mon[Math.floor(Math.random() * Mon.length)];
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/mobil', async (req, res, next) => {
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

  const Mob = JSON.parse(fs.readFileSync(__path +'/data/mobil.json'));
  const data = Mob[Math.floor(Math.random() * Mob.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/boneka-chucky', async (req, res, next) => {
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
  const Bon = JSON.parse(fs.readFileSync(__path +'/data/boneka.json'));
  const data = Bon[Math.floor(Math.random() * Bon.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/random/blackpink', async (req, res, next) => {
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

  Black = JSON.parse(fs.readFileSync(__path +'/data/blackpink.json'));
  const rand = Black[Math.floor(Math.random() * Black.length)]
  download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/wallhp', async (req, res, next) => {
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

  const Wai22 = JSON.parse(fs.readFileSync(__path +'/data/wallhp.json'));
  const data = Wai22[Math.floor(Math.random() * Wai22.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/waifu2', async (req, res, next) => {
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
  const Wai2 = JSON.parse(fs.readFileSync(__path +'/data/waifu2.json'));
  const rand = Wai2[Math.floor(Math.random() * Wai2.length)];
    download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/waifu', async (req, res, next) => {
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

  const Wai = JSON.parse(fs.readFileSync(__path +'/data/waifu.json'));
  const rand = Wai[Math.floor(Math.random() * Wai.length)];
   download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/kpop', async (req, res, next) => {
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

  Kpop = JSON.parse(fs.readFileSync(__path +'/data/kpop.json'));
  const rand = Kpop[Math.floor(Math.random() * Kpop.length)]
    download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/hekel', async (req, res, next) => {
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

  Hekel = JSON.parse(fs.readFileSync(__path +'/data/hekel.json'));
  const rand = Hekel[Math.floor(Math.random() * Hekel.length)]
    download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/pubg', async (req, res, next) => {
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

  Pubg = JSON.parse(fs.readFileSync(__path +'/data/pubg.json'));
  const rand = Pubg[Math.floor(Math.random() * Pubg.length)]
   download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/ppcouple', async (req, res, next) => {
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

  Pp = JSON.parse(fs.readFileSync(__path +'/data/profil.json'));
  const rand = Pp[Math.floor(Math.random() * Pp.length)]
    download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/doraemon', async (req, res, next) => {
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
  Dora = JSON.parse(fs.readFileSync(__path +'/data/doraemon.json'));
  const rand = Dora[Math.floor(Math.random() * Dora.length)]
   download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/cogan', async (req, res, next) => {
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
  Cogan = JSON.parse(fs.readFileSync(__path +'/data/cogan.json'));
  const rand = Cogan[Math.floor(Math.random() * Cogan.length)]
    download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/elaina', async (req, res, next) => {
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
const Elaina = JSON.parse(fs.readFileSync(__path +'/data/elaina.json'))
const rand = Elaina[Math.floor(Math.random() * Elaina.length)]
//tansole.log(randLoli)
  download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/loli', async (req, res, next) => {
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

const Loli = JSON.parse(fs.readFileSync(__path +'/data/loli.json'))
const rand = Loli[Math.floor(Math.random() * Loli.length)]
//tansole.log(randLoli)
  download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/yuri', async (req, res, next) => {
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

const Yuri = JSON.parse(fs.readFileSync(__path +'/data/yuri.json'))
const rand = Yuri[Math.floor(Math.random() * Yuri.length)]
//tansole.log(randTech)
download_Url(rand, './media/image.jpg', function(){
    limitAdd(apikey);
    res.sendFile(path.resolve('./media/image.jpg'))
})

});


router.get('/wallpaper/cecan', async (req, res, next) => {
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

  const cecan = JSON.parse(fs.readFileSync(__path +'/data/cecan.json'));
  const rand = cecan[Math.floor(Math.random() * cecan.length)];
  download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/aesthetic', async (req, res, next) => {
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

  const Aesthetic = JSON.parse(fs.readFileSync(__path +'/data/aesthetic.json'));
  const rand = Aesthetic[Math.floor(Math.random() * Aesthetic.length)];
    download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/justina', async (req, res, next) => {
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
  const Justina = JSON.parse(fs.readFileSync(__path +'/data/justina.json'));
  const rand = Justina[Math.floor(Math.random() * Justina.length)];
  download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });



router.get('/wallpaper/sagiri', async (req, res, next) => {
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

  const Sagiri = JSON.parse(fs.readFileSync(__path +'/data/sagiri.json'));
  const rand = Sagiri[Math.floor(Math.random() * Sagiri.length)];
   download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/shota', async (req, res, next) => {
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
  const Shota = JSON.parse(fs.readFileSync(__path +'/data/shota.json'));
  const rand = Shota[Math.floor(Math.random() * Shota.length)];
   download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/nsfwloli', async (req, res, next) => {
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
  const Lol = JSON.parse(fs.readFileSync(__path +'/data/nsfwloli.json'));
  const rand = Lol[Math.floor(Math.random() * Lol.length)];
   download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/wallpaper/hinata', async (req, res, next) => {
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
  const Hinata = JSON.parse(fs.readFileSync(__path +'/data/hinata.json'));
  const rand = Hinata[Math.floor(Math.random() * Hinata.length)];
   download_Url(rand, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });

router.get('/wallpaper/jeni', async (req, res, next) => {
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
  const jeni = JSON.parse(fs.readFileSync(__path +'/data/jeni.json'));
  const data = jeni[Math.floor(Math.random() * jeni.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/jiso', async (req, res, next) => {
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

  const jiso = JSON.parse(fs.readFileSync(__path +'/data/jiso.json'));
  const data = jiso[Math.floor(Math.random() * jiso.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/satanic', async (req, res, next) => {
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

  const satanic = JSON.parse(fs.readFileSync(__path +'/data/satanic.json'));
  const data = satanic[Math.floor(Math.random() * satanic.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/wallpaper/cecan2', async (req, res, next) => {
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

  const cecan2 = JSON.parse(fs.readFileSync(__path +'/data/cecan2.json'));
  const data = cecan2[Math.floor(Math.random() * cecan2.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/cogan2', async (req, res, next) => {
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

  const cogan2 = JSON.parse(fs.readFileSync(__path +'/data/cogan2.json'));
  const data = cogan2[Math.floor(Math.random() * cogan2.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/itachi', async (req, res, next) => {
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

  const Itachi = JSON.parse(fs.readFileSync(__path +'/data/itachi.json'));
  const data = Itachi[Math.floor(Math.random() * Itachi.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/madara', async (req, res, next) => {
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

  const Madara = JSON.parse(fs.readFileSync(__path +'/data/madara.json'));
  const data = Madara[Math.floor(Math.random() * Madara.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/yuki', async (req, res, next) => {
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

  const Yuki = JSON.parse(fs.readFileSync(__path +'/data/yuki.json'));
  const data = Yuki[Math.floor(Math.random() * Yuki.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/asuna', async (req, res, next) => {
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

  const asuna = JSON.parse(fs.readFileSync(__path +'/data/asuna.json'));
  const data = asuna[Math.floor(Math.random() * asuna.length)];
download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/ayuzawa', async (req, res, next) => {
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

  const ayuzawa = JSON.parse(fs.readFileSync(__path +'/data/ayuzawa.json'));
  const data = ayuzawa[Math.floor(Math.random() * ayuzawa.length)];
  download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/chitoge', async (req, res, next) => {
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

  const chitoge = JSON.parse(fs.readFileSync(__path +'/data/chitoge.json'));
  const data = chitoge[Math.floor(Math.random() * chitoge.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/wallpaper/emilia', async (req, res, next) => {
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

  const emilia = JSON.parse(fs.readFileSync(__path +'/data/emilia.json'));
  const data = emilia[Math.floor(Math.random() * emilia.length)];
 download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
	


router.get('/otakudesu', async (req, res, next) => {
     const apikey = req.query.apikey;
	 const judul = req.query.judul;
    if (judul === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter judul & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.otakudesu(judul)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/otakudesu', async (req, res, next) => {
     const apikey = req.query.apikey;
	 const name = req.query.name;
    if (name === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter nama & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.chara(name)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/ongoing', async (req, res, next) => {
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

hx.ongoing()
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/komiku', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const judul = req.query.judul;
    if (judul === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter judul & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.komiku(judul)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/chara', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const name = req.query.name;
    if (name === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter nama & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.chara(name)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/lirik', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const judul = req.query.judul;
    if (judul === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter judul & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.lirik(judul)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/wattpad', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const judul = req.query.judul;
    if (judul === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter judul & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.wattpad(judul)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/playstore', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const judul = req.query.judul;
    if (judul === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter judul & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.playstore(judul)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/igdl', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const link = req.query.link;
    if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter judul & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
hx.igdl(link)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})


router.get('/igstory', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const username = req.query.username;
    if (username === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter username & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.igstory(username)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})


router.get('/igstalk', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const username = req.query.username;
    if (username === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter username & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.igstalk(username)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/covid19', async (req, res, next) => {
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

hx.covid()
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/tebakgambar', async (req, res, next) => {
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

hx.tebakgambar()
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/surah', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const no = req.query.no;
    if (no === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter no surah & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.surah(no)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})

router.get('/sholat', async (req, res, next) => {
     const apikey = req.query.apikey;
   	 const no = req.query.no;
    if (no === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter list [ Jakarta = 1
Ambon = 39
Balikpapan = 42 
Banda Aceh = 17
Bandar Lampung = 22
Bandung = 7
Banjar = 44
Banjarbaru = 46
Banjarmasin = 32
Banyuwangi = 48
Batam = 8
Batu = 50
Bau-bau = 52
Bekasi = 54
Bengkulu = 21
Bima = 56
Binjai = 58
Bitung = 60
Blitar = 62
Bogor = 64
Bontang = 66
Bukittinggi = 68
Cilegon = 70
Cimahi = 72
Cirebon = 74
Denpasar = 6
Depok = 76
Dumai = 78
Gorontalo = 38
Gunungsitoli = 80
Jambi = 19
Jayapura = 9
Jember = 82
Kediri = 84
Kendari = 36
Kotamobagu = 86
Kupang = 28
Langsa = 88
Lhokseumawe = 90
Lubuklinggau = 92
Madiun = 94
Magelang = 98
Makassar = 13
Malang = 96
Mamuju = 37
Manado = 15
Manokwari = 41
Mataram = 29
Medan = 14
Mojokerto = 100
Padang = 16
Padangpanjang =  102 
Padangsidempuan = 104
Pagar Alam = 106
Palangkaraya = 31
Palembang = 20
Palopo = 108
Palu = 35
Pangkal Pinang = 23
Pangkalpinang = 110
Parepare = 112
Pariaman = 114
Pasuruan = 116
Payakumbuh = 118
Pekalongan = 120
Pekanbaru = 18
Pematangsiantar = 122
Pontianak = 30
Prabumulih = 124
Probolinggo = 126
Sabang = 128
Salatiga = 130
Samarinda = 33
Sawahlunto = 132
Semarang = 26
Serang = 27
Sibolga = 134 
Singkawang = 136
Sofifi = 138
Solo = 40
Solok = 140
Sorong = 142
Subulussalam = 144
Sukabumi  = 146 
Sungai Penuh = 148
Surabaya = 4
Surakarta = 150
Tangerang = 152
Tangerang Selatan = 154
Tanjung Pinang = 24
Tanjung Selor = 34
Tanjungbalai = 156
Tarakan = 158
Tasikmalaya = 160
Tebing Tinggi = 162
Tegal = 164
Ternate = 166
Tidore Kepulauan = 168
Tomohon = 170
Tual = 172
Yogyakarta = 25] & apikey`});
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.sholat(no)
    .then(result => {
      res.json({
      status: true,
      code: 200,
      result: result
})
});
})



	
router.get('/textpro/joker-logo', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
   if (text === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-logo-joker-online-934.html", [
    text, 
  ])
  .then((data) => {
    download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });
	
	
router.get('/textpro/logo-wolf', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-wolf-logo-black-white-937.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/natural-leaves', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/natural-leaves-text-effect-931.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/logo-wolf2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-wolf-logo-galaxy-online-936.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/harry-potter', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-harry-potter-text-effect-online-1025.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/magma', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/hallowen-text', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/halloween-fire-text-effect-940.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/neon-light', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/broken-glass', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/broken-glass-text-effect-free-online-1023.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/art-papper', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-art-paper-cut-text-effect-online-1022.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/glossy', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-a-3d-glossy-metal-text-effect-1019.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/water-color', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/multi-color', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/neon-devil', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/sky-text', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/luxury', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/3d-luxury-gold-text-effect-online-1003.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/vintage', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-realistic-vintage-style-light-bulb-1000.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/writing', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/sand-writing-text-effect-online-990.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/engraved', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/sand-engraved-3d-text-effect-989.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/glue-text', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/minios', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/minion-text-effect-3d-online-978.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/pornhub', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/holograpic', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/holographic-3d-text-effect-975.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/deluxe-silver', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/deluxe-silver-text-effect-970.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/fabric', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/fabric-text-effect-online-964.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/wicker', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/wicker-text-effect-online-932.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/larva', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/lava-text-effect-online-914.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/toxic-bokeh', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/toxic-text-effect-online-901.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/stroberi', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/strawberry-text-effect-online-889.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/koi', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/koi-fish-text-effect-online-888.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/bread', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/bread-text-effect-online-887.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/horor-blood', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/horror-blood-text-effect-online-883.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/honey', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/honey-text-effect-868.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/ice', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/ice-cold-text-effect-862.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/rusty', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/rusty-metal-text-effect-860.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/3dstone', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/1917', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/1917-style-text-effect-online-980.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/thunder2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/space', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-space-3d-text-effect-online-985.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })
});

router.get('/textpro/hallowen', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/halloween-fire-text-effect-940.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/blood', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/blood-text-on-the-frosted-glass-941.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/thunder2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [
    text, 
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/astone', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-a-stone-text-effect-online-982.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/grafity-text', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/grafity-text2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/ninja-logo', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-ninja-logo-online-935.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/lion-logo', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
 if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-lion-logo-mascot-online-938.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/avengers-logo', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-3d-avengers-logo-online-974.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/marvel-logo2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/marvel-logo', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-logo-style-marvel-studios-ver-metal-972.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/glitch2', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/logo-wolf', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
 if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/matrix-style-text-effect-online-884.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/logo-wolf', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/firework-sparkle-text-effect-930.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/thunder', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  const text2 = req.query.text2;
  
  if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
    status: 404,
    message: `Input Parameter teks & apikey`
});
const check = await cekKey(apikey);
if (!check) return res.status(403).send({
    status: 403,
    message: `apikey ${apikey} not found, please register first!`
});
    zrapi 
  .textpro("https://textpro.me/thunder-text-effect-online-881.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/black-pink', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/drop-water', async(req, res, next) => {



  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/dropwater-text-effect-872.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/christmas', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/3d-gradient', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/3d-gradient-text-effect-online-free-1002.html", [
    text,
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/porn-hub', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text1;
  const text2 = req.query.text2;
  
 if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/textpro/captain', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text1;
  const text2 = req.query.text2;
  
 if (text === undefined || text2 === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    zrapi 
  .textpro("https://textpro.me/create-a-captain-america-text-effect-free-online-1039.html", [
    text, text2
  ])
  .then((data) => {
   download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    })

    });


router.get('/ephoto1', async(req, res, next) => {

  const apikey = req.query.apikey;

  const text = req.query.text;
  
 if (text === undefined ||  apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

mumaker
 .ephoto3("https://en.ephoto360.com/1917-style-text-effect-523.html", ["text"])
 .then((data) => console.log(data))
 .catch((err) => console.log(err));


    });


router.get('/random/quotes', async (req, res, next) => {
      const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });


       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/quotes`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
                 
                 result
             })
         })
           });

router.get('/random/fancytext', async (req, res, next) => {
        const apikey = req.query.apikey;
        const text = req.query.text
 if (text === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });


       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/fancytext?text=${text}`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
             
                 result
             })
         })
           });



router.get('/muslim/hadits', async (req, res, next) => {
  
          const kitab = req.query.kitab;
           const nomor = req.query.nomor;
	const apikey = req.query.apikey;
    if (kitab === undefined || nomor === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter kitab, nomor & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
       fetch(encodeURI(`https://hadits-api-zhirrr.vercel.app/books/${kitab}/${nomor}`))
        .then(response => response.json())
        .then(data => {
             res.json(
             data
             )
       })
         });


router.get('/goodbye', async (req, res) => {
	
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}
	const apikey = req.query.apikey;

	const nama = req.query.username
	const mem = req.query.memcount
	const avatar = req.query.ppurl
	const gname = req.query.groupname
	const bg = req.query.bgurl
	const asu = await getRandom()
	const asi = asu.replace('undefined', '')
	if (nama === undefined  || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
		const image = await new dcanvas.Goodbye()
			.setUsername(nama)
			.setDiscriminator(asi)
			.setMemberCount(mem)
			.setGuildName(gname)
			.setAvatar(avatar)
			.setColor("border", "#8015EA")
			.setColor("username-box", "#8015EA")
			.setColor("discriminator-box", "#8015EA")
			.setColor("message-box", "#8015EA")
			.setColor("title", "#8015EA")
			.setColor("avatar", "#8015EA")
			.setBackground(bg)
			.toAttachment();
		 download_Url(image, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})

    });


router.get('/cecan/china', async (req, res, next) => {
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/china.json'));
      const data = result[Math.floor(Math.random() * result.length)];

        download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/cecan/vietnam', async (req, res, next) => {
            
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/vietnam.json'));
      const data = result[Math.floor(Math.random() * result.length)];

           download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/cecan/thailand', async (req, res, next) => {
            
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/thailand.json'));
      const data = result[Math.floor(Math.random() * result.length)];

        download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/cecan/indonesia', async (req, res, next) => {
            
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/indonesia.json'));
      const data = result[Math.floor(Math.random() * result.length)];

          download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
		  })
    });
router.get('/cecan/korea', async (req, res, next) => {
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/korea.json'));
      const data = result[Math.floor(Math.random() * result.length)];

          download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/cecan/japan', async (req, res, next) => {
            
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/japan.json'));
      const data = result[Math.floor(Math.random() * result.length)];

         download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });
router.get('/cecan/malaysia', async (req, res, next) => {
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/malaysia.json'));
        const data = result[Math.floor(Math.random() * result.length)];

            download_Url(data, './media/image.jpg', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });


router.get('/primbon/zodiak', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  
 if (text === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });


    fetch(encodeURI(`http://revita.herokuapp.com/api/primbon/zodiaku?mimpi=${text}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/primbon/artimimpi', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  
 if (text === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });


    fetch(encodeURI(`http://kocakz.herokuapp.com/api/primbon/tafsirmimpi?mimpi=${text}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/primbon/artinama', async(req, res, next) => {
  const apikey = req.query.apikey;
  const text = req.query.text;
  
  if (text === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });


    fetch(encodeURI(`http://kocakz.herokuapp.com/api/primbon/artinama?name=${text}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/download/unplash', async(req, res, next) => {
  const apikey = req.query.apikey;
  const q = req.query.q;
  
  if (q === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });


    fetch(encodeURI(`https://api.zeks.me/api/unsplash?apikey=apivinz&q=${q}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/download/sticker', async(req, res, next) => {
  const apikey = req.query.apikey;
  const q = req.query.q;
  
 if (q === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`https://api.zeks.me/api/searchsticker?apikey=reyterganz&q=${q}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.sticker;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/downloader/xnxx', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  
 if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/xnxx/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/downloader/twittervid', async(req, res, next) => {
  const apikey = req.query.apikey;
  const url = req.query.url;
  
  if (url === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter url & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/twvid?url=${url}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.getVideo;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });

router.get('/downloader/xvideo', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  
   
 if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/xvideo/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
        });

router.get('/downloader/pornhub', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  
  
 if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`http://kocakz.herokuapp.com/api/media/pornhub/search?query=${query}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.res;
             res.json({
                 status : true,
                  
                 result
             })
         })
        });

router.get('/downloader/pinterest', async(req, res, next) => {
  const apikey = req.query.apikey;
  const q = req.query.q;
  
  
 if (q === undefined || apikey === undefined) return res.status(404).send({
       status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    fetch(encodeURI(`https://aqulzz.herokuapp.com/pinterest?q=${q}`))
    .then(response => response.json())
        .then(hasil => {

        var result = hasil.result;
             res.json({
                 status : true,
                  
                 result
             })
         })
        });




router.get('/stalk/npm', async (req, res, next) => {
          const apikey = req.query.apikey;
  const query = req.query.query;
  
  
 if (query === undefined || apikey === undefined) return res.status(404).send({
       status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
       fetch(encodeURI(`https://registry.npmjs.org/${query}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 status : true,
                  
                 result
             })
         })
         });
router.get('/random/faktaunik', async (req, res, next) => {
         const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/faktaunik`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
                  
                 result
             })
         })
         });
router.get('/random/katabijak', async (req, res, next) => {
       const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/katabijak`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
                  
                 result
             })
         })
         });
router.get('/random/pantun', async (req, res, next) => {
        const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

       fetch(encodeURI(`http://kocakz.herokuapp.com/api/random/text/pantun`))
        .then(response => response.json())
        .then(hasil => {
        var result = hasil.result;
             res.json({
                  
                 result
             })
         })
         });
router.get('/jadwal-bioskop', async(req, res, next) => {
 const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
const { default: Axios } = require('axios')
const cheerio = require('cheerio')

Axios.get('https://jadwalnonton.com/now-playing')
.then(({ data }) => {
     const $ = cheerio.load(data)
     let title = []
     let url = []
     let img = []
 	$('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a').get().map((rest) => {
         url.push($(rest).attr('href'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	title.push($(rest).attr('alt'))
         })
         $('div.row > div.item > div.clearfix > div.rowl > div.col-xs-6 > a > img').get().map((rest) => {
        	img.push($(rest).attr('src'))
         })
     let result = []
     for (let i = 0; i < url.length; i++) {
          result.push({
               	url: url[i],
               	title: title[i],
               	img: img[i]
          })
     }
     res.json({
 
     status: true,
     result: result
     })
})
});


router.get('/game/family100', async (req, res, next) => {
    const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
        var soal = JSON.parse(
            fs.readFileSync(__path + '/data/family100.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...soal[~~(Math.random() * soal.length)]
          })
    });

router.get('/game/tebakkalimat', async (req, res, next) => {
    const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
        var soal = JSON.parse(
            fs.readFileSync(__path + '/data/tebakkalimat.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...soal[~~(Math.random() * soal.length)]
          })
    });

router.get('/game/tebakkata', async (req, res, next) => {
    const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
        var soal = JSON.parse(
            fs.readFileSync(__path + '/data/tebakkata.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...soal[~~(Math.random() * soal.length)]
          })
    });

router.get('/game/tebakjenaka', async (req, res, next) => {
    const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
        var pertanyaan = JSON.parse(
            fs.readFileSync(__path + '/data/tebakjenaka.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...pertanyaan[~~(Math.random() * pertanyaan.length)]
          })
    });

router.get('/game/tebakkimia', async (req, res, next) => {
    const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
        var nama = JSON.parse(
            fs.readFileSync(__path + '/data/tebakkimia.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...nama[~~(Math.random() * nama.length)]
          })
    });

router.get('/game/tebaklirik', async (req, res, next) => {
    const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
        var question = JSON.parse(
            fs.readFileSync(__path + '/data/tebaklirik.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...question[~~(Math.random() * question.length)]
          })
    });

router.get('/game/tebakchara', async (req, res, next) => {
    const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
        var name = JSON.parse(
            fs.readFileSync(__path + '/data/tebakchara.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...name[~~(Math.random() * name.length)]
          })
    });

router.get('/game/tebaktebakan', async (req, res, next) => {
    const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
        var soal = JSON.parse(
            fs.readFileSync(__path + '/data/tebaktebakan.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...soal[~~(Math.random() * soal.length)]
          })
    });

router.get('/game/tebakbendera', async (req, res, next) => {
    const apikey = req.query.apikey;

 if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter teks & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
        var bendera = JSON.parse(
            fs.readFileSync(__path + '/data/tebakbendera.json')
        )
        res
          .status(200)
          .json({
              code: 200,
              success: true,
              ...bendera[~~(Math.random() * bendera.length)]
          })
    });
// asupan
router.get('/asupan/cecan', async (req, res, next) => {
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/cecan.json'));
      const data = result[Math.floor(Math.random() * result.length)];

        download_Url(data, './media/video.mp4', function(){
                limitAdd(apikey);
                   res.sendFile(path.resolve('./media/video.mp4'))
})
    });
router.get('/asupan/hijaber', async (req, res, next) => {
            
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/hijaber.json'));
      const data = result[Math.floor(Math.random() * result.length)];

       download_Url(data, './media/video.mp4', function(){
                limitAdd(apikey);
                   res.sendFile(path.resolve('./media/video.mp4'))
})
    });
router.get('/asupan/asupan', async (req, res, next) => {
            
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
  const result = JSON.parse(fs.readFileSync(__path +'/data/asupan1.json'))
      const data = result[Math.floor(Math.random() * result.length)];

           download_Url(data, './media/video.mp4', function(){
                limitAdd(apikey);
                   res.sendFile(path.resolve('./media/video.mp4'))
})
    });
router.get('/asupan/rikagusriani', async (req, res, next) => {
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/asupan/rikagusriani.json'));
      const data = result[Math.floor(Math.random() * result.length)];

           download_Url(data, './media/video.mp4', function(){
                limitAdd(apikey);
                   res.sendFile(path.resolve('./media/video.mp4'))
})
    });
router.get('/asupan/santuy', async (req, res, next) => {
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/santuy.json'));
      const data = result[Math.floor(Math.random() * result.length)];

          download_Url(data, './media/video.mp4', function(){
                limitAdd(apikey);
                   res.sendFile(path.resolve('./media/video.mp4'))
})
    });
router.get('/asupan/ukhty', async (req, res, next) => {
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/ukhty.json'));
      const data = result[Math.floor(Math.random() * result.length)];

         download_Url(data, './media/video.mp4', function(){
                limitAdd(apikey);
                   res.sendFile(path.resolve('./media/video.mp4'))
})
    });
router.get('/asupan/bocil', async (req, res, next) => {
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/bocil.json'));
      const data = result[Math.floor(Math.random() * result.length)];

      download_Url(data, './media/video.mp4', function(){
                limitAdd(apikey);
                   res.sendFile(path.resolve('./media/video.mp4'))
})
    });
router.get('/asupan/gheayubi', async (req, res, next) => {
            
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

      
  const result = JSON.parse(fs.readFileSync(__path +'/data/geayubi.json'));
      const data = result[Math.floor(Math.random() * result.length)];

         download_Url(data, './media/video.mp4', function(){
                limitAdd(apikey);
                res.sendFile(path.resolve('./media/image.jpg'))
})
    });

router.get('/muslim/quran', async (req, res, next) => {
        const apikey = req.query.apikey;
            surah = req.query.surah;
            ayat = req.query.ayat;
            
	    if (surah === undefined || ayat === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter nama surah, nomor surah & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
       fetch(encodeURI(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });

router.get('/muslim/tahlil', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/dataTahlil.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/wirid', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/dataWirid.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/ayatkursi', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/dataAyatKursi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/doaharian', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/dataDoaHarian.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/bacaanshalat', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/dataBacaanShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/niatshalat', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/dataNiatShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/kisahnabi', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/dataKisahNabi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/asmaulhusna', async (req, res, next) => {
        var Apikey = req.query.apikey

	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

	asmaul = JSON.parse(fs.readFileSync(__path +'/data/AsmaulHusna.json'));
	res.json(asmaul)
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/muslim/niatshubuh', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/NiatShubuh.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/niatdzuhur', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/NiatDzuhur.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/niatmaghrib', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/NiatMaghrib.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/niatisya', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/NiatIsya.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });


router.get('/muslim/niatashar', async (req, res, next) => {
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

       fetch(encodeURI(`https://wannxteam.github.io/My-SQL-Results/main/data/NiatAshar.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });
router.get('/muslim/jadwalshalat', async (req, res, next) => {
        const kota = req.query.apikey
const apikey = req.query.apikey;
    if (kota === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter kota dan apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    
       fetch(encodeURI(`https://wannxteam.github.io/Zhirrr-Database/main/adzan/${kota}/2021/03.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })  
       })
         });





router.get('/ytplay', youtubePlay);

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/ptl', ptl);

router.get('/ig', igDownload);

router.get('/fb', fbDown);

router.get('/tt', TiktokDown);

router.get('/gempa', GempaBumi);

router.get('/twitter', twitterDl);

router.get('/pinterest', pinterestSearch);


router.get('/nabi', Nabi);

router.get('/motivasi', motivasi);

router.get('/oxy/:tema', photoOxy);

module.exports = router;
