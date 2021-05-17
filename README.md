# React boilerplate (typescript + styled-components + eslint + jest)

before start any, please run "npm install"

## test

- **npm run test**

 running test code with coverage.  


## build
- **npm run local** (local development build) 

 this will run webpack-dev-server with hot loader. (localhost:8082)

- **npm run prod** (production build)  

 this will build dist folder which includes bundle.js, vender.js, manifest.json, and index.html (and also source-map files)

## Eslint
 you can see the configuration setting on package.json. *eslint rules* are based with airbnb and some of the custom is applied on package.json (ex - indent 2 space, etc)  

## env
 *env* folder contains environment variable properties, which will be used from webpack "dotenv-webpack".

 If you want to separate variables depends on environments(such as api endpoint),
 1. create "*.env.{{environment}}*" file from env folder.
 2. define variables on each environment .env files
