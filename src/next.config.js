const path = require('path');
const glob = require('glob');

module.exports = {
  webpack: (config) => {
   /* // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    // https://github.com/zeit/next.js/issues/1582#issuecomment-291025361
    config.plugins = config.plugins.filter(plugin => {
      if (plugin.constructor.name === 'UglifyJsPlugin') {
        return false;
      } else {
        return true;
      }
    });*/
    
    config.module.rules.push(
        {
            test: /\.(css|scss)/,
            loader: 'emit-file-loader',
            options: {
                name: 'dist/[path][name].[ext]'
            }
        }
        ,
        {
            test: /\.css$/,
            use: ['babel-loader', 'raw-loader', 'postcss-loader']
        }
        ,
        {
            test: /\.s(a|c)ss$/,
            use: ['babel-loader', 'raw-loader', 'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['styles', 'node_modules']
                            .map((d) => path.join(__dirname, d))
                            .map((g) => glob.sync(g))
                            .reduce((a, c) => a.concat(c), [])
                    }
                }
            ]
        }
    );
    
    return config;
  },
  exportPathMap() {
        return {
            '/': { page: '/' }
        };
    },
    distDir: 'build'
};
