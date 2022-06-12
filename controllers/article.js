var db = require('./db');

const article_create = (username, title, type, image, text) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO `article` (`username`, `title`, `type`, `image`, `text`, `status`) VALUES (?, ?, ?, ?, ?, ?)",
            [
                username,
                title,
                type,
                image,
                text,
                0
            ]
        ).then((results, err) => {
            return resolve(1) //success
        });
    })
};

const at_list = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM article WHERE status = ?", [
            0,
        ]).then((results) => {
            return resolve(results)
        });
    })
};
const at_read = (ids) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM article WHERE status = ? AND id = ?", [
            0,
            ids,
        ]).then((results) => {
            return resolve(results)
        });
    })
};

exports.at_list = at_list;
exports.at_read = at_read;

exports.article_create = article_create;
//exports.article_view = article_view;