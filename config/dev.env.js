'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const utils = require('../build/utils')
const ENV = utils.getEnv()

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV: ENV ? `'${ENV}'` : '"development"'
})
