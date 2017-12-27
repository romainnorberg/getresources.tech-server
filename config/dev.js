const morgan = require('morgan');

module.exports = function (app) {
    app.use(morgan('dev')); // log every request to the console
};