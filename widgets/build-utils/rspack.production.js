module.exports = () => ({
    output: {
        filename: 'bundle.[contenthash].js',
        publicPath: `${process.env.WIDGETS_URL}/`
    }
});
