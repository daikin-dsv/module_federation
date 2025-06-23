module.exports = () => ({
    output: {
        filename: 'bundle.[contenthash].js',
        publicPath: `${process.env.REGIONAL_APP_1_URL}/`,
    }
});
