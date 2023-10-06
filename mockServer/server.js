const jsonServer = require('json-server');
const jsonServerAuth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router('./mockServer/db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(jsonServerAuth);

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
