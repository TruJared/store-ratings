require('babel-polyfill');
const { $, $$ } = require('./modules/bling');
const { getRatings } = require('./modules/getRatings');
const { buildTable } = require('./modules/buildTable');
const { toggler } = require('./modules/toggleButton');

const list = Object.keys(storeInfo);
const htmlList = list.map(element => `
<li id=${element} class="list-inline-item store py-3 pl-5">
  <i class="fas fa-flag-checkered"></i>
  <a href="#" > ${element.substr(1)}</a>
</li>`);
$('#store-list').innerHTML = htmlList.join('');

// add listener to each sidebar item
const listItems = $$('.store');
const listArray = [...listItems];

listArray.forEach((element) => {
  element.addEventListener('click', () => {
    // toggle active
    listItems.forEach(element => element.classList.remove('list-active'));
    element.classList.add('list-active');
    // toggle sidebar on mobile
    if (window.innerWidth < 768) {
      toggler();
    }
    // get storeInfo and send to api function
    buildTable(storeInfo[element.id]);
    getRatings(storeInfo[element.id]);
  });
});

$('button.close').addEventListener('click', () => ($('#featuresModal').style.display = 'none'));
