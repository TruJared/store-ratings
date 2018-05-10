const express = require('express');

const app = express();
const port = process.env.PORT || 7777;

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

app.use('/public', express.static(`${__dirname}/public`));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(
    `Express running → PORT http://localhost:${server.address().port}`
  );
});
