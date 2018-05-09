const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env, argv) => ({
  entry: { 
    bundle: './src/js/app.js',
    style: './src/sass/style.scss' 
  },

  output: {
    path: `${__dirname}/docs/assets/`,
    filename: 'js/[name].js'
  },

  devtool: argv.mode === 'production' ? 'none' : 'source-map',

  module: {
    rules: [
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: argv.mode === 'production' ? false : true,
                importLoaders: 2
              },
            }, 
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: argv.mode === 'production' ? false : true,
                plugins: [
                  require('autoprefixer')({ grid: true })
                ]
              },
            },  
            {
              loader: 'sass-loader',
              options: {
                sourceMap: argv.mode === 'production' ? false : true
              }
            }
          ]
        })
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {'modules': false }]  // "modules" true, it will be converted to CommonJS
              ]
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: [
          {
            loader: 'glslify-loader',
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'css/style.css'
    })
  ]
});