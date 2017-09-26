module.exports = {
  entry: '/src/index.js', 
  output: {
    path: __dirname + 'dist', 
    filename: 'bundle.js', 
  }, 
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test:/\.scss$/,
        use:['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
