require('dotenv').config()
var mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: '',
    database: 'master-grower-th',
});
const db = {
    query: (sql, p = []) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                console.log(err)
                connection.query(sql, p, (error, results, fields) => {
                    console.log(error)
                    resolve(results);
                    connection.release();
                });
            });
        });
    },
};

module.exports = db;