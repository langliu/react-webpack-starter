const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const mode = argv.mode || 'development'
  console.log('mode', env, argv)
  const isDev = argv.mode === 'development'
  return {
    devServer: {
      hot: true,
      port: 3000,
      open: false,
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
    },
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },
        {
          test: /\.module\.css$/,
          use: [
            isDev
              ? 'style-loader'
              : MiniCssExtractPlugin.loader
            ,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  auto: true,
                  localIdentName: '[local]__[hash:base64:10]',
                  exportLocalsConvention: 'asIs',
                },
                // 默认情况下，css-loader 生成使用 ES 模块语法的 JS 模块。`import { container } from '...'`
                // 如果你想使用 CommonJS 语法，你可以通过设置 esModule 选项来禁用 ES 模块语法。`import styles from './styles.module.css'`
                esModule: false
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            ...(
              mode === 'development'
                ? ['style-loader']
                : [MiniCssExtractPlugin.loader, 'style-loader']
            ),
            'css-loader'
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          type: 'asset',
        },
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin()
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
  }
}