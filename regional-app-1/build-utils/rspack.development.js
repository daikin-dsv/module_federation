const ReactRefreshWebpackPlugin = require('@rspack/plugin-react-refresh');

const { REGIONAL_APP_1 } = require('../../config');

module.exports = () => ({
    devServer: {
        port: REGIONAL_APP_1.PORT
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: {
                    loader: 'builtin:swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'ecmascript',
                                jsx: true
                            },
                            transform: {
                                react: {
                                    development: true,
                                    refresh: true
                                }
                            }
                        }
                    }
                },
                type: 'javascript/auto',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new ReactRefreshWebpackPlugin()]
});
