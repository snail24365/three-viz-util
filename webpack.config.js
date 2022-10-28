// webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: "./demo/index.ts",
        frame_object3d: "./demo/frame_object3d.ts",
        geometry_merger: "./demo/geometry_merger.ts",
        grid_modeler: "./demo/grid_modeler.ts"
    },  // 번들링 시작 위치
    output: {
        path: path.join(__dirname, "/demo_dist"), // 번들 결과물 위치
        filename: "[name].bundle.js",
    },
    module: {
        rules: [{
                test: /[\.js]$/, // .js 에 한하여 babel-loader를 이용하여 transpiling
                exclude: /node_module/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.ts$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
                exclude: /node_module/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
        extensions: [".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Demo Main",
            chunks : ['index'],
            template: "./demo/index.html", // 템플릿 위치
        }),
        new HtmlWebpackPlugin({
            filename: 'frame_object3d.html',
            chunks: ['frame_object3d'],
            template: "./demo/frame_object3d.html",
        }),
        new HtmlWebpackPlugin({
            filename: 'geometry_merger.html',
            chunks: ['geometry_merger'],
            template: "./demo/geometry_merger.html",
        }),
        new HtmlWebpackPlugin({
            filename: 'grid_modeler.html',
            chunks: ['grid_modeler'],
            template: "./demo/grid_modeler.html"
        }),
        
    ],
    devServer: {
        host: "localhost", // live-server host 및 port
        port: 5500,
    },
    mode: "development", // 번들링 모드 development / production
};