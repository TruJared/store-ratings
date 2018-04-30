const connect = require('connect');
const serveStatic = require('serve-static');
require('dotenv').config();

console.log(process.env.SECRET);
connect()
  .use(serveStatic(__dirname))
  .listen(7777, () => {
    console.log('Server running on http://localhost:7777/dist');
  });
