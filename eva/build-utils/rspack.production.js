module.exports = () => ({
    output: {
        filename: 'bundle.[contenthash].js',
        publicPath: process.env.EVA_URL ? `${process.env.EVA_URL}/` : '',
    }
});
