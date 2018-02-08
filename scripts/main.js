// helpers
var helpers = (function () {

    // get averages and return value
    // consider building a function constructor
    var getAverages = function (facebookRatings, googleRatings, yelpRatings) {
        var facebookTotal, googleTotal, yelpTotal;

        facebookTotal = 0;
        googleTotal = 0;
        yelpTotal = 0;

        // calculate total
        facebookRatings.forEach((value) => {
            facebookTotal += (parseFloat(value.innerHTML));
        });
        googleRatings.forEach((value) => {
            googleTotal += (parseFloat(value.innerHTML));
        });
        yelpRatings.forEach((value) => {
            yelpTotal += (parseFloat(value.innerHTML));
        });

        // find average
        facebookTotal = (facebookTotal / facebookRatings.length).toFixed(2);
        googleTotal = (googleTotal / googleRatings.length).toFixed(2);
        yelpTotal = (yelpTotal / yelpRatings.length).toFixed(2);

        return {
            facebookTotal,
            googleTotal,
            yelpTotal
        };
    };

    return {
        getAverages: getAverages,
    };
}());


// ui Controller
var uiController = (function () {

    // uiVariables
    var fragment, chevronDown, chevronUp, toggleButton, sidebar, sidebarListItem, table, main;

    fragment = document.createDocumentFragment();
    chevronDown = document.querySelector('.chevron-down');
    chevronUp = document.querySelector('.chevron-up');
    toggleButton = document.querySelector('#toggle-button');
    sidebar = document.querySelector('#sidebar');
    sidebarListItem = document.querySelectorAll('.store-list-item');
    main = document.querySelector('#main');
    table = document.querySelector('#table');

    // switch chevron on click and reposition content if needed
    var toggler = function () {
        chevronUp.classList.toggle('active');
        chevronDown.classList.toggle('active');
        sidebar.classList.toggle('hidden');
        if (sidebar.classList.contains('hidden')) {
            main.classList.remove('slider');
        } else {
            main.classList.add('slider');
        }
    };

    // make selected list item active
    var makeActive = function (id) {
        var oldActiveItem = document.querySelector('.list-active');
        var newActiveItem = document.querySelector('#' + id);
        if (oldActiveItem) {
            oldActiveItem.classList.toggle('list-active');
        }
        newActiveItem.classList.toggle('list-active');
        // toggle sidebar if viewport < 768
        if (window.innerWidth < 768) {
            toggler();
        }
    };

    // build list of stores for sidebar
    var buildSideList = function () {
        var sideList;

        sideList = document.createElement('ul');
        sideList.className = 'list-unstyled list-inline text-left mb-5';

        // loop over array to determine size of list
        for (var i = 0; i < Object.keys(storeInfo).length; i++) {
            var listItem = document.createElement('li');

            listItem.appendChild(document.createTextNode('# ' + (Object.keys(storeInfo)[i].substr(1))));
            listItem.className = 'store-list-item list-inline-item py-3 pl-5';
            // make id
            listItem.id = Object.keys(storeInfo);
            listItem.id = (listItem.id.split(',')[i]);
            fragment.appendChild(listItem);
        }
        sideList.appendChild(fragment);
        return sideList;
    };

    // make table
    var makeTable = function (stores) {
        var tableHead, tableRow, tableBody;

        tableHead = document.createElement('thead');
        headRow = document.createElement('tr');
        tableBody = document.createElement('tbody');

        // create table header
        headRow.innerHTML = (
            '<th scope ="col">Store</th >' +
            '<th scope="col">Facebook</th>' +
            '<th scope="col">Google</th>' +
            '<th scope="col">Yelp</th>'
        );

        // will append to table
        tableHead.appendChild(headRow);

        // create table body
        for (var i = 0; i < stores.length; i++) {
            var store, facebookId, GoogleId, YelpId;

            store = stores[i].sNumber;
            facebookId = stores[i].facebookId;
            googleId = stores[i].googleId;
            yelpId = stores[i].yelpId;

            tableBody.innerHTML += (
                '<tr>' +
                '<th scope="row" id=' + store + '>' + store +
                '<td class="facebookRating" id=' + facebookId + '>' + (Math.random() * (1.00 - 5.00) + 5.00).toFixed(2) +'</td>' +
                '<td class="googleRating" id=' + googleId + '>' + (Math.random() * (1.00 - 5.00) + 5.00).toFixed(2) +'</td>' +
                '<td class="yelpRating" id=' + yelpId + '>' + (Math.random() * (1.00 - 5.00) + 5.00).toFixed(2) +'</td>' +
                '</th>' +
                '</tr>'
            );
        }

        // create final row for averages in table
        tableBody.innerHTML += (
            '<tr>' +
            '<th scope="row" class="bold" id="averages">Average</th>' +
            '<td class="facebookAvgDisplay"> -- </td>' +
            '<td class="googleAvgDisplay"> -- </td>' +
            '<td class="yelpAvgDisplay"> -- </td>' +
            '</th>' +
            '</tr>'
        );

        fragment.append.table; // not sure if this is being used correctly
        table.appendChild(tableHead);
        table.appendChild(tableBody);

        return fragment;
    };

    // set averages
    var setAverages = function (facebookRatings, googleRatings, yelpRatings) {

        // get DOMS
        var facebookAvg = document.querySelectorAll('.facebookAvgDisplay');
        var googleAvg = document.querySelectorAll('.googleAvgDisplay');
        var yelpAvg = document.querySelectorAll('.yelpAvgDisplay');
        var facebookBar = document.querySelector('#facebookBar');
        var googleBar = document.querySelector('#googleBar');
        var yelpBar = document.querySelector('#yelpBar');

        // pass objects to getAverages
        averages = helpers.getAverages(facebookRatings, googleRatings, yelpRatings);

        // set values and
        facebookAvg.forEach((element) => {
            element.innerHTML = averages.facebookTotal;
        });
        googleAvg.forEach((element) => {
            element.innerHTML = averages.googleTotal;
        });
        yelpAvg.forEach((element) => {
            element.innerHTML = averages.yelpTotal;
        });

        // adjust sliders
        // facebook
        facebookBar.style.width = (parseInt((averages.facebookTotal / 5) * 100) + '%');
        facebookBar.setAttribute('aria-valuenow', (parseInt((averages.facebookTotal / 5) * 100) + '%'));
        // google
        googleBar.style.width = (parseInt((averages.googleTotal / 5) * 100) + '%');
        googleBar.setAttribute('aria-valuenow', (parseInt((averages.googleTotal / 5) * 100) + '%'));
        // yelp
        yelpBar.style.width = (parseInt((averages.yelpTotal / 5) * 100) + '%');
        yelpBar.setAttribute('aria-valuenow', (parseInt((averages.yelpTotal / 5) * 100) + '%'));

    };

    return {
        toggler: toggler,
        toggleButton: toggleButton,
        sidebarListItem: sidebarListItem,
        makeActive: makeActive,
        buildSideList: buildSideList,
        makeTable: makeTable,
        table: table,
        setAverages: setAverages,
    };
}());


