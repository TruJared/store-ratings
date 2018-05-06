require('dotenv').config();

const axios = require('axios');

const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = (event, context, callback) => {
  const googleKey = process.env.GOOGLE_KEY;
  const holder = {};
  const id = event.body;
  console.log(id);
  axios
    .get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}${googleKey}`)
    .then(res => res.data.result.rating.toFixed(2))
    .then(res => (holder[id] = res))
    .then(() => console.log(holder))
    .then(() =>
      callback(null, {
        statusCode,
        body: `ratings: ${JSON.stringify(holder)}`,
      }))
    .catch(e => console.log(e));
};
// make sure it's a valid request ...
// uncomment if getting prefetch errors
// if (event.httpMethod !== 'POST' || !event.body) {
//   callback(null, {
//     statusCode,
//     headers,clr

//     body: '',
//   });
// }

// -- GOOGLE -- //

//   const googleRatings = {};
//   const googleIds = stores.map(element => element.googleId);

//   const googleApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
//   const googleKey = process.env.GOOGLE_KEY;
//   googleIds.forEach((element) => {
//     axios
//       .get(`${googleApi}${element}${googleKey}`)
//       // .then(res => (googleRatings[element] = res.data.result.rating.toFixed(2)))
//       .then(res => console.log(res.data.result.rating.toFixed(2)))
//       .catch(e => console.log(e));
//   });
//   callback(null, {
//     statusCode,
//     headers,
//     body: `ratings: ${JSON.stringify(googleRatings)}`,
//   });
// };

// -- FACEBOOK -- //

//   const facebookRatings = {};
//   const facebookIds = stores.map(element => element.facebookId);
//   const facebookApi = 'https://graph.facebook.com/v2.11/';

//   facebookIds.forEach((element) => {
//     axios
//       .get(`${facebookApi}${element}?fields=overall_star_rating`, {
//         headers: {
//           Authorization: facebookKey,
//         },
//       })
//       .then(res =>
//         (facebookRatings[element] = isNaN(res.data.overall_star_rating)
//           ? 0
//           : res.data.overall_star_rating.toFixed(2)))
//       .catch(e => console.log(e));
//   });

//   const ratingsObject = { facebookRatings };
//   callback(null, ratingsObject);
// };

// -- YELP -- //
// const yelpIds = stores.map(element => element.yelpId);
// const yelpApi = 'https://api.yelp.com/v3/businesses/';

// yelpIds.forEach((element) => {
//   const cell = document.querySelector(`#${element}`);
//   axios
//     .get(`${yelpApi}${element}`, {
//       headers: {
//         Authorization: yelpKey,
//       },
//     })
//     .then(res => console.log(res))
//     // (cell.innerHTML = isNaN(res.data.rating) ? 0 : res.data.rating.toFixed(2)));
//     .catch(e => console.log(e));
