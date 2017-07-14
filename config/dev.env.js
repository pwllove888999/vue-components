var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"//dq.demo.kaensoft.com/pzqy/xk-api/pzqy/v1"'
})