// controller
var controller = (function () {

    // launch listeners
    var launchEventListeners = function () {
        // toggle button
        uiController.toggleButton.addEventListener('click', function () {
            uiController.toggler();
        });

        // select sidebar item - make active , create table, launch apis etc...
        uiController.sidebarListItem.forEach((item) => {
            item.addEventListener('click', function (e) {
                var id = e.target.id;
                uiController.makeActive(id);
                // get array from storeinfo.js and pass into makeTable
                uiController.table.innerHTML = ' ';
                uiController.makeTable(storeInfo[id]);

                // get data to obtain averages and call getAverages function
                var facebookRatings = document.querySelectorAll('.facebookRating');
                var googleRatings = document.querySelectorAll('.googleRating');
                var yelpRatings = document.querySelectorAll('.yelpRating');
                uiController.setAverages(facebookRatings, googleRatings, yelpRatings);

            });
        });
    };

    var createData = function () {
        // load information into sidebar
        document.querySelector('#side-bar-list').appendChild(uiController.buildSideList());
        // push new sidebarListItems to uiController -- will be needed in future release
        uiController.sidebarListItem = document.querySelectorAll('.store-list-item');
    };

    return {
        init() {
            createData();
            launchEventListeners();
        }
    };
}());

controller.init();
// window.addEventListener('click', function(e) {
//     console.log(e);
// });













// cspell:disable

// // rapid api - needed for Yelp to work
// // var RapidAPI = new require('rapidapi-connect');
// var rapid = new RapidAPI('storeranking',
//     '9ff7edb4-d7e5-43f8-92d2-4fb7f22a46eb');

