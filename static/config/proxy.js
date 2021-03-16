var proxyTable = {}
// var requestDomain = 'http://demo.cwjia.cn'
var requestDomain = 'http://192.168.0.252/pet-api'
proxyTable = {
  // http://192.168.0.252 http://demo.cwjia.cn
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
