module.exports = () => ({
    output: {
        filename: 'bundle.[contenthash].js',
        publicPath: process.env.REGIONAL_APP_2_URL ? `${process.env.REGIONAL_APP_2_URL}/` : '',
    }
});
