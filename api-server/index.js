const restify = require('restify');
const server = restify.createServer();
const corsMiddleware = require('restify-cors-middleware2');
var cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders:['X-App-Version'],
    exposeHeaders:[]
});  
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true })); 
server.use(restify.plugins.queryParser()); 

const root = require('./routes/root');
const login = require('./routes/login');
const room = require('./routes/room');
const manager = require('./routes/manager');
const customer = require('./routes/customer')
const employee = require('./routes/employee')
const booking = require('./routes/booking')
const service = require('./routes/service')


root.applyRoutes(server);
login.applyRoutes(server);
room.applyRoutes(server);
manager.applyRoutes(server);
customer.applyRoutes(server);
employee.applyRoutes(server);
booking.applyRoutes(server);
service.applyRoutes(server);

const PORT = 8080;
server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
});