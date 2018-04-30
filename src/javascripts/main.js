const { $, $$ } = require('./modules/bling');
const lambda = require('./lambda/hello');
const axios = require('axios');

const listItems = $$('li');

const api = () => {
  axios('http://localhost:9000/hello')
    .then(res => console.log(res.data))
    .catch(e => console.log(e));
};
api();
console.log(process.env.SECRET);

// // Polyfills
// // NodeList forEach compatibility
// if (window.NodeList && !NodeList.prototype.forEach) {
//   NodeList.prototype.forEach = function(callback, thisArg) {
//     thisArg = thisArg || window;
//     for (var i = 0; i < this.length; i++) {
//       callback.call(thisArg, this[i], i, this);
//     }
//   };
// }
// //Array.from() compatibility
// if (!Array.from) {
//   Array.from = (function() {
//     var toStr = Object.prototype.toString;
//     var isCallable = function(fn) {
//       return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
//     };
//     var toInteger = function(value) {
//       var number = Number(value);
//       if (isNaN(number)) {
//         return 0;
//       }
//       if (number === 0 || !isFinite(number)) {
//         return number;
//       }
//       return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
//     };
//     var maxSafeInteger = Math.pow(2, 53) - 1;
//     var toLength = function(value) {
//       var len = toInteger(value);
//       return Math.min(Math.max(len, 0), maxSafeInteger);
//     };

//     // The length property of the from method is 1.
//     return function from(arrayLike /*, mapFn, thisArg */) {
//       // 1. Let C be the this value.
//       var C = this;

//       // 2. Let items be ToObject(arrayLike).
//       var items = Object(arrayLike);

//       // 3. ReturnIfAbrupt(items).
//       if (arrayLike == null) {
//         throw new TypeError(
//           'Array.from requires an array-like object - not null or undefined'
//         );
//       }

//       // 4. If mapfn is undefined, then let mapping be false.
//       var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
//       var T;
//       if (typeof mapFn !== 'undefined') {
//         // 5. else
//         // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
//         if (!isCallable(mapFn)) {
//           throw new TypeError(
//             'Array.from: when provided, the second argument must be a function'
//           );
//         }

//         // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
//         if (arguments.length > 2) {
//           T = arguments[2];
//         }
//       }

//       // 10. Let lenValue be Get(items, "length").
//       // 11. Let len be ToLength(lenValue).
//       var len = toLength(items.length);

//       // 13. If IsConstructor(C) is true, then
//       // 13. a. Let A be the result of calling the [[Construct]] internal method
//       // of C with an argument list containing the single item len.
//       // 14. a. Else, Let A be ArrayCreate(len).
//       var A = isCallable(C) ? Object(new C(len)) : new Array(len);

//       // 16. Let k be 0.
//       var k = 0;
//       // 17. Repeat, while k < len… (also steps a - h)
//       var kValue;
//       while (k < len) {
//         kValue = items[k];
//         if (mapFn) {
//           A[k] =
//             typeof T === 'undefined'
//               ? mapFn(kValue, k)
//               : mapFn.call(T, kValue, k);
//         } else {
//           A[k] = kValue;
//         }
//         k += 1;
//       }
//       // 18. Let putStatus be Put(A, "length", len, true).
//       A.length = len;
//       // 20. Return A.
//       return A;
//     };
//   })();
// }

// // helpers
// var helpers = (function() {
//   var total = 0;
//   var findAverages = function findAverages(ratingsObj) {
//     var averageRatings = {};
//     //use reduce to find total
//     for (var key in ratingsObj) {
//       var nodeToArray = Array.from(ratingsObj[key]);
//       // we dont want to calculate 0's
//       var filteredArray = nodeToArray.filter(function(item) {
//         return item.innerText > 0;
//       });
//       filteredArray.reduce(function(accumulator, value) {
//         return (total = accumulator += parseFloat(value.innerText));
//       }, 0);

//       //find average and put into an object
//       averageRatings[key] = (total / filteredArray.length).toFixed(2);
//     }
//     return averageRatings;
//   };
//   return {
//     findAverages: findAverages
//   };
// })();

// // api requests
// // cspell: disable
// // var api = (function() {
// //   //api variable
// //   var proxy = 'https://protected-ravine-77562.herokuapp.com/'; // used to bypass CORS
// //   const proxy = 'https://cors-anywhere.herokuapp.com/'; // used to bypass CORS

