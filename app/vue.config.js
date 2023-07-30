const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false, //默认是true，这玩意是用来定位代码错误的
  transpileDependencies: true,
  lintOnSave:false,  //关闭严格语法检查
  devServer:{
    // proxy:{
    //   '/api':{
    //     // target:'http://gmall-h5-api.atguigu.cn',
    //     // ws: true,
    //     // changeOrigin: true, 
    //   }
    // }
    proxy:'http://localhost:3000'
    // proxy: {
    //   '/product': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/product': '/product'
    //     },
    //     ws: true
    //   }
    // }
  }
})
