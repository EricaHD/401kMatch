const path_common = require('path');

module.exports = {
  // Where webpack looks to start building the bundle
  entry: {
    main: path_common.resolve(__dirname, './src/index.tsx'),
  },

  // Where webpack outputs the assets and bundles
  output: {
    path: path_common.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },

  // Look for file with each of these extensions until file is found
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.css',
      '.ico',
      '.gif',
      '.png',
      '.jpg',
      '.jpeg',
      '.woff',
      '.woff2',
      '.eot',
      '.ttf',
      '.otf',
      '.svg',
    ],
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      // TypeScript
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'ts-loader',
      },
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
};
