"use strict";

module.exports = (app) => {

    app.get('/server', (req, res) => {
        res.render("layout", {});

        res.end();
    });
};
