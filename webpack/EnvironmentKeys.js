/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

class EnvironmentKeys {
    static get(env) {
        // Get the app path
        const appPath = path.join(__dirname, '../');

        // Create the fallback path (the production .env)
        const basePath = `${appPath}/env/.env`;

        // We're concatenating the environment name to our filename to specify the correct env file!
        const envPath = `${basePath}.${env.ENVIRONMENT}`;

        // Check if the file exists, otherwise fall back to the production .env
        const finalPath = fs.existsSync(envPath) ? envPath : basePath;

        // Set the path parameter in the dotenv config
        const fileEnv = dotenv.config({ path: finalPath }).parsed;

        // reduce it to a nice object, the same as before (but with the variables from the file)
        const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
            // eslint-disable-next-line no-param-reassign
            prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
            return prev;
        }, {});

        return envKeys;
    }
}

module.exports = EnvironmentKeys;