
"use strict";
// require("babel-polyfill");

var path = require("path")

var _http = require("http");

var _express = _interopRequireDefault(require("express"));

var _schema = _interopRequireDefault(require("./graphql/schema.js"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

require('dotenv').config()


var _CORS = require("./CORS.js");



require('./mongoDB/config');
var createFolderIfNonExistent = require("./utils").createFolderIfNonExistent

var PORT = process.env.PORT || 4000; // Connection.connectToMongo()

var app = (0, _express.default)();


app.get('/', (req, res) => {
    res.writeHead(200, {
        Connection: 'close'
    });
    res.end("RESPONSE.MESSAGES.UP_RUNNING");
});

// Error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const {
        status
    } = err;
    res.status(status).json(err);
};

app.use(errorHandler);



app.use((0, _CORS.corsWrapper)());

_schema.default.applyMiddleware({
    app: app
});

var httpServer = (0, _http.createServer)(app);

_schema.default.installSubscriptionHandlers(httpServer);

app.use('/static/images', _express.default.static(path.join(__dirname,'../images')));
httpServer.listen({
    port: 3667
}, function () {
    console.log("server ready at http://localhost:".concat(PORT).concat(_schema.default.graphqlPath));
    console.log("Subscriptions ready at ws://localhost:".concat(PORT).concat(_schema.default.subscriptionsPath));
    createFolderIfNonExistent(path.join(__dirname,'../fichiers'))
    createFolderIfNonExistent(path.join(__dirname,'../fichiers/aller'))
    createFolderIfNonExistent(path.join(__dirname,'../fichiers/retour'))
    createFolderIfNonExistent(path.join(__dirname,'../fichiers/ressource'))


});