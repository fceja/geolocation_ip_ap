import CopyWebpackPlugin from "copy-webpack-plugin";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const projectRoot = "./";

const config = {
  mode: "development",
  entry: `${projectRoot}/src/ts/index.tsx`,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, `${projectRoot}/dist`),
    publicPath: "/",
  },
  // set dev settings
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080,
    historyApiFallback: true,
  },
  // files to process
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // bootstrap
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  // files to resolve
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "tsconfig.json",
      }),
    ],
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new Dotenv({
      path: "./.env",
    }),
    // set html index
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),

    // copy neccessary files
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/favicon.ico", to: "favicon.ico" },
        { from: "./public/manifest.json", to: "manifest.json" },
      ],
    }),
  ],
};

export default config;
