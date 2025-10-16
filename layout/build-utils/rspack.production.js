export default () => ({
    entry: {
        remote: './src/index.js',
        layout: './src/components/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        publicPath: `${process.env.LAYOUT_URL}/`,
        library: { type: 'module' }
    },
    optimization: { minimize: true }
});
