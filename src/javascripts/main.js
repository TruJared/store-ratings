const axios = require('axios');
require('./modules/sidebar');

// const api = () => {
//   axios('https://4sy6aqfzp5.execute-api.us-east-1.amazonaws.com/dev')
//     .then(res => console.log(res.data))
//     .catch(e => console.log(e));
// };
// api();

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

//     });

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
