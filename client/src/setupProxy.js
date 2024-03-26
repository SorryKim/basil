const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://211.183.3.201:8088/",

      changeOrigin: true,
    })
  );
};
