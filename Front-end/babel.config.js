/*
We are going to configure Babel using a separate configuration file, babel.config.js. It will use the following features:

@babel/preset-env: Transforms modern JavaScript features into backwards-compatible code.
@babel/preset-react: Transforms JSX syntax into plain-vanilla JavaScript function calls.
@babel/plugin-transform-runtime: Reduces code duplication by extracting Babel helpers into shared modules.
@babel/plugin-syntax-dynamic-import: Enables dynamic import() syntax in browsers lacking native Promise support.
@babel/plugin-proposal-class-properties: Enables support for the public instance field syntax proposal, for writing class-based React components.
We’ll also enable a few React-specific production optimizations:

babel-plugin-transform-react-remove-prop-types removes unnecessary prop-types from production code.
@babel/plugin-transform-react-inline-elements evaluates React.createElement during compilation and inlines the result.
@babel/plugin-transform-react-constant-elements extracts static React elements as constants.
The command below will install all the necessary dependencies:

npm install -D @babel/core babel-loader
npm install -D @babel/preset-env @babel/preset-react @babel/runtime @babel/plugin-transform-runtime 
npm install -D @babel/plugin-syntax-dynamic-import @babel/plugin-proposal-class-properties babel-plugin-transform-react-remove-prop-types 
npm install -D @babel/plugin-transform-react-inline-elements @babel/plugin-transform-react-constant-elements
npm install -D typescript @babel/preset-typescript @types/react @types/react-dom

- Generate a TypeScript configuration file
./node_modules/.bin/tsc -init --lib dom --jsx react --isolatedModules

Well, webpack’s HMR can’t preserve our applications state. 
To preserve that state, we’ll need another library called react-hot-loader (RHL). 
The library works together with webpack to deliver HMR to our application.
npm i -D react-hot-loader
*/

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false
            }
        ],
        [
            '@babel/preset-react', 
            {
                runtime: 'automatic'
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-react-jsx',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
    ],
    env: {
        production: {
            only: ['src'],
            plugins: [
                [
                    'transform-react-remove-prop-types',
                    {
                        removeImport: true
                    }
                ],
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements'
            ]
        }
    }
};