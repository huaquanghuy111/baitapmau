const mysql2 = require('mysql2')

module.exports = {
  development: {
    username: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'user',
    host: process.env.HOST || 'localhost',
    port: process.env.DBPORT || 3306,
    dialect: 'mysql',
    dialectModule: mysql2
  },

  test: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    
    
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    
  }
};