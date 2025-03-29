const { defineConfig } = require("@vue/cli-service");
const path = require("path");

// 1. 按需自动导入组件的插件
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  // 1. 方式一：使用Vue CLI提供的publicPath和outputDir配置
  outputDir: "./build", // 应用打包输出的目录
  publicPath: "/", // 配置应用程序部署的子目录（默认是 / ，相当于部署在根目录 https://www.my-app.com/ 中）

  // 2. 方式二：和webpack属性完全一致，最后与webpack的配置合并
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        "@": path.resolve(__dirname, "src"), // Vue CLI 5.0后默认已经配置了@别名
        components: "@/components"
      }
    },

    // 2. 方式二，使用函数语法
    // configureWebpack: (config) => {
    //   config.resolve.alias = {
    //     // "@": path.resolve(__dirname, "src"), // 无须配置
    //     components: "@/components"
    //   };
    // }

    // 3. 方式三：使用链式操作
    // chainWebpack: (config) => {
    //   config.resolve.alias
    //     // .set("@", path.resolve(__dirname, "src")) // 无须配置
    //     .set("components", "@/components");
    // }

    // 开发环境配置proxy代理
    // devServer: {
    //   proxy: {
    //     "^/api": {
    //       // target: 'http://152.136.185.210:4000',
    //       target: "http://codercba.com:5000",
    //       pathRewrite: {
    //         "^/api": ""
    //       },
    //       changeOrigin: true
    //     }
    //   }
    // },

    // 2. 为webpack添加插件
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },

  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false"
      });
      return definitions;
    });
  }
});
