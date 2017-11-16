$(document).ready(function() {

  // array to hold store information -- should be an external file
  var storeInfo = [{
      sNumber: 1243,
      googleId: "rating/0",
      yelpId: "rating/0",
      facebookId: "rating/0"
    },
    {
      sNumber: 1262,
      googleId: "rating/1",
      yelpId: "rating/1",
      facebookId: "rating/1"
    },
    {
      sNumber: 6629,
      googleId: "rating/5",
      yelpId: "rating/5",
      facebookId: "rating/5"
    }

  ];

  // makes api requests and parses data
  // can these three eventually be one block??
  function getInfoYelp(storeInfo, ratingSource) {
    $.get('http://echo.jsontest.com/' + storeInfo[ratingSource],
      function(data) {
        console.log("yelp");
        var rating = data.rating;
        $('#' + storeInfo.sNumber + ratingSource).text(rating);
      }
    );
  }

  function getInfoGoogle(storeInfo, ratingSource) {
    $.get('http://echo.jsontest.com/' + storeInfo[ratingSource],
      function(data) {
        var rating = data.rating;
        $('#' + storeInfo.sNumber + ratingSource).text(rating);
      }
    );
  }

  function getInfoFacebook(storeInfo, ratingSource) {
    $.get('http://echo.jsontest.com/' + storeInfo[ratingSource],
      function(data) {
        var rating = data.rating;
        $('#' + storeInfo.sNumber + ratingSource).text(rating);
      }
    );
  }

  /* creates table rows based on length of array and fills store information */
  function makeTable(getInfoYelp){
    for (i = 0; i < storeInfo.length; i++) {
      $('#ranking_table').append(
        '<tr>' +
        '<td>' + storeInfo[i].sNumber + '</td>' +
        '<td id=' + storeInfo[i].sNumber + 'yelpId> <img src="giphy-downsized.gif"> </td>' +
        '<td id=' + storeInfo[i].sNumber + 'googleId> <img src="giphy-downsized.gif"> </td>' +
        '<td id=' + storeInfo[i].sNumber + 'facebookId> <img src="giphy-downsized.gif"> </td>' +
        '</tr>'
      );
    getInfoYelp(storeInfo[i], "yelpId");
    getInfoGoogle(storeInfo[i], "googleId");
    getInfoFacebook(storeInfo[i], "facebookId");
    }
  }
  makeTable(getInfoYelp);
});
