const path = require("path");

module.exports = {
    mode: "production",
    devtool: false,
    entry: "./src/main.ts", // Your entry point
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "service-worker.js", // Output file
        path: path.resolve(__dirname, "dist"),
    },
};