// //   var getGoogle = function getGoogle(googleIds) {
// //     // helpful info >>> https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
// //     googleIds.forEach(function(store) {
// //       fetch('' + proxy + googleApi + store.id + googleKey)
// //         .then(function(blob) {
// //           return blob.json();
// //         })
// //         .then(function(data) {
// //           var cell = document.querySelector('#' + store.id);
// //           var rating = data.result.rating;
// //           cell.innerText = rating.toFixed(2);
// //         })
// //         .catch(function(error) {
// //           console.log(error);
// //         });
// //     });
// //   };

// //   var getFacebook = function getFacebook(facebookIds) {
// //     facebookIds.forEach(function(store) {
// //       fetch('' + facebookApi + store.id + '?fields=overall_star_rating', {
// //         headers: {
// //           Authorization: facebookKey
// //         }
// //       })
// //         .then(function(blob) {
// //           return blob.json();
// //         })
// //         .then(function(data) {
// //           var cell = document.querySelector('#' + store.id);
// //           var rating = data.overall_star_rating;
// //           cell.innerText = rating.toFixed(2);
// //         })
// //         .catch(function(error) {
// //           console.log(
// //             error +
// //               ': Most likely this error is due to the business having no data'
// //           );
// //         });
// //     });
// //   };
// //   var getYelp = function getYelp(yelpIds) {
// //     yelpIds.forEach(function(store) {
// //       var rapid = new RapidAPI(
// //         'storeranking',
// //         '9ff7edb4-d7e5-43f8-92d2-4fb7f22a46eb'
// //       );

// //       rapid
// //         .call('YelpAPI', 'getSingleBusiness', {
// //           accessToken: yelpKey,
// //           bussinessId: store.id
// //         })
// //         .on('success', function(data) {
// //           var cell = document.querySelector('#' + store.id);
// //           var rating = data.rating;
// //           cell.innerText = rating.toFixed(2);
// //         })
// //         .on('error', function(error) {
// //           error +
// //             ': Most likely this error is due to the business having no data';
// //         });
// //     });
// //   };

// //   return {
// //     getGoogle: getGoogle,
// //     getFacebook: getFacebook,
// //     getYelp: getYelp
// //   };
// // })();
// // // cspell: enable

// // ui Controller
// var uiController = (function() {
//   // uiVariables

//   var chevronDown = document.querySelector('.chevron-down');
//   var chevronUp = document.querySelector('.chevron-up');
//   var toggleButton = document.querySelector('#toggle-button');
//   var sidebar = document.querySelector('#sidebar');
//   var sidebarListItem = document.querySelectorAll('.store-list-item');
//   var main = document.querySelector('#main');
//   var table = document.querySelector('#table');
//   var facebookAvg = document.querySelector('.facebookAvgDisplay');
//   var facebookBar = document.querySelector('#facebookBar');
//   var googleAvg = document.querySelector('.googleAvgDisplay');
//   var googleBar = document.querySelector('#googleBar');
//   var yelpAvg = document.querySelector('.yelpAvgDisplay');
//   var yelpBar = document.querySelector('#yelpBar');

//   // switch chevron on click and reposition content if needed
//   var toggler = function toggler() {
//     chevronUp.classList.toggle('active');
//     chevronDown.classList.toggle('active');
//     sidebar.classList.toggle('hidden');
//     sidebar.classList.contains('hidden')
//       ? main.classList.remove('slider')
//       : main.classList.add('slider');
//   };

//   // set aria-expanded
//   sidebar.setAttribute(
//     'aria-expanded',
//     sidebar.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
//   );

//   // make selected list item active
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

//   // build list of stores for sidebar
//   var buildSideList = function buildSideList() {
//     var sideList;

//     sideList = document.createElement('ul');
//     sideList.className = 'list-unstyled list-inline text-left mb-5';

//     // loop over array to determine size of list
//     Object.keys(storeInfo).forEach(function(key) {
//       var listItem = document.createElement('li');
//       var store = key.substr(1);
//       listItem.appendChild(document.createTextNode('# ' + store));
//       listItem.className = 'store-list-item list-inline-item py-3 pl-5';
//       // make id
//       listItem.id = key;

//       sideList.appendChild(listItem);
//     });
//     return sideList;
//   };

//   // make table
//   var makeTable = function makeTable(stores) {
//     var tableHead = document.createElement('thead');
//     var headRow = document.createElement('tr');
//     var tableBody = document.createElement('tbody');

//     table.appendChild(tableHead);
//     table.appendChild(headRow);
//     table.appendChild(tableBody);

//     // create table header
//     headRow.innerHTML =
//       '<th scope ="col">Store</th >\n            <th scope="col">Facebook</th>\n            <th scope="col">Google</th>\n            <th scope="col">Yelp</th>';

//     // create table body
//     stores.forEach(function(store) {
//       var storeNum = store.sNumber;
//       var facebookId = store.facebookId;
//       var googleId = store.googleId;
//       var yelpId = store.yelpId;

