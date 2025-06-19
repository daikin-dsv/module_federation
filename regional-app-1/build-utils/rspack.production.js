const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

const { LAYOUT, WIDGETS } = require('../../config');

module.exports = () => ({
    output: {
        filename: 'bundle.[contenthash].js',
        publicPath: ''
    },
    plugins: [
        new ModuleFederationPlugin({
            remotes: {
                Layout: `${LAYOUT.NAME}@${process.env.LAYOUT_URL}/remoteEntry.js`,
                Widget: `${WIDGETS.NAME}@${process.env.WIDGETS_URL}/remoteEntry.js`
            }
        })
    ]
});
