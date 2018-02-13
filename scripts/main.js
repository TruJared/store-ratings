// helpers
var helpers = (function () {
    var findAverages = function (ratingsObj) {
        var averageRatings = {};
        //use reduce to find total
        for (var key in ratingsObj) {
            var nodeToArray = Array.from(ratingsObj[key]);
            // we dont want to calculate 0's
            var filteredArray = nodeToArray.filter(item => item.innerText > 0);
            filteredArray.reduce(function (accumulator, value) {
                return (total = accumulator += parseFloat(value.innerText));
            }, 0);

            //find average and put into an object
            averageRatings[key] = (total / filteredArray.length).toFixed(2);
        }
        return averageRatings;
    };
    return {
        findAverages: findAverages,
    };
}());

// api requests
// cspell: disable
var api = (function () {
    //api variable
    var proxy, googleApi, googleKey, googleRatings, facebookApi, facebookKey, yelpApi, yelpKey;

    proxy = 'https://protected-ravine-77562.herokuapp.com/'; // used to bypass CORS
    googleApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
    googleKey = '&key=AIzaSyALgMeJoWoeLiygtjWOu1uRou7vJRzQg0I';
    facebookApi = 'https://graph.facebook.com/v2.11/';
    facebookKey = 'Bearer 1964498370470979|7mIH6fntq1SAW47PsrRxx21ds7I';
    yelpApi = 'https://api.yelp.com/v3/businesses/';
    yelpKey = 'F3ij6D_zmlD6kdK_959yHBHH--ANWterrg512Weg1bWUNKL7abbhnVq8uzaLkbF3ZPbOgImcT61iUvAcub0EG9FiprWNL6LYzHvgNJpSjBzPiQStRA4z5JhUZxmCWnYx';

    var getGoogle = function (googleIds) {
        // helpful info >>> https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
        googleIds.forEach(function (store) {
            fetch(`${proxy}${googleApi}${store.id}${googleKey}`)
                .then(blob => blob.json())
                .then(data => {
                    var cell = document.querySelector(`#${store.id}`);
                    var rating = data.result.rating;
                    cell.innerText = (rating).toFixed(2);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    };

    var getFacebook = function (facebookIds) {
        facebookIds.forEach(function (store) {
            fetch(`${facebookApi}${store.id}?fields=overall_star_rating`, {
                headers: {
                    'Authorization': facebookKey,
                }
            })
                .then(blob => blob.json())
                .then(data => {
                    var cell = document.querySelector(`#${store.id}`);
                    var rating = data.overall_star_rating;
                    cell.innerText = (rating.toFixed(2));
                })
                .catch(error => {
                    console.log(`${error}: Most likely this error is due to the business having no data`);
                });
        });
    };
    var getYelp = function (yelpIds) {
        yelpIds.forEach(function (store) {
            var rapid = new RapidAPI('storeranking', '9ff7edb4-d7e5-43f8-92d2-4fb7f22a46eb');

            rapid.call('YelpAPI', 'getSingleBusiness', {
                'accessToken': yelpKey,
                'bussinessId': store.id

            }).on('success', function (data) {
                var cell = document.querySelector(`#${store.id}`);
                var rating = data.rating;
                cell.innerText = (rating.toFixed(2));
            }).on('error', function (error) {
                (`${error}: Most likely this error is due to the business having no data`);
            });
        });
    };

    return {
        getGoogle: getGoogle,
        getFacebook: getFacebook,
        getYelp: getYelp
    };

})();
// cspell: enable

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
        sidebar.classList.contains('hidden') ? main.classList.remove('slider') : main.classList.add('slider');
    };

    // set aria-expanded
    sidebar.setAttribute('aria-expanded',
        sidebar.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );

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
        Object.keys(storeInfo).forEach(function (key) {
            var listItem = document.createElement('li');
            var store = key.substr(1);
            fragment.appendChild(listItem);

            listItem.appendChild(document.createTextNode(`# ${store}`));
            listItem.className = 'store-list-item list-inline-item py-3 pl-5';
            // make id
            listItem.id = key;

            sideList.appendChild(fragment);
        });
        return sideList;
    };

    // make table
    var makeTable = function (stores) {
        var tableHead, tableRow, tableBody;

        tableHead = document.createElement('thead');
        headRow = document.createElement('tr');
        tableBody = document.createElement('tbody');

        fragment.append.table;
        table.appendChild(tableHead);
        table.appendChild(headRow);
        table.appendChild(tableBody);

        // create table header
        headRow.innerHTML = (
            `<th scope ="col">Store</th >
            <th scope="col">Facebook</th>
            <th scope="col">Google</th>
            <th scope="col">Yelp</th>`
        );

        // create table body
        stores.forEach(function (store) {
            storeNum = store.sNumber;
            facebookId = store.facebookId;
            googleId = store.googleId;
            yelpId = store.yelpId;

            tableBody.innerHTML += (
                `<tr>
                <th scope="row" id="${storeNum}" >${storeNum}
                <td class="facebookRating" id="${facebookId}">0</td>
                <td class="googleRating" id="${googleId}">0</td>
                <td class="yelpRating" id="${yelpId}">0</td>
                </th>
                </tr>`
            );
        });

        // create final row for averages in table
        tableBody.innerHTML += (
            `<tr>
            <th scope="row" class="bold" id="averages">Average</th>
            <td class="facebookAvgDisplay"><i class="fas fa-calculator"></i></td>
            <td class="googleAvgDisplay"><i class="fas fa-calculator"></i></td>
            <td class="yelpAvgDisplay"><i class="fas fa-calculator"></i></td>
            </th>
            </tr>`
        );
        return fragment;
    };

    // set averages
    var setAverages = function (averageRatings) {

        // get DOMS
        var facebookAvg = document.querySelectorAll('.facebookAvgDisplay');
        var googleAvg = document.querySelectorAll('.googleAvgDisplay');
        var yelpAvg = document.querySelectorAll('.yelpAvgDisplay');
        var facebookBar = document.querySelector('#facebookBar');
        var googleBar = document.querySelector('#googleBar');
        var yelpBar = document.querySelector('#yelpBar');

        // set values and progress bars
        // facebook
        facebookAvg.forEach((element) => {
            element.innerHTML = averageRatings.facebookIds;
        });
        facebookBar.style.width = (parseInt((averageRatings.facebookIds / 5) * 100) + '%');
        facebookBar.setAttribute('aria-valuenow', (parseInt((averageRatings.facebookIds / 5) * 100) + '%'));

        // google
        googleAvg.forEach((element) => {
            element.innerHTML = averageRatings.googleIds;
        });
        googleBar.style.width = (parseInt((averageRatings.googleIds / 5) * 100) + '%');
        googleBar.setAttribute('aria-valuenow', (parseInt((averageRatings.googleIds / 5) * 100) + '%'));

        // yelp
        yelpAvg.forEach((element) => {
            element.innerHTML = averageRatings.yelpIds;
        });
        yelpBar.style.width = (parseInt((averageRatings.yelpIds / 5) * 100) + '%');
        yelpBar.setAttribute('aria-valuenow', (parseInt((averageRatings.yelpIds / 5) * 100) + '%'));
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

                // function to load data for find averages >>> needs better implementation
                setTimeout(function badSolution() {
                    var ratingsFromDom = {
                        facebookIds: document.querySelectorAll('.facebookRating'),
                        googleIds: document.querySelectorAll('.googleRating'),
                        yelpIds: document.querySelectorAll('.yelpRating'),
                    };
                    var averages = helpers.findAverages(ratingsFromDom);
                    uiController.setAverages(averages);
                }, 8000);


                // get array from storeinfo.js and pass into makeTable
                uiController.table.innerHTML = ' ';
                uiController.makeTable(storeInfo[id]);

                // get data to work with
                var facebookIds = document.querySelectorAll('.facebookRating');
                var googleIds = document.querySelectorAll('.googleRating');
                var yelpIds = document.querySelectorAll('.yelpRating');

                // fill table with useful data and get info for averages
                api.getGoogle(googleIds);
                api.getFacebook(facebookIds);
                api.getYelp(yelpIds);

            });
        });
    };

    var createSidebarList = function () {
        // load information into sidebar
        document.querySelector('#side-bar-list').appendChild(uiController.buildSideList());
        // push new sidebarListItems to uiController -- will be needed in future release
        uiController.sidebarListItem = document.querySelectorAll('.store-list-item');
    };

    return {
        init() {
            createSidebarList();
            launchEventListeners();
        }
    };
}());

controller.init();
