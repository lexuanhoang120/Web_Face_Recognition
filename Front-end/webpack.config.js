const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ForkIsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const publicPath = path.resolve("public");
const handleCopyPluginPatterns = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(publicPath, (err, files) => {
      if (err) reject("Unable to scan directory: " + err.message);

      resolve(files);
    });
  });
};

module.exports = async (env, argv) => {
  const isDev = argv.mode === "development";
  const isAnalyze = env && env.analyze;
  const files = (await handleCopyPluginPatterns()) ?? [];

  const copyPluginPatterns = files
    .filter((file) => file !== "index.html")
    .map((file) => {
      return {
        from: file,
        to: "",
        context: path.resolve("public"),
      };
    });

  const basePlugins = [
    /*
        Wraps dotenv and Webpack.DefinePlugin. As such, it does a text replace in the resulting bundle for any instances of process.env.
        .env
            DB_HOST=127.0.0.1
            DB_PASS=foobar
            S3_API=mysecretkey
        index.js
            console.log(process.env.DB_HOST);
        bundle.js
            console.log('127.0.0.1');
        Note: the .env values for DB_PASS and S3_API are NOT present in our bundle, as they were never referenced (as process.env.[VAR_NAME]) in the code.
        */
    // npm install dotenv-webpack --save-dev
    new Dotenv({
      path: !isDev ? "./.env.production.local" : "./.env.development.local",
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        !isDev ? "production" : "development"
      ),
    }),
    /*
        The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.
        This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.
        The generated public/index.html file will load our bundle and bootstrap our application.
        */
    // npm install -D html-webpack-plugin
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "./public/vtco.png",
      // filename: "index.html",
      manifest: "./public/manifest.json",
    }),
    // Copies individual files or entire directories (public directory), which already exist, to the build directory.
    // npm install copy-webpack-plugin --save-dev
    new CopyPlugin({
      patterns: copyPluginPatterns,
    }),
    /*
        To perform type checking in a separate, parallel process using (typescript)
        Specifying async: false will prevent Webpack from emitting invalid code and
        show compilation errors in an overlay when running a development server.
        */
    // npm install -D fork-ts-checker-webpack-plugin
    new ForkIsCheckerWebpackPlugin({
      async: false,
    }),
    /*
        Service workers enable advanced optimization techniques and improvements to user experience.
        They let your app work offline when a user loses their network connection.
        They also let your app load instantaneously even after pushing an update.

        1. swDest specifies the output filename for the generated worker file.
        2. clientsClaim instructs the service worker to take control of the page immediately
            after registration and begin serving cached resources instead of waiting for the next page reload.
        3. skipWaiting makes updates to the service worker take effect immediately instead of waiting for all active instances to be destroyed.
        */
    // npm install -D workbox-webpack-plugin

    /*
        The GenerateSW plugin will create a service worker file for you and add it to the webpack asset pipeline.

        When to use generateSW;
        + You want to precache files.
        + You have simple runtime configuration needs (e.g. the configuration allows you to define routes and strategies).
        */
    // new GenerateSW({
    //     swDest: "service-worker.js",
    //     clientsClaim: true,
    //     skipWaiting: true
    // }),

    /*
        The InjectManifest plugin will generate a list of URLs to precache and
            add that precache manifest to an existing service worker file.
        It will otherwise leave the file as-is.

        When to use injectManifest:
        + You want more control over your service worker.
        + You want to precache files.
        + You have more complex needs in terms of routing.
        + You would like to use your service worker with other API's (e.g. Web Push).
        */
    // new InjectManifest({
    //     swSrc: './src/serviceWorker.js',
    //     swDest: 'sw.js'
    // }),

    /*
        Every time we make a change, the server reloads and we lose our state.
        We can add a Hot Module Replacement plugin that ships with webpack to our configuration to fix this.
        */
    // isDev && new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
  ];

  let productionPlugins = [
    ...basePlugins,
    /*
        By default, this plugin will remove all files inside webpack's output.path directory,
        as well as all unused webpack assets after every successful rebuild.
        */
    // npm install --save-dev clean-webpack-plugin
    new CleanWebpackPlugin(),
    /*
        Prepare compressed versions of assets to serve them with Content-Encoding.
        */
    // npm install compression-webpack-plugin --save-dev
    new CompressionPlugin({
      test: /\.(css|js|html|svg|jpe?g|png|ico|gif)$/,
      algorithm: "gzip", // zlib,
      // include: /\/includes/,
      // exclude: /\excludes/
      // threshold: 0, // Only assets bigger than this size are processed. In bytes.
    }),
    /*
        This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
        It supports On-Demand-Loading of CSS and SourceMaps.
        */
    // npm install --save-dev mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "static/css/[name].[contenthash:6].css",
    }),
  ];

  if (isAnalyze) {
    productionPlugins = [...productionPlugins, new BundleAnalyzerPlugin()];
  }

  return {
    devtool: isDev ? "source-map" : false,
    entry: "./src/index.js",
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
      filename: "static/js/main.[contenthash:6].js",
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: false,
      },
    },
    module: {
      rules: [
        {
          // babel-loader responsible for loading JavaScript files:
          test: /\.(js|jsx|ts|tsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: !isDev ? "production" : "development",
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack", "url-loader"],
        },
        {
          /*
                    css-loader: Parses CSS files, resolving external resources, such as images, fonts, and additional style imports.
                    style-loader: During development, injects loaded styles into the document at runtime.
                    mini-css-extract-plugin: Extracts loaded styles into separate files for production use to take advantage of browser caching.
                    */
          // npm install -D css-loader style-loader mini-css-extract-plugin
          test: /\.css$/,
          use: [
            !isDev ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: isDev ? true : false },
            },
          ],
        },
        {
          // CSS Modules
          // e.g: home.module.css
          test: /\.module.css$/,
          use: [
            !isDev ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          /*
                    1. We introduced resolve-url-loader after sass-loader to make relative imports work from @imported Sass files.
                    2. We specified importLoaders option for css-loader to process @import-ed files using the loaders that follow it.
                    */
          // npm install -D sass-loader node-sass resolve-url-loader
          test: /\.s[ac]ss$/,
          use: [
            !isDev ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          /*
                    Handle common image formats. What sets url-loader apart from file-loader is that if the size of the original file is smaller
                    than a given threshold, it will embed the entire file in the URL as base64-encoded contents
                    */
          // npm install -D url-loader
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                limit: 8192,
                name: isDev
                  ? "[path][name].[ext]"
                  : "static/media/[name].[contenthash:6].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: isDev
                  ? "[path][name].[ext]"
                  : "static/fonts/[name].[ext]",
              },
            },
          ],
        },
        {
          // To work extension .graphql | .gql
          // npm i -D graphql-tag
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader",
        },
        {
          /*
                    Web workers is a powerful concept of the modern web. It lets you offload expensive computations away from the main thread.
                    Web workers should be used sparingly and reserved for things that can’t be otherwise optimized by intelligent scheduling inside an event loop.
                    Using web workers is a good candidate for optimizing long, synchronous operations.

                    The Worker interface of the Web Workers API represents a background task that can be created via script,
                    which can send messages back to its creator.
                    https://developer.mozilla.org/en-US/docs/Web/API/Worker
                    */
          // npm install -D worker-loader
          test: /\.worker\.js$/,
          loader: "worker-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
    },
    optimization: {
      minimize: !isDev,
      minimizer: [
        /*
                We will begin with code minification, a process by which we can reduce the size of our bundle at no expense in terms of functionality.
                We’ll use two plugins for minimizing our code: terser-webpack-plugin for JavaScript code.
                */
        // npm install -D terser-webpack-plugin
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
        /*
                Just like optimize-css-assets-webpack-plugin but more accurate with source maps and assets using query string,
                allows to cache and works in parallel mode
                */
        // npm install css-minimizer-webpack-plugin --save-dev
        new CssMinimizerPlugin({
          test: /\.css$/,
          parallel: true,
          // include: "",
          // exclude: "",
          minify: CssMinimizerPlugin.cssnanoMinify,
        }),
      ],
      /*
            Code splitting can refer to two different approaches:
            1. Using a dynamic import() statement, we can extract parts of the application that make up a significant portion of our bundle size, and load them on demand.
            2. We can extract code which changes less frequently, in order to take advantage of browser caching and improve performance for repeat-visitors.

            Let’s take a deeper look at the options we’ve used here:

            chunks: "all": By default, common chunk extraction only affects modules loaded with a dynamic import().
                This setting enables optimization for entry-point loading as well.
            minSize: 0: By default, only chunks above a certain size threshold become eligible for extraction.
                This setting enables optimization for all common code regardless of its size.
            maxInitialRequests: 20 and maxAsyncChunks: 20: These settings increase the maximum number of source files that can be loaded in parallel for entry-point imports and
                split-point imports, respectively.
            Additionally, we specify the following cacheGroups configuration:

            vendors: Configures extraction for third-party modules.
            test: /[\\/]node_modules[\\/]/: Filename pattern for matching third-party dependencies.
            name(module, chunks, cacheGroupKey): Groups separate chunks from the same module together by giving them a common name.
            common: Configures common chunks extraction from application code.
            minChunks: 2: A chunk will be considered common if referenced from at least two modules.
            priority: -10: Assigns a negative priority to the common cache group so that chunks for the vendors cache group would be considered first.
            We also extract Webpack runtime code in a single chunk that can be shared between multiple entry points, by specifying runtimeChunk: "single".
            */
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `${cacheGroupKey}.${packageName.replace("@", "")}`;
            },
          },
          common: {
            minChunks: 2,
            priority: -10,
          },
        },
      },
      runtimeChunk: "single",
    },
    /*
        Here we’ve used the following options:
        compress: true: Enables asset compression for faster reloads.
        historyApiFallback: true: Enables a fallback to index.html for history-based routing.
        open: true: Opens the browser after launching the dev server.
        overlay: true: Displays Webpack errors in the browser window.
        hot: true: Tells webpack we need to enable HotModuleReplacement plugin
        */
    devServer: {
      compress: true,
      port: 3000,
      historyApiFallback: true,
      open: true,
      hot: true,
    },
    plugins: isDev ? basePlugins : productionPlugins,
    performance: {
      hints: false,
      maxEntrypointSize: 250 * 1024, // Khi có 1 file build vượt quá giới hạn này (tính bằng byte) thì sẽ bị warning trên terminal.
      maxAssetSize: 250 * 1024,
    },
  };
};