const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

const { REGIONAL_APP_1, LAYOUT, WIDGETS } = require('../../config');
const shared = require('./moduleFederationShared');

module.exports = () => ({
    output: {
        filename: 'bundle.[contenthash].js',
        publicPath: process.env.REGIONAL_APP_2_URL ? `${process.env.REGIONAL_APP_2_URL}/` : '',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: REGIONAL_APP_1.NAME,
            remotes: {
                Layout: `${LAYOUT.NAME}@${process.env.LAYOUT_URL}/remoteEntry.js`,
                Widget: `${WIDGETS.NAME}@${process.env.WIDGETS_URL}/remoteEntry.js`
            },
            shared
        })
    ]
});
