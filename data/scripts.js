// rapid api
var rapid = new RapidAPI("default-application_5a244584e4b0d45349f78043", "92d00d70-7f45-4d93-bd75-571f9db0ab5d");

// Proxy to bypass CORS
var proxy = 'https://cors-anywhere.herokuapp.com/';

//Google
var googleApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
var googleKey = '&key=AIzaSyALgMeJoWoeLiygtjWOu1uRou7vJRzQg0I';

//Facebook

$(document).ready(function () {

  //loads data for the store information from storeinfo.js ... this is used to keep things 'clean' as eventually this app will contain over 100 stores and an option to select each district .. eventually this will work best as an API request to a server to get all store information.


  //Yelp API call using rapid -- API should be served server side

  function getInfoYelp(storeInfo, ratingSource) {

    console.log(storeInfo[ratingSource])
    rapid.call('YelpAPI', 'getSingleBusiness', {
      'accessToken': '0KFFwb0CeOocTb-DTHcHAIyHNVoh4x4I_TZ5mkoUM4RYPyzG2ZfSgCZcBsthpgJBJGTBGeQFPVCbzA5sIt8zG3y3_cU3upPRT13G3okGWRuzG27p8K9jvnqYbjMkWnYx',
      'bussinessId': storeInfo[ratingSource]

    }).on('success', function (payload) {
      rating = payload.rating
      $('#' + storeInfo.sNumber + ratingSource).text(rating.toFixed(1) + ' / 5');
    // }).on('error', function (payload) {
    //   /*YOUR CODE GOES HERE*/
    });
  };

  //Google API call
  function getInfoGoogle(storeInfo, ratingSource) {

    $.get(proxy + googleApi + storeInfo[ratingSource] + googleKey,
      function (data) {
        rating = data.result.rating;
        $('#' + storeInfo.sNumber + ratingSource).text(rating.toFixed(1) + ' / 5');
      }
    );
  }

  //Facebook API call
  function getInfoFacebook(storeInfo, ratingSource) {
    $.get('' + storeInfo[ratingSource],
      function (data) {
        var rating = data.rating;
        $('#' + storeInfo.sNumber + ratingSource).text(rating);
      }
    );
  }

  /* creates table rows based on length of array and fills store information */
  function makeTable() {
    for (i = 0; i < storeInfo.length; i++) {
      $('#ranking_table').append(
        '<tr>' +
        '<td class="store-number">' + storeInfo[i].sNumber + '</td>' +
        '<td id=' + storeInfo[i].sNumber + 'yelpId> <p>-</p> </td>' +
        '<td id=' + storeInfo[i].sNumber + 'googleId><p>-</p> </td>' +
        '<td id=' + storeInfo[i].sNumber + 'facebookId> <p>-</p> </td>' +
        '</tr>'
      );

      getInfoYelp(storeInfo[i], "yelpId");
      getInfoGoogle(storeInfo[i], "googleId");
      //getInfoFacebook(storeInfo[i], "facebookId");
    }
  }
  makeTable();
});
