const { LAYOUT } = require('../../config');

module.exports = () => ({
    devServer: {
        historyApiFallback: true, // Redirects all requests to index.html
        port: LAYOUT.PORT
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
                                syntax: 'ecmascript'
                            }
                        }
                    }
                },
                type: 'javascript/auto',
                exclude: /node_modules/
            }
        ]
    },
    plugins: []
});
