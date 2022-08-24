const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    process.env.REACT_APP_API_DEFAULT,
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^${process.env.REACT_APP_API_DEFAULT}`]: '',
      },
    }),
  );
};
