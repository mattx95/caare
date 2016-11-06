var pg = require('pg');
var Pool = require('pg').Pool(config);
var config = {
  user: 'caareuser', //env var: PGUSER
  database: 'caare', //env var: PGDATABASE
  password: 'cs316', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

module.exports.Pool = Pool;
module.exports.pg = pg;
