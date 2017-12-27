"use strict";

const defaultRoutes = require('./default');

module.exports = function (app) {
    app.use(function (req, res, next) {

        // path
        res.locals.path = req.path;

        // Site
        defaultRoutes(app);

        //
        next();
    });
};
