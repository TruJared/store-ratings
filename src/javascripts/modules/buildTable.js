const { $ } = require('./bling');

const buildTable = (stores) => {
  console.log(`buildTable >>> ${JSON.stringify(stores)}`);
  const cells = stores.map(element => element.sNumber);

  const newTable = cells.map(element => `<tr>
    <th scope="row">${element}</th>
    <td style="padding-left: 25px;">5.1</td>
    <td style="padding-left: 25px;">5.1</td>
    <td style="padding-left: 10px;">5.1</td
     </tr>
    `);
  $('tbody').innerHTML = newTable.join('');
};

export { buildTable };
