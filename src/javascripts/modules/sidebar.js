const { $ } = require('./bling');
const { storeInfo } = require('./storeinfo');

// build list layout
const list = Object.keys(storeInfo);
const htmlList = list.map(element => `
<li class="list-inline-item store py-3 pl-5">
  <i class="fas fa-flag-checkered"></i>
  <a href="#" id=${element}> ${element.substr(1)}</a>
</li>`);

$('#store-list').innerHTML = htmlList.join('');

//   TODO make selected list item active
//   var makeActive = function makeActive(id) {
//     var oldActiveItem = document.querySelector('.list-active');
//     var newActiveItem = document.querySelector('#' + id);
//     if (oldActiveItem) {
//       oldActiveItem.classList.toggle('list-active');
//     }
//     newActiveItem.classList.toggle('list-active');
//     // toggle sidebar if viewport < 768
//     if (window.innerWidth < 768) {
//       toggler();
//     }
//   };
