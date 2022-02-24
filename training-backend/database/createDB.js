const mysql = require('mysql2/promise');

process.env.NODE_CONFIG_DIR = '../config'

const config = require('config');

const dbConfig = config.get('database');
const dbName = dbConfig.database || "DB_NAME";

console.log('dbConfig: ', dbConfig);

mysql.createConnection({
    host: dbConfig.host || "127.0.0.1",
    port: dbConfig.post || "3306",
    user: dbConfig.username || "root",
    password: dbConfig.password || "",
}).then(connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Database create or successfully checked");
        process.exit(0);
    })
})