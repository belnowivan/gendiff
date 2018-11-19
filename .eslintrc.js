module.exports = {
    "parser": "babel-eslint",
    'extends': [
        'airbnb-base',
        'plugin:jest/recommended'
    ],
    "plugins": ["babel", "jest"],
    "env": {
       "node": true,
       "jest": true,
    },
    'rules': {
        'no-console': 0,
    }
};