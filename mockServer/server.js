const jsonServer = require('json-server');
const jsonServerAuth = require('json-server-auth');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('./mockServer/db.json', { foreignKeySuffix: 'Id' });
const middlewares = jsonServer.defaults();

const reloadDB = async (req, res, next) => {
  if (req.method === 'POST' && req.url == '/reloadDb') {
    const db = await JSON.parse(fs.readFileSync(path.join(__dirname, 'initialDb.json'), 'utf8'));
    router.db.setState(db);
    res.sendStatus(201);
  } else {
    next();
  }
};

server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(jsonServerAuth);

server.use(reloadDB);

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
