const { WIDGETS } = require('../../config');

module.exports = () => ({
    devServer: {
        port: WIDGETS.PORT
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
