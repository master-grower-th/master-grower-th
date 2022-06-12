const express = require("express");
const app = express();
const http = require("http").Server(app);
const fs = require("fs");
const io = require("socket.io")(http);
const request = require("request");
const cors = require("cors");
const socketioJwt = require("socketio-jwt")
require("console-stamp")(console, "dd/mm/yyyy HH:MM");
const path = require('path');
const crypto = require("crypto");
const jwtSecret = "LK(#@$*US{FPO_+!PDKF++!@#)_(I$!(I)!"
var multer = require('multer')

// io.sockets
//   .on('connection', socketioJwt.authorize({
//     secret: jwtSecret
//   })).on('authenticated', (socket) => {
//     console.log(socket.decoded_token.username, " connection")
//   })

//include internal file
const user_con = require("../master-grower-th/controllers/user")
const article_con = require("../master-grower-th/controllers/article")
const flower_con = require("../master-grower-th/controllers/flower_store")
const diaries_con = require("../master-grower-th/controllers/diaries")

app.use(
  cors({
    origin: "*",
  })
);

//HTML Render
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/shop', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/diaries', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/match', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/article_create', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/articles', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/articles_read', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/diaries_create', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/diaries', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/diaries_read', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/store', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/store_create', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/flower', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
app.get('/profile', function (req, res) {
  res.sendFile(__dirname + '/html/index.html');
});

app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/assets"));
app.use("/html/setup", express.static(__dirname + "/html/setup"));
app.use(express.static(__dirname + "/html/setup"));
app.use("/html", express.static(__dirname + "/html"));
app.use(express.static(__dirname + "/html"));

http.listen(1444, () => console.log("Example app listening on port 1444!"));