//       tableBody.innerHTML +=
//         '<tr>\n                <th scope="row" id="' +
//         storeNum +
//         '" >' +
//         storeNum +
//         '\n                <td class="facebookRating" id="' +
//         facebookId +
//         '">0</td>\n                <td class="googleRating" id="' +
//         googleId +
//         '">0</td>\n                <td class="yelpRating" id="' +
//         yelpId +
//         '">0</td>\n                </th>\n                </tr>';
//     });

//     // reset averages and progress bars
//     // set values and progress bars
//     // facebook
//     facebookAvg.innerHTML = "Doin' Some Math";
//     facebookBar.style.width = 0;
//     facebookBar.setAttribute('aria-valuenow', 0);
//     // google
//     googleAvg.innerHTML = "Doin' Some Math";
//     googleBar.style.width = 0;
//     googleBar.setAttribute('aria-valuenow', 0);
//     // yelp
//     yelpAvg.innerHTML = "Doin' Some Math";
//     yelpBar.style.width = 0;
//     yelpBar.setAttribute('aria-valuenow', 0);

//     return table;
//   };

//   // set averages
//   var setAverages = function setAverages(averageRatings) {
//     // set values and progress bars
//     // facebook
//     facebookAvg.innerHTML = averageRatings.facebookIds;
//     facebookBar.style.width =
//       parseInt(averageRatings.facebookIds / 5 * 100) + '%';
//     facebookBar.setAttribute(
//       'aria-valuenow',
//       parseInt(averageRatings.facebookIds / 5 * 100) + '%'
//     );

//     // google
//     googleAvg.innerHTML = averageRatings.googleIds;
//     googleBar.style.width = parseInt(averageRatings.googleIds / 5 * 100) + '%';
//     googleBar.setAttribute(
//       'aria-valuenow',
//       parseInt(averageRatings.googleIds / 5 * 100) + '%'
//     );

//     // yelp
//     yelpAvg.innerHTML = averageRatings.yelpIds;
//     yelpBar.style.width = parseInt(averageRatings.yelpIds / 5 * 100) + '%';
//     yelpBar.setAttribute(
//       'aria-valuenow',
//       parseInt(averageRatings.yelpIds / 5 * 100) + '%'
//     );
//   };

//   return {
//     toggler: toggler,
//     toggleButton: toggleButton,
//     sidebarListItem: sidebarListItem,
//     makeActive: makeActive,
//     buildSideList: buildSideList,
//     makeTable: makeTable,
//     table: table,
//     setAverages: setAverages
//   };
// })();

// // controller
// var controller = (function() {
//   // launch listeners
//   var launchEventListeners = function launchEventListeners() {
//     // toggle button
//     uiController.toggleButton.addEventListener('click', function() {
//       uiController.toggler();
//     });

//     // select sidebar item - make active , create table, launch apis etc...
//     uiController.sidebarListItem.forEach(function(item) {
//       item.addEventListener('click', function(e) {
//         var id = e.target.id;
//         uiController.makeActive(id);

//         // function to load data for find averages >>> needs better implementation
//         setTimeout(function badSolution() {
//           var ratingsFromDom = {
//             facebookIds: document.querySelectorAll('.facebookRating'),
//             googleIds: document.querySelectorAll('.googleRating'),
//             yelpIds: document.querySelectorAll('.yelpRating')
//           };
//           var averages = helpers.findAverages(ratingsFromDom);
//           uiController.setAverages(averages);
//         }, 8000);

//         // get array from storeinfo.js and pass into makeTable
//         uiController.table.innerHTML = ' ';
//         uiController.makeTable(storeInfo[id]);

//         // get data to work with
//         var facebookIds = document.querySelectorAll('.facebookRating');
//         var googleIds = document.querySelectorAll('.googleRating');
//         var yelpIds = document.querySelectorAll('.yelpRating');

//         // fill table with useful data and get info for averages
//         api.getGoogle(googleIds);
//         api.getFacebook(facebookIds);
//         api.getYelp(yelpIds);
//       });
//     });
//   };

//   var createSidebarList = function createSidebarList() {
//     // load information into sidebar
//     document
//       .querySelector('#side-bar-list')
//       .appendChild(uiController.buildSideList());
//     // push new sidebarListItems to uiController -- will be needed in future release
//     uiController.sidebarListItem = document.querySelectorAll(
//       '.store-list-item'
//     );
//   };

//   return {
//     init: function init() {
//       createSidebarList();
//       launchEventListeners();
//     }
//   };
// })();

// // bootstrap modal
// $('#featuresModal').modal('show');
// controller.init();
