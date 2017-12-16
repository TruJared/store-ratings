// rapid api
// var RapidAPI = new require('rapidapi-connect');
var rapid = new RapidAPI('storeranking', '9ff7edb4-d7e5-43f8-92d2-4fb7f22a46eb');

//holds district numbers and uses them to build drop-down list and call JSON file from storeinfo.js
var districts = ['2806', '2807'];

$(document).ready(function () {

  //build drop-down based on storeInfo
  (function () {
    for (i = 0; i < districts.length; i++) {

      $('#district-selection').append(
        '<option value=d' + districts[i] + '>' + districts[i] + '</option>')
    }
  })();

});


//All API calls should be served directly from the server, I have them in JS for demo purposes

//Yelp API call using rapid api
function getInfoYelp(storeInfo, ratingSource) {

  rapid.call('YelpAPI', 'getSingleBusiness', {
    'accessToken': '0KFFwb0CeOocTb-DTHcHAIyHNVoh4x4I_TZ5mkoUM4RYPyzG2ZfSgCZcBsthpgJBJGTBGeQFPVCbzA5sIt8zG3y3_cU3upPRT13G3okGWRuzG27p8K9jvnqYbjMkWnYx',
    'bussinessId': storeInfo[ratingSource]

  }).on('success', function (data) {
    rating = data.rating
    $('#' + storeInfo.sNumber + ratingSource).text(rating.toFixed(1) + ' / 5');
  });
};

//Google API call
function getInfoGoogle(storeInfo, ratingSource) {
  // Proxy to bypass CORS
  proxy = 'https://cors-anywhere.herokuapp.com/';
  googleApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
  googleKey = '&key=AIzaSyALgMeJoWoeLiygtjWOu1uRou7vJRzQg0I';

  $.get(proxy + googleApi + storeInfo[ratingSource] + googleKey,
    function (data) {
      rating = data.result.rating;
      $('#' + storeInfo.sNumber + ratingSource).text(rating.toFixed(1) + ' / 5');
    }
  );
}

//Facebook API call
function getInfoFacebook(storeInfo, ratingSource) {
  $.ajax({
    url: 'https://graph.facebook.com/v2.11/' + storeInfo[ratingSource] + '?fields=overall_star_rating',
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", "Bearer EAAb6s2uIpEMBAAbSvg1vOWop15RpXsmBH9meE59kCuRh0JxzA1eZCxxWbnCEHqpLZCSNKmPSj7OuDFx1RhBC8pO1y8ZA9GBCcEAEkDZC3S0bZCkflZCFGr5GJ8ol8SMZAQ4Bkb5vYAZCC4LcvBiff8UgZC4ohbkfj0dwZD")
    },
    success: function (data) {
      rating = (data.overall_star_rating);
      $('#' + storeInfo.sNumber + ratingSource).text(rating.toFixed(1) + ' / 5');
    }
  })
}

/* creates table rows based on length of array and fills store information */

// will load information based on 'value' assigned above

function makeTable() {
  for (i = 0; i < d2806.length; i++) {

    $('#ranking_table').append(
      '<tr>' +
      '<td class="store-number">' + d2806[i].sNumber + '</td>' +
      '<td id=' + d2806[i].sNumber + 'yelpId> <p>-</p> </td>' +
      '<td id=' + d2806[i].sNumber + 'googleId><p>-</p> </td>' +
      '<td id=' + d2806[i].sNumber + 'facebookId> <p>-</p> </td>' +
      '</tr>'
    );

    //getInfoYelp(storeInfo[0][i], "yelpId");
    //getInfoGoogle(storeInfo[0][i], "googleId");
    //getInfoFacebook(storeInfo[0][i], "facebookId");
  }
}
makeTable();
