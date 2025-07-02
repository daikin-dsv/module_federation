const { dependencies } = require('../package.json');

module.exports = {
    react: {
        singleton: true,
        requiredVersion: dependencies.react,
    },
    'react-dom': {
        singleton: true,
        requiredVersion: dependencies['react-dom'],
    },
    'react-router': {
        singleton: true,
        requiredVersion: dependencies['react-router'],
    },
    '@daikin-oss/design-system-web-components': {
        singleton: true,
        requiredVersion: dependencies['@daikin-oss/design-system-web-components'],
    },
    '@daikin-oss/dds-tokens': {
        singleton: true,
        requiredVersion: dependencies['@daikin-oss/dds-tokens'],
    }
};
