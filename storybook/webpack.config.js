module.exports = {
  module: {
    loaders: [
      {
        test: /\.svg$/,
        loader: 'url',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/(node_modules)/, /react-css-themr/]
      }, {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?sourceMap&modules&localIdentName=[name]_[local]&importLoaders=1',
          'sass?sourceMap',
        ]
      }
    ]
  }
};
