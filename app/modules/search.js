"use strict";

const algolia = require('../../config/algolia');
const concat = require('array-concat');

exports.search = (io, socket) => {
    // On search
    socket.on('search', function (searchParameters) {

        console.log('search (' + searchParameters.q + ')');

        // Empty
        if (!searchParameters.q) {
            return;
        }

        // Create search query
        let query = {};
        query.filtersFlat = 'isValidated=1';
        query.filtersFacet = [];

        // Merge search filters
        if (searchParameters.q) {
            query.name = searchParameters.q;
        }

        // tags
        if (searchParameters.tags.length) {
            query.filtersFacet = concat(query.filtersFacet, searchParameters.tags);

            // join filters
            query.filtersFacet = query.filtersFacet.map(i => i.facet + ':' + i.label); // preprend with 'facet:label'
            query.filtersFacet = query.filtersFacet.join(' AND '); // join with separator. example: 'tags:expressjs AND tags:bootstrap'
        }

        // Init Algolia index
        let sitesIndex = (algolia.clientSearch()).initIndex('sites');

        // Algolia search
        sitesIndex
            .search(query.name, {
                filters: query.filtersFlat,
                facetFilters: query.filtersFacet
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