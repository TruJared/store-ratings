const { $ } = require('./bling');

const buildTable = (stores) => {
  $('tbody').innerHTML = stores
    .map(element => `<tr><th scope="row">${element.sNumber}</th><td id="${
      element.facebookId
    }"style="padding-left: 25px;">5.1</td><td id="${
      element.googleId
    }" style="padding-left: 25px;">5.1</td><td id="${
      element.yelpId
    }" style="padding-left: 15px;">5.1</td></tr>
  `)
    .join('');
};

export { buildTable };
