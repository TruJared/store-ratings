// Proxy to bypass CORS
var proxy = 'https://cors-anywhere.herokuapp.com/';

//Google
var googleApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
var googleKey ='&key=AIzaSyALgMeJoWoeLiygtjWOu1uRou7vJRzQg0I';

//Yelp
var yelpApi ='https://api.yelp.com/v3/businesses/'

//Facebook

$(document).ready(function() {

  //loads data for the store information from storeinfo.js ... this is used to keep things 'clean' as eventually this app will contain over 100 stores and an option to select each district .. eventually this will work best as an API request to a server to get all store information.


  //Yelp API call
  function getInfoYelp(storeInfo, ratingSource) {
    $.get('' + storeInfo[ratingSource],
      function(data) {
        console.log("yelp");
        var rating = data.rating;
        $('#' + storeInfo.sNumber + ratingSource).text(rating);
      }
    );
  }

  //Google API call
  function getInfoGoogle(storeInfo, ratingSource) {
    $.get(proxy + googleApi + storeInfo[ratingSource] + googleKey,
      function(data) {
        rating = data.result.rating;
        console.log(rating)
        $('#' + storeInfo.sNumber + ratingSource).text(rating.toFixed(1)+ ' / 5');
      }
    );
  }

  //Facebook API call
  function getInfoFacebook(storeInfo, ratingSource) {
    $.get('' + storeInfo[ratingSource],
      function(data) {
        var rating = data.rating;
        $('#' + storeInfo.sNumber + ratingSource).text(rating);
      }
    );
  }

  /* creates table rows based on length of array and fills store information */
  function makeTable(){
    for (i = 0; i < storeInfo.length; i++) {
      $('#ranking_table').append(
        '<tr>' +
        '<td class="store-number">' + storeInfo[i].sNumber + '</td>' +
        '<td id=' + storeInfo[i].sNumber + 'yelpId> <img src="giphy-downsized.gif"> </td>' +
        '<td id=' + storeInfo[i].sNumber + 'googleId><img src="giphy-downsized.gif"> </td>' +
        '<td id=' + storeInfo[i].sNumber + 'facebookId> <img src="giphy-downsized.gif"> </td>' +
        '</tr>'
      );
    //getInfoYelp(storeInfo[i], "yelpId");
    // getInfoGoogle(storeInfo[i], "googleId");
    //getInfoFacebook(storeInfo[i], "facebookId");
    }
  }
  makeTable();
});
