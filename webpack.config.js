var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    // for faster builds use 'eval'
    devtool: 'source-map',
    debug: true, // remove in production

    entry: {
        'vendor': './src/vendor.ts', // third party libraries
        'app': './src/bootstrap.ts' // angular app
    },

    // Config for our build files
    output: {
        path: root('dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        // ensure loader extensions match
        extensions: ['', '.ts', '.tsx', '.js', '.json', '.css', '.html']
    },

    module: {
        preLoaders: [{test: /\.tsx?$/, loader: 'tslint'}],
        loaders: [
            // Support for .ts and .tsx files
            {
                test: /\.tsx?$/,
                loader: 'ts',
                query: {
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ]
                },
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
            },

            // Support for *.json files
            {test: /\.json$/, loader: 'json'},

            // Support for CSS as raw text
            {test: /\.css$/, loader: 'raw'},

            // Support for SASS as raw text
            {test: /\.scss$/, loader: 'raw!sass'},

            // Support for .html as raw text
            {test: /\.html$/, loader: 'raw'}
        ],
        noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/]
    },

    plugins: [
        new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        new CommonsChunkPlugin({name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor']})
        // include uglify in production
    ],

    // Other module loader config
    tslint: {
        emitErrors: false,
        failOnHint: false
    },

    // our Webpack Development Server config
    devServer: {
        historyApiFallback: true,
        contentBase: 'src/public',
        publicPath: '/dist'
    }
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}
