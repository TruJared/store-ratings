$( document ).ready(function() {

  // object to hold store information -- should be an external file
  var storeInfo = [

    { storeNumber : 1243, google : null, yelp : null, facebook : null },
    { storeNumber : 1262, google : 1, yelp : 1, facebook : 1 },
    { storeNumber : 6629, google : 5, yelp : 5, facebook : 5  }

  ];


  /* creates table rows based on length of array and fills store information */
  for( i=0; i<storeInfo.length; i++ ) {

    $( '#ranking_table' ).append(
      '<tr class="table_data">' + '</tr>'+
      '<td>' + storeInfo[i].storeNumber + '</td>' +
      '<td>' + storeInfo[i].google + '</td>' +
      '<td>' + storeInfo[i].yelp + '</td>' +
      '<td>' + storeInfo[i].facebook + '</td>'
    );
  }

});
