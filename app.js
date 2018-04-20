const express = require('express');

const server = express();
server.use('/public', express.static(`${__dirname}/public`));

server.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const port = 8000;
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
