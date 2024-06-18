const { environment } = require('@rails/webpacker');
const babelLoader = environment.loaders.get('babel');
babelLoader.use.find(({ loader }) => loader === 'babel-loader').options.cacheDirectory = false;

module.exports = environment;

describe('Sample test suite', () => {
  test('Sample test', () => {
    expect(true).toBe(true);
  });
});
