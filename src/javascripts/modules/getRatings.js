const { $, $$ } = require('./bling');

exports.getRatings = () => {
  $$('td').forEach(e => (e.innerText = 4.6));
};
// const googleIds = stores.map(store => store.googleId);
// const facebookIds = stores.map(store => store.facebookId);
// const yelpIds = stores.map(store => store.yelpId);
// // -- GOOGLE --//
// googleIds.forEach((id) => {
//   $(`#${id}`).innerText = 5;
//   // .toFixed(2))))
//   $('#googleBar').style.width = `${($('.googleAvgDisplay').innerText / 5) * 100}%`;
// });

// // -- FACEBOOK --//
// facebookIds.forEach((id) => {
//   $(`#${id}`).innerText = 5;
//   // .toFixed(2))))
//   $('#facebookBar').style.width = `${($('.facebookDisplay').innerText / 5) * 100}%`;
// });

//   // -- YELP --//
// // -- Get Yelp Requests and throttle  -- //

// yelpIds.forEach((id) => {
//   $(`#${id}`).innerText = 5;
//   // .toFixed(2))))
//   $('#yelpBar').style.width = `${($('.yelpAvgDisplay').innerText / 5) * 100}%`;
// });
