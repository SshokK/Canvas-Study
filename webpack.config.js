const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: [path.resolve(__dirname, 'src/js/index.js')],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/static/template.html')
    })
  ],
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, '/build'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"],
            plugins: [
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.svg/,
        include: [
          path.resolve(__dirname, 'src/static/icons'),
        ],
        use: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: [
          path.resolve(__dirname, 'src/static/icons'),
        ],
        use: [
          {
            loader: 'file-loader'
          },
        ]
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "src/js"), path.resolve(__dirname, "src/css")],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]"
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "src/js"), path.resolve(__dirname, "src/css")],
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      automaticNameDelimiter: '-',
      automaticNameMaxLength: 30,
      cacheGroups: {
        default: false,
        node_modules: {
          name: 'node_modules',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/
        },
        static: {
          name: 'static',
          chunks: 'all',
          test: /[\\/]src[\\/]static[\\/]/
        }
      }
    }
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      Components: path.resolve(__dirname, 'src/js/components'),
      Actions: path.resolve(__dirname, 'src/js/actions'),
      Reducers: path.resolve(__dirname, 'src/js/reducers'),
      Utils: path.resolve(__dirname, 'src/js/utils'),
      Icons: path.resolve(__dirname, 'src/static/icons'),
      '~': path.resolve(__dirname, 'src')
    }
  }
}

module.exports = [config]
