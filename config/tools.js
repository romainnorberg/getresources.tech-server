module.exports = {
    getVisitorIp: (req) => {
        return req.headers['x-forwarded-for'] || req.headers['cf-connecting-ip'] || req.connection.remoteAddress;
    },

    slugify: (text) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')        // Replace spaces with -
            .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
            .replace(/\-\-+/g, '-')      // Replace multiple - with single -
            .replace(/^-+/, '')          // Trim - from start of text
            .replace(/-+$/, '');         // Trim - from end of text
    }
};