var db = require('./db');

const flower_create = (username, breeder, strain, g, oz, _100, thc, cbd, ship, info, contact, image, type) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO `store_flower` (`username`, `name`, `image`, `price_g`, `price_30`, `price_100`, `status`, `contact`, `information`, `type`, `ship`, `breeder`, `thc`, `cbd`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                username,
                strain,
                image,
                g,
                oz,
                _100,
                0,
                contact,
                info,
                type,
                ship,
                breeder,
                thc,
                cbd
            ]
        ).then((results, err) => {
            return resolve(1) //success
        });
    })
};

const flower_list = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM store_flower WHERE status = ?", [
            0,
        ]).then((results) => {
            return resolve(results)
        });
    })
};
const flower_read = (ids) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM store_flower WHERE status = ? AND id = ?", [
            0,
            ids,
        ]).then((results) => {
            return resolve(results)
        });
    })
};

exports.flower_list = flower_list;
exports.flower_read = flower_read;

exports.flower_create = flower_create;
//exports.article_view = article_view;