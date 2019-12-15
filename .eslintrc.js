module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        amd: true,
        node: true

    },
    extends: ["eslint:recommended",
        "plugin:jest/recommended"
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    },
    plugins: ["jest"]
};