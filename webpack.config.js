const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = (env = {}) => {
  const { mode = "development" } = env;
  const isProd = mode === "production";
  const isDev = mode === "development";
  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            title: "Paint Online",
            buildTime: new Date().toString(),
            template: "public/index.html",
          },
          isProd
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      new webpack.DefinePlugin({
        IS_DEV_MODE: isDev,
        IS_PRODUCTION_MODE: isProd,
        DEV_MODE: mode,
      }),
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "main-[hash:8].css",
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        })
      );
    }

    return plugins;
  };

  const getOptimization = () => {
    if (isProd) {
      return {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warning: false,
                inline: 2,
              },
              mangle: {
                // Find work around for Safari 10+
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii__only: true,
              },
            },
            // Use multi-process parallel running to improve the build speed
            parallel: true,
            // Enable file caching
            cache: true,
          }),
        ],
      };
    }
    return undefined;
  };

  return {
    mode: isProd ? "production" : isDev && "development",
    devtool: "inline-source-map",
    output: {
      filename: isProd ? "main-[hash:8].js" : undefined,
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        //Loading TS
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
        },
        //Loading BABEl
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          loader: "babel-loader",
        },
        //loading CSS
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        //Loading SASS/SCSS
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), "sass-loader"],
        },
        //Loading Images
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: "asset/inline",
          // esModule: false,
        },
        //Loading Fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        styles: path.resolve(__dirname, "src/styles"),
        tools: path.resolve(__dirname, "src/tools"),
      },
      extensions: [".js", ".jsx"],
    },

    plugins: getPlugins(),

    devServer: {
      open: true,
      https: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },

    optimization: getOptimization(),
  };
};
