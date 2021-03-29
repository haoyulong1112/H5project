var proxyTable = {}
var requestDomain = 'http://8.141.49.230'
proxyTable = {
  // 开发环境接口转发，解决跨域
  [requestDomain]: {
    target: requestDomain,
    changeOrigin: true,
    pathRewrite: {
      [`^/${requestDomain}`]: ''
    }
  }
}
module.exports = proxyTable
