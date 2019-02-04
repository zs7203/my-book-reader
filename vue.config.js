module.exports = {
  devServer: {
    proxy: {
      "/chapterapi": {
        target:
          "http://chapter2.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/chapterapi": ""
        }
      },
      "/api": {
        target: "http://api.zhuishushenqi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
