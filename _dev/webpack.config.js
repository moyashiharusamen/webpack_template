const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LicenseInfoWebpackPlugin = require('license-info-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const browser = require('browser-sync').create();

const browserReload = () => {
    browser.reload({
        stream: true
    });
};

const config = {
    js: [
        {
            name: path.parse('./src/js/run.js').name,
            entry: path.resolve(__dirname, './src/js/run.js'),
            output: path.resolve(__dirname, '../common/js/')
        }
    ],
    scss: [
        {
            name: path.parse('./src/scss/master.scss').name,
            entry: {
                master: path.resolve(__dirname, './src/scss/master.scss')
            },
            output: path.resolve(__dirname, '../common/css/')
        }
    ]
};

// それぞれの設定をオブジェクトとして格納する為の配列
const moduleObject = [];

module.exports = (env, argv) => {
    // JSファイル処理
    config.js.forEach((item) => {
        const part = {
            entry: item.entry,
            output: {
                filename: `${item.name}.js`,
                path: item.output
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        // babel-loader : https://github.com/babel/babel-loader
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                // 必要なpolyfillだけ読み込む
                                ['@babel/preset-env', {
                                    targets: ['ie >= 11', 'safari >= 12'],
                                    useBuiltIns: 'usage',
                                    corejs: 3
                                }]
                            ]
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        enforce: 'pre',
                        // eslint-loader : https://github.com/webpack-contrib/eslint-loader
                        loader: 'eslint-loader',
                        options: {
                            fix: true
                        }
                    }
                ]
            },

            plugins: [
                // ライセンスの文言を表示するため
                new LicenseInfoWebpackPlugin({
                    glob: '{LICENSE,license,License}*'
                })
            ],

            // modeがdevelopmentの時に有効
            devtool: 'inline-source-map',

            // modeがproductionの時に有効
            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: {
                                drop_console: true
                            }
                        }
                    })
                ]
            }
        };

        part.entry[item.name] = item.entry;
        moduleObject.push(part);
    });

    // scssファイル処理
    config.scss.forEach((item) => {
        const part = {
            entry: item.entry,
            output: {
                filename: `${item.name}.css`,
                path: item.output
            },
            module: {
                rules: [
                    {
                        test: /\.scss$/,
                        use: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        url: false
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        plugins: [
                                            require('autoprefixer')({
                                                grid: true
                                            })
                                        ]
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        sassOptions: {
                                            indentWidth: 4,
                                            outputStyle: 'expanded'
                                        }
                                    }
                                }
                            ]
                        })
                    }
                ]
            },

            plugins: [
                new ExtractTextPlugin({
                    filename: `${item.name}.css`,
                    allChunks: false
                })
            ],

            // modeがdevelopmentの時に有効
            devtool: 'inline-source-map',

            optimization: {
                minimizer: [
                    new OptimizeCSSAssetsPlugin() // CSS の minify を行う
                ]
            }
        };

        moduleObject.push(part);
    });

    // modeがdevelopmentの時だけbrowser-syncを起動
    if (argv.mode === 'development') {
        browser.init({
            files: [
                '../**/*.css',
                '../**/*.js',
                '../**/*.html'
            ],
            startPath: './',
            server: {
                baseDir: '../',
                middleware: [
                    require('connect-ssi')({
                        baseDir: path.join(__dirname, '..'),
                        ext: '.html'
                    })
                ]
            }
        });

        browserReload();
    }

    return moduleObject;
};
