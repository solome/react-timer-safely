module.exports = {
  entry: {
    default: './examples/TimerSafelyTestComponent.js',
  },
  output: {
    filename: '[name].js',
    path: './webroot',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy'],
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ]
      },
    ]
  }
}
