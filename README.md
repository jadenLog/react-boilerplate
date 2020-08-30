# React boilderplate (@emotion/core + eslint)

before start any, please run "npm install"

## build
- **npm test** (local development build) 

 this will run webpack-dev-server with hot loader (localhost:3000)

- **npm run prod** (production build)  

 this will build dist folder which includes bundle.js, vender.js, manifest.json, and index.html (and also source-map files)

## Eslint
 you can see the configuration setting on package.json. *eslint rules* are based with airbnb and some of the custom is applied on package.json (ex - indent 4 space, etc)  

## env
 *env* folder contains environment variable properties, which will be used from webpack "DefinePlugin".

 If you want to separate variables depends on environments(such as api endpoint),
 1. create "*.env.{{environment}}*" file from env folder.
 2. define variables on each environment .env files
 3. run "<u>webpack --env.ENVIRONMENT={{environment}} --config ./webpack/webpack.config.prod.js</u>"
