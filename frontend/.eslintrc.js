module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'jest/globals': true,
        'node': true

    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:testing-library/react'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'jest'
    ],
    'rules': {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'semi': ['error', 'never'],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }]
    },
    'globals': {
        'React': 'writable'
    }
}
