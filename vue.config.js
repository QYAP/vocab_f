module.exports = {
  devServer: {
    port: 8080, // 端口号
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        target: "http://192.168.10.8:80/", //目标接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "" //重写接口,后面可以使用重写的新路径，一般不做更改
        }
      }
    }
  },
  lintOnSave: false // 关闭eslint代码检查
};