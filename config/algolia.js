const algoliasearch = require('algoliasearch');

// https://www.algolia.com/apps/J2AXB8E3W9/api-keys/restricted
module.exports = {
    clientSearch : () => {
        return algoliasearch(process.env.ALGOLIA_API_APPLICATION_ID, process.env.ALGOLIA_API_KEY_SEARCHONLY);
    },
    clientMaster : () => {
        return algoliasearch(process.env.ALGOLIA_API_APPLICATION_ID, process.env.ALGOLIA_API_KEY_MASTER);
    }
};