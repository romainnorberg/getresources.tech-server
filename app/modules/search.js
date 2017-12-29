"use strict";

const algolia = require('../../config/algolia');

module.exports = (io, socket) => {
    // On search
    socket.on('search', function (searchParameters) {

        console.log('search');

        // Empty
        if (!searchParameters.q) {
            return;
        }

        // Create search query
        let query = {};
        query.tags = '';

        if (searchParameters.q) {
            query.name = searchParameters.q;
        }

        if (searchParameters.tags) {
            query.tags = searchParameters.tags;

            query.tags = query.tags.map(i => i.facet + ':' + i.label); // preprend with 'facet:label'
            query.tags = query.tags.join(' AND '); // join with separator. example: 'tags:expressjs AND tags:bootstrap'
        }

        // Init Algolia index
        let sitesIndex = (algolia.clientSearch()).initIndex('sites');

        // Algolia search
        sitesIndex
            .search(query.name, {
                filters: query.tags
            })
            .then(function (content) {
                let data = {};
                data.hits = content.hits;

                io.emit('found', data);
            })
            .catch(function (err) {
                console.error(err);
            });
    });
};