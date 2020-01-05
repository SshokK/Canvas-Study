const path = require('path')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/static/template.html')
    })
  ],
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, '/src'),
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
      {
        test: /\.(png|jpe?g|gif)$/,
        include: [
          path.resolve(__dirname, 'src/static/sprites'),
        ],
        use: [
          {
            loader: 'url-loader'
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
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
    extensions: ['.js'],
    alias: {
      Sprites: path.resolve(__dirname, 'src/static/sprites'),
      Utils: path.resolve(__dirname, 'src/js/utils'),
      '~': path.resolve(__dirname, 'src')
    }
  }
}

module.exports = [config]
