//BundleAnalyzerPlugin 打包后文件大小比对 http://127.0.0.1:8888/
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//多线程+缓存打包， 优化打包速度
const UglifyJsParallelPlugin = require('webpack-parallel-uglify-plugin');
const path = require('path');

var fs = require('fs');
//配置文件路径
const configPath = './public/static/config.js';

function resolve(dir) {
    return path.join(__dirname, dir)
}

//打包时间
const Time = require('moment')().format('YYYY-MM-DD HH:mm:ss');


module.exports = {
    // 项目部署的基础路径
    // 我们默认假设你的应用将会部署在域名的根部，
    // 比如 https://www.my-app.com/
    // 如果你的应用时部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如，如果你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 `/my-app/`
    publicPath: './',

    // 将构建好的文件输出到哪里
    outputDir: 'dist',

    // 打包后放置静态资源的地方 (js/css/img/font/...)， 然而public里面的static会两者合并在一起
    assetsDir: 'static',

    // 是否在保存的时候使用 `eslint-loader` 进行检查。
    // 有效的值：`ture` | `false` | `"error"`
    // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
    lintOnSave: false,

    // 使用带有浏览器内编译器的完整构建版本
    // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
    // compiler: false,

    // babel-loader 默认会跳过 node_modules 依赖。
    // 通过这个选项可以显式转译一个依赖。
    transpileDependencies: [ /* string or regex */ ],

    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,

    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('api', resolve('src/api'))
            .set('assets', resolve('src/assets'))
            .set('common', resolve('src/common'))
            .set('views', resolve('src/views'))
            .set('components', resolve('src/components'));
        if (process.env.NODE_ENV === 'production') { 
          
        }

    },
    configureWebpack: (config) => {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.+
        //打包
        let plugins = [
            new UglifyJsParallelPlugin({
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false
                    },
                    compress: false
                }
            }),
            // new BundleAnalyzerPlugin()
           
        ];
        if (process.env.NODE_ENV === 'production') {        
            config.plugins = [...config.plugins, ...plugins];

            // let reg = /\<.*?\>/g;
            let regTime = /\&.*?\&/g;
            fs.readFile(configPath,'utf-8',function(err,data){
                if(err){
                    console.log('read file failed!');
                    throw err;
                }
                // let str = data.match(reg)[0].slice(1,-1);
                // console.log(str,'str...')
                // let index = str.lastIndexOf('.');
                // console.log(index,'index...')
                // let versonNum = parseInt(str.slice(index+1));
                // console.log(versonNum,'versonNum...')
                // versonNum++
                // var versonName = str.slice(0,index+1); 
                // console.log(versonName,'versonName...')   
                // //修改版本             
                // let versonUpdata = data.replace(reg,'<'+versonName+versonNum+'>');
                //修改打包时间
                let buildTimeUpdata = data.replace(regTime,'&buildTime='+Time+"&");
                fs.writeFile(configPath,buildTimeUpdata,{flag:'w',encoding:'utf-8',mode:'06666'},function(err){ })
            })

                

        }
       
    },

    // CSS 相关选项
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
        // extract: true,

        // 是否开启 CSS source map？
        sourceMap: false,

        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`。
        loaderOptions: {},

        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        modules: false
    },

    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,

    // PWA 插件的选项。
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
    pwa: {},



    // 配置 webpack-dev-server 行为。
    devServer: {
        // open: process.platform === 'darwin',
        //启动服务的ip和端口 localhost能自动启动本机ip host: '0.0.0.0'
        host: '0.0.0.0',
        port: 8888,
        https: false,
        hotOnly: false,
        open: true,
        hot: true,
        disableHostCheck: true,
        // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
        proxy: {
            '/api': {
                target: 'http://192.168.101.97:9005',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }, // string | Object
        before: app => {}
    },

    // 第三方插件的选项 jq等
    pluginOptions: {

    }
}