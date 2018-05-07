require('dotenv').config();

const axios = require('axios');

const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST',
};

exports.handler = (event, context, callback) => {
  // make sure it's a valid request ...
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: '',
    });
  }

  const googleKey = process.env.GOOGLE_KEY;
  // const data = JSON.parse(event.body);

  // testing
  // console.log(`ratings: https://maps.googleapis.com/maps/api/place/details/json?placeid=${data.id}${googleKey}`);

  axios
    .get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${data.id}${googleKey}`)
    .then(res =>
      callback(null, {
        statusCode,
        headers,
        body: ` event is: ${event}`,
        // body: `ratings: ${res.data.result.rating.toFixed(2)}`,
      }))
    .catch(e =>
      callback(null, {
        body: `${e}`,
      }));
};

//   axios
//     .get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}${googleKey}`)
//     .then(res => res.data.result.rating.toFixed(2))
//     .then(res => (holder[id] = res))
//     .then(() => console.log(holder))
//     .then(() =>
//       callback(null, {
//         statusCode,
//         headers,
//         body: `ratings: ${JSON.stringify(holder)}`,
//       }))
//     .catch(e => console.log(e));
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
