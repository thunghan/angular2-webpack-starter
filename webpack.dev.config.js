var path = require('path');
var webpack = require('webpack');

// Webpack plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var DefinePlugin = webpack.DefinePlugin;

module.exports = {

    devtool: 'source-map',

    debug: true,

    entry: {
        'app': './app/bootstrap/bootstrap.ts',
        'vendor': './app/bootstrap/vendor.ts'
    },

    output: {
        path: root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.json', '.css', '.html']
    },

    module: {
        preLoaders: [
            // Lint support for .ts and .tsx files
            {test: /\.tsx?$/, loader: 'tslint'}
        ],
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
                exclude: [/\.(spec|e2e)\.tsx?$/, /node_modules/]
            },

            // Support for .json files
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
        new CommonsChunkPlugin({name: 'vendor', minChunks: Infinity}),
        new CommonsChunkPlugin({name: 'common', minChunks: 2, chunks: ['app', 'vendor']}),
        new DefinePlugin({
            DEVELOPMENT: true
        })
    ],

    tslint: {
        emitErrors: false,
        failOnHint: false
    },

    // Webpack Development Server config
    devServer: {
        historyApiFallback: true,
        contentBase: 'app/',
        publicPath: '/'
    }

};

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
