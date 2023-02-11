/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
    return {
        ...options,
        entry: ['webpack/hot/poll?100', options.entry],
        watchOptions: {
            // без этого не успевает в Docker Hot Module Reload!!!
            aggregateTimeout: 100,
            poll: 100,
        },
        externals: [
            nodeExternals({
                allowlist: ['webpack/hot/poll?100'],
            }),
        ],
        plugins: [
            ...options.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin({
                paths: [/\.js$/, /\.d\.ts$/, /node_modules/],
            }),
            new RunScriptWebpackPlugin({
                name: options.output.filename,
                autoRestart: true,
            }),
        ],
    };
};
