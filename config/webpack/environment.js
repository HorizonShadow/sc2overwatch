const { environment } = require('@rails/webpacker');
environment.loaders.append('json', {
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader'
});

module.exports = environment;
