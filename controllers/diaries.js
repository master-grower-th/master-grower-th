var db = require('./db');

const diaries_create = (title, username, strain, breeder, indoor, light, watt, medium, veg_nutrient, bloom_nutrient, image, seed_type) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO `diaries` (`title`, `username`, `strain`, `breeder`, `indoor`, `light`, `watt`, `medium`, `veg_nutrient`, `bloom_nutrient`, `image`, `seed_type`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                title,
                username,
                strain,
                breeder,
                indoor,
                light,
                watt,
                medium,
                veg_nutrient,
                bloom_nutrient,
                image,
                seed_type
            ]
        ).then((results, err) => {
            return resolve(1) //success
        });
    })
};
const diaries_add_week = (ids, week, stage, ec, ppm, tech, hours, height, temp, rh, pot, percent, comment, image) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO `diaries_week` (`diaries_id`, `week`, `stage`, `ec`, `ppm`, `tech`, `hours`, `height`, `temp`, `rh`, `pot`, `percent`, `comment`, `image`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                ids,
                week,
                stage,
                ec,
                ppm,
                tech,
                hours,
                height,
                temp,
                rh,
                pot,
                percent,
                comment,
                image
            ]
        ).then((results, err) => {
            db.query("UPDATE diaries SET image = ? WHERE id = ?", [image, ids]).then((results, err) => {
                return resolve(1) //success
            })
        });
    })
};

const diaries_add_image = (ids, image) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM diaries_week WHERE diaries_id = ?", [
            ids,
        ]).then((results) => {
            imager = results[0].image + ',' + image + ''
            console.log(imager)
            db.query("UPDATE diaries_week SET image = ? WHERE diaries_id = ?", [imager, ids]).then((results, err) => {
                db.query("UPDATE diaries SET image = ? WHERE id = ?", [image, ids]).then((results, err) => {
                    return resolve(1) //success
                })
            })
        });
    })
};

const diaries_list = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM diaries WHERE status = ?", [
            0,
        ]).then((results) => {
            return resolve(results)
        });
    })
};
const diaries_read = (ids) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM diaries WHERE status = ? AND id = ?", [
            0,
            ids,
        ]).then((results) => {
            return resolve(results)
        });
    })
};
const diaries_week = (ids) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM diaries_week WHERE diaries_id = ? ORDER BY week ASC", [
            ids,
        ]).then((results) => {
            return resolve(results)
        });
    })
};
const diaries_week2 = (ids, weeks) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM diaries_week WHERE diaries_id = ? AND week = ?", [
            ids,
            weeks
        ]).then((results) => {
            return resolve(results)
        });
    })
};

exports.diaries_list = diaries_list;
exports.diaries_read = diaries_read;
exports.diaries_week = diaries_week;
exports.diaries_week2 = diaries_week2;

exports.diaries_create = diaries_create;
exports.diaries_add_week = diaries_add_week;
exports.diaries_add_image = diaries_add_image;
//exports.article_view = article_view;