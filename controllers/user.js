const crypto = require("crypto");
var db = require('./db');
const jwtSecret = "LK(#@$*US{FPO_+!PDKF++!@#)_(I$!(I)!"
const jwt = require('jsonwebtoken');
const { resolve } = require("path");
const { rejects } = require("assert");

var users = {}
const register = (username, pass1, pass2, facebook) => {
    return new Promise((resolve, reject) => {
        if (pass1 != pass2) return resolve(1);
        db.query("SELECT * FROM users WHERE username = ?", [username]).then((results) => {
            if (results[0] != undefined) {
                return resolve(2)
            } else {
                db.query("INSERT INTO `users` (`username`, `password`, `facebook`, `last_login`) VALUES (?, ?, ?, ?)", [username, pass1, facebook, new Date()]).then((results, err) => {
                    if (err) reject(err);
                    resolve(0); //res.send({ status: true })
                })
            } //res.send({ status: false, text: "มีชื่อผู้ใช้นี้แล้ว" })
        })
    })
};
const login = (username, password) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE username = ? and password = ?", [username, password]).then((results) => {
            if (results[0] == undefined) {
                return resolve({ status: false, text: "ไม่พบผู้ใช้" })
            }
            let hash = crypto.createHash('md5').update(results[0].username + results[0].password + "MGTH#$@!#@sadojkd2fA103ASD80u").digest('hex')
            if (users.hasOwnProperty(hash)) {
                let token = jwt.sign({
                    id: results[0].id,
                    user: results[0].username,
                    hash: hash
                }, jwtSecret, { expiresIn: '420h' })
                return resolve({ status: true, id: results[0].id, user: results[0].username, cookie: hash, token: token })
            } else {
                users[hash] = results[0]
                let token = jwt.sign({
                    id: results[0].id,
                    user: results[0].username,
                    hash: hash
                }, jwtSecret, { expiresIn: '420h' })
                users[hash].token = token
                return resolve({ status: true, id: results[0].id, user: results[0].username, cookie: hash, token: token })
            }


        })
    })
};

const check_user = (fuckcook) => {
    return new Promise((resolve, reject) => {
        try {
            if (users[fuckcook].id === undefined) {
                return resolve({ status: 0 })
            } else {
                return resolve({ status: 1, username: users[fuckcook].username })
            }
        } catch (error) {
            return resolve({ status: 0 })
        }
    })
}

exports.register = register;
exports.login = login;
exports.check_user = check_user;