async function checking_user(fuckcooking) {
  try {
    let username
    let status2
    async function main() {
      let running = await user_con.check_user(fuckcooking)
      if (running.status == 1) {
        username = running.username
        status2 = running.status
      } else {
      }
    }
    await main()
    return { status: status2, username: username }
  } catch (error) {
    //console.log(error)
  }
}
//App controller
app.get('/api/register', (req, res, next) => {
  let username = req.query.username
  let pass1 = req.query.pass1
  let pass2 = req.query.pass2
  let facebook = req.query.facebook
  try {
    async function main() {
      let running = await user_con.register(username, pass1, pass2, facebook)
      if (running == 0) res.send({ status: true, text: "สมัครสมาชิคสำเร็จ" })
      if (running == 1) res.send({ status: false, text: "รหัสไม่ตรงกัน" })
      if (running == 2) res.send({ status: false, text: "มีชื่อผู้ใช้นี้แล้ว" })
    }
    main()
  } catch (error) {

  }
})
app.get('/api/login', (req, res, next) => {
  let username = req.query.username
  let password = req.query.password
  try {
    async function main() {
      let running = await user_con.login(username, password)
      res.send(running)
    }
    main()
  } catch (error) {

  }
})
app.get('/api/at_list', (req, res, next) => {
  try {
    async function main() {
      let running = await article_con.at_list()
      res.send({ status: true, items: running })
    }
    main()
  } catch (error) {

  }
})
app.get('/api/flower_list', (req, res, next) => {
  try {
    async function main() {
      let running = await flower_con.flower_list()
      res.send({ status: true, items: running })
    }
    main()
  } catch (error) {

  }
})
app.get('/api/diaries_list', (req, res, next) => {
  try {
    async function main() {
      let running = await diaries_con.diaries_list()
      res.send({ status: true, items: running })
    }
    main()
  } catch (error) {

  }
})
app.get('/api/at_read', (req, res, next) => {
  let ids = req.query.id
  try {
    async function main() {
      let running = await article_con.at_read(ids)
      res.send({ status: true, items: running })
    }
    main()
  } catch (error) {

  }
})
app.get('/api/flower_read', (req, res, next) => {
  let ids = req.query.id
  try {
    async function main() {
      let running = await flower_con.flower_read(ids)
      res.send({ status: true, items: running })
    }
    main()
  } catch (error) {

  }
})
app.get('/api/diaries_read', (req, res, next) => {
  let ids = req.query.id
  try {
    async function main() {
      let running = await diaries_con.diaries_read(ids)
      res.send({ status: true, items: running })
    }
    main()
  } catch (error) {

  }
})
app.get('/api/check', (req, res, next) => {
  try {
    res.send({ status: true })
  } catch (error) {

  }
})
app.get('/api/diaries_week', (req, res, next) => {
  let ids = req.query.id
  try {
    async function main() {
      let running = await diaries_con.diaries_week(ids)
      res.send({ status: true, items: running })
    }
    main()
  } catch (error) {

  }
})
app.get('/api/article_create', (req, res, next) => {
  let fuckcook = req.query.fuckcook
  let title = req.query.title
  let type = req.query.type
  let image = req.query.image
  let text = req.query.text
  try {
    async function mega_main() {
      checking_true = await checking_user(fuckcook)
      if (checking_true.status == 1) {
        async function main() {
          let running = await article_con.article_create(checking_true.username, title, type, image, text)
          if (running == 0) res.send({ status: false, text: "สร้างบทความไม่สำเร็จ" })
          if (running == 1) res.send({ status: true, text: "สร้างบทความสำเร็จ" })
        }
        main()
      } else {
        res.send({ status: false, text: "Login ก่อนทำการเขียนบทความ" })
      }
    }
    mega_main()
  } catch (error) {
    res.send({ status: false, text: "Login ก่อนทำการเขียนบทความ" })
  }
})
app.get('/api/flower_create', (req, res, next) => {
  let fuckcook = req.query.fuckcook
  let breeder = req.query.breeder
  let strain = req.query.strain
  let g = req.query.g
  let oz = req.query.oz
  let _100 = req.query._100
  let thc = req.query.thc
  let cbd = req.query.cbd
  let ship = req.query.ship
  let info = req.query.info
  let contact = req.query.contact
  let image = req.query.image
  let type = req.query.type
  try {
    async function mega_main() {
      checking_true = await checking_user(fuckcook)
      if (checking_true.status == 1) {
        async function main() {
          let running = await flower_con.flower_create(checking_true.username, breeder, strain, g, oz, _100, thc, cbd, ship, info, contact, image, type)
          if (running == 0) res.send({ status: false, text: "ลงขายดอกไม้ไม่สำเร็จ" })
          if (running == 1) res.send({ status: true, text: "ลงขายดอกไม้สำเร็จ" })
        }
        main()
      } else {
        res.send({ status: false, text: "Login ก่อนทำการลงขายดอก" })
      }
    }
    mega_main()
  } catch (error) {
    res.send({ status: false, text: "Login ก่อนทำการลงขายดอก" })
  }
})
app.get('/api/diaries_create', (req, res, next) => {
  let fuckcook = req.query.fuckcook
  let title = req.query.title
  let strain = req.query.strain
  let breeder = req.query.breeder
  let indoor = req.query.indoor
  let light = req.query.light
  let watt = req.query.watt
  let medium = req.query.medium
  let veg_nutrient = req.query.veg
  let bloom_nutrient = req.query.bloom
  let image = req.query.image
  let seed_type = req.query.seed_type
  try {
    async function mega_main() {
      checking_true = await checking_user(fuckcook)
      if (checking_true.status == 1) {
        async function main() {
          console.log(title, checking_true.username, strain, breeder, indoor, light, watt, medium, veg_nutrient, bloom_nutrient, image, seed_type)
          let running = await diaries_con.diaries_create(title, checking_true.username, strain, breeder, indoor, light, watt, medium, veg_nutrient, bloom_nutrient, image, seed_type)
          if (running == 0) res.send({ status: false, text: "สร้างไดอรี่ไม่สำเร็จ" })
          if (running == 1) res.send({ status: true, text: "สร้างไดอรี่สำเร็จ" })
        }
        main()
      } else {
        res.send({ status: false, text: "Login ก่อนทำการเขียนไดอรี่" })
      }
    }
    mega_main()
  } catch (error) {
    res.send({ status: false, text: "Login ก่อนทำการเขียนไดอรี่" })
  }
})
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/user_upload')
  },
  filename: (req, file, cb) => {
    let customFileName = crypto.randomBytes(18).toString('hex'),
      fileExtension = file.originalname.split('.')[1] // get file extension from original file name
    cb(null, file.originalname.split('.')[0] + '.' + fileExtension)
  }
})
var upload = multer({ storage: storage })

app.post(
  "/api/uploading",
  upload.single("file"),
  (req, res) => {
    const tempPath = req.file.path;

    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
      res.write('<script>window.close();</script >');
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);
