const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://preprod-dvs-api.dtone.com',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/v1/products',
    createProxyMiddleware(proxy)
  );
};