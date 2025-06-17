module.exports = () => ({
    output: {
        filename: 'bundle.[contenthash].js',
        publicPath: `${process.env.LAYOUT_URL}/`,
    }
});
