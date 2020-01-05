const path = require('path')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: [path.resolve(__dirname, 'src/js/index.js')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/static/template.html')
    })
  ],
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, 'build'),
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
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
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
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
}

module.exports = [config]
