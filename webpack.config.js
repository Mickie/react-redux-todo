module.exports = {
    module: {
        loaders: [
            {test: /\.js|jsx$/, exclude: /node_modules/, loader: "babel-loader",
                query:{plugins:[["import", { libraryName: "antd", style: "css" }]]},cacheDirectory: true},
            {test: /\.css$/, loader:"style!css"}
        ]
    },
};
