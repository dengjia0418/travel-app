const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry:path.join(__dirname,'./src/index.jsx'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename: "bundle.js"
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'styles/[name].[hash:4].css',
      chunkFilename:'styles/[id].[hash].css'
    })
  ],
  module:{
    rules:[
      {
        test:/\.js[x]$/,
        use:['babel-loader'],
        include:/src/,
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test:/\.(jpg|jpe?j|png|gif)$/,
        use: [
          {
            loader:'url-loader',
            options: {
              limit: 8192,
              outputPath:'images/',
              name:'[name].[hash:4].[text]'
            }
          }
        ]
      },
      {
        test:/\.(ttf|eot|woff|svg)$/,
        use: [
          {
            loader:'file-loader',
            options:{
              outions:{
                outputPath:'font',
                name:'[name].[hash:4].[ext]'
              }
            }
          }
        ]
      },
      {
        test:/\.(htm|html)$/,
        use:'html-withimg-loader'
      }
    ]
  },
  devServer:{
    contentBase: path.join(__dirname, 'public'),
    hot:true,
    port:3000,
    historyApiFallback: true
  }

}