// $(document).ready(function () {
//     // build drop-down based on the districts listed in store info

//     /* eslint-disable guard-for-in */
//     (function () {
//         for (property in storeInfo) {
//             $('#district-selection').append(
//                 '<option value=storeInfo.' + property + '>' +
//         property.substr(1, property.length) + '</option>');
//         }
//     })();
//     /* eslint-enable */

//     // click event

//     $('#district-selection').click(function () {
//     // reset table and rebuild table head
//         $('#ranking_table').empty();
//         $('#ranking_table').append('<tr>' +
//       '<th>STORE #</th>' +
//       '<th>YELP</th>' +
//       '<th>GOOGLE</th>' +
//       '<th>FACEBOOK</th>' +
//       '</tr>');


//         // add district number to selector
//         var districtNumber = $(this).val().substr(-4, 4);

//         $('#option-title').empty();
//         if ($.isNumeric(districtNumber)) {
//             $('#option-title').append('District: ' + districtNumber);
//             value = eval($(this).val()); // eval should NOT be used with a database
//             // make table
//             makeTable(value);
//         } else {
//             $('#option-title').append($(this).val());
//         }
//     });
// });

// // All API calls should be served directly from the server if possible

// // Yelp API call using rapid api
// function getInfoYelp(storeInfo, ratingSource) {
//     rapid.call('YelpAPI', 'getSingleBusiness', {
//         'accessToken': '0KFFwb0CeOocTb-DTHcHAIyHNVoh4x4I_TZ5mkoUM4RYPyzG2ZfSgCZcBsthpgJBJGTBGeQFPVCbzA5sIt8zG3y3_cU3upPRT13G3okGWRuzG27p8K9jvnqYbjMkWnYx',
//         'bussinessId': storeInfo[ratingSource], // bussiness typo required due to error on rapid api's end

//     }).on('success', function (data) {
//         rating = data.rating;
//         $('#' + storeInfo.sNumber + ratingSource).text(rating.toFixed(1) + ' / 5');
//     });
// }

// // Google API call
// function getInfoGoogle(storeInfo, ratingSource) {
//     // Proxy to bypass CORS - may not be needed when live
//     proxy = 'https://cors-anywhere.herokuapp.com/';
//     googleApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
//     googleKey = '&key=AIzaSyALgMeJoWoeLiygtjWOu1uRou7vJRzQg0I';

//     $.get(proxy + googleApi + storeInfo[ratingSource] + googleKey,
//         function (data) {
//             rating = data.result.rating;
//             $('#' + storeInfo.sNumber + ratingSource).text(rating.toFixed(1) + ' / 5');
//         }
//     );
// }

// // Facebook API call
// function getInfoFacebook(storeInfo, ratingSource) {
//     $.ajax({
//         url: 'https://graph.facebook.com/v2.11/' + storeInfo[ratingSource] + '?fields=overall_star_rating',
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader('Authorization', 'Bearer EAAb6s2uIpEMBAAbSvg1vOWop15RpXsmBH9meE59kCuRh0JxzA1eZCxxWbnCEHqpLZCSNKmPSj7OuDFx1RhBC8pO1y8ZA9GBCcEAEkDZC3S0bZCkflZCFGr5GJ8ol8SMZAQ4Bkb5vYAZCC4LcvBiff8UgZC4ohbkfj0dwZD');
//         },
//         success: function (data) {
//             rating = (data.overall_star_rating);
//             $('#' + storeInfo.sNumber + ratingSource).text(rating.toFixed(1) + ' / 5');
//         },
//     });
// }

// // creates table rows based on length of array and fills store information
// // will load information based on 'value' assigned above

// function makeTable(district) {
//     for (i = 0; i < district.length; i++) {
//         $('#ranking_table').append(
//             '<tr>' +
//       '<td class="store-number">' + district[i].sNumber + '</td>' +
//       '<td id=' + district[i].sNumber + 'yelpId> <p>-</p> </td>' +
//       '<td id=' + district[i].sNumber + 'googleId><p>-</p> </td>' +
//       '<td id=' + district[i].sNumber + 'facebookId> <p>-</p> </td>' +
//       '</tr>'
//         );

//         getInfoYelp(district[i], 'yelpId');
//         getInfoGoogle(district[i], 'googleId');
//         getInfoFacebook(district[i], 'facebookId');
//     }
// }
