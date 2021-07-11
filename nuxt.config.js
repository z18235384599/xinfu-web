const CompressionPlugin = require('compression-webpack-plugin');

export default {
    loading: {
        continuous: true
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: '大家信夫',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'renderer', content: 'webkit' },
            { 'http-equiv': 'X-UA-Compatible', content: 'chrome=1' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            { rel: 'stylesheet', type: 'text/css', href: '/css/reset.css' },
        ],
        script: [
            { src: '/icon/iconfont.js' }
        ]
    },
    server: {
        port: 8000, // default: 3000
        host: '0.0.0.0' // default: localhost,
    },

    env: {
        baseUrl: process.env.baseUrl
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '@/theme/index.css',
        '@/theme/display.css',
        '@/static/icon/iconfont.css',
        { src: './assets/style/theme.scss', lang: 'scss' },
        { src: './assets/style/deep.scss', lang: 'scss' },
        { src: './assets/style/animation.scss', lang: 'scss' },
    ],
    script: [
    ],
    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        // { src: '~/mock/index.ts', ssr: true },
        '~/plugins/nprogress',
        '~/plugins/axios',
        '~/plugins/element-ui',
        '~/plugins/regEx.ts',
        '~/plugins/uuid.ts',
        '~/api/index.ts',
        '~/filters/index.ts',
        '~/plugins/util/index.ts',
        { src: '~/plugins/router', ssr: false },
        { src: '~/plugins/directives', ssr: true },
        { src: '~/plugins/element-ui', ssr: true },
        { src: '~/plugins/wangEditor', ssr: false },
        { src: '~/plugins/localStorage', ssr: false },
        { src: '~/plugins/QRCode', ssr: false },
        { src: '~/plugins/swiper', ssr: false }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        'cookie-universal-nuxt', ['cookie-universal-nuxt', { parseJSON: true }],
    ],
    styleResources: {
        scss: ['./assets/style/theme.scss', './assets/style/animation.scss'],
    },
    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},
    router: {
        scrollBehavior(to, from, savedPosition) {
            return { x: 0, y: 0 }
        }
    },
    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: [/^element-ui/],
        // 打包分析
        // analyze: true,
        // assetFilter: function (assetFilename) {
        //     return assetFilename.endsWith('.js');
        // },
        extend(config, { isClient }) {
            // Extend only webpack config for client-bundle

            // 生产打包时不输出map文件，增加打包速度
            if (isClient) {
                config.devtool = 'source-map'
            } else {
                config.devtool = 'none'
            }
        },
        plugins: [
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, // 匹配文件名
                threshold: 10240, // 对超过10kb的数据进行压缩
                deleteOriginalAssets: false // 是否删除原文件

            })
        ],
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000
            }
        },
    },
}