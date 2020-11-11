module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        'testing-library/globals': true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:testing-library/react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "testing-library"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off"

    },
    "globals": {
        "React": "writable"
    }
};
