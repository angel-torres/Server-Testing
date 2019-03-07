const knex = require('knex');
const knexConfig = require('../knexfile');

const dbEnv = 'development'

module.exports = knex(knexConfig[dbEnv]);