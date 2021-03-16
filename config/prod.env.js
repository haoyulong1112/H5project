'use strict'

const utils = require('../build/utils')
const ENV = utils.getEnv()

module.exports = {
    NODE_ENV: '"production"',
    ENV: ENV ? `'${ENV}'` : '"production"'
}
