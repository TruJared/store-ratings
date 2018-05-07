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
      body: 'no data',
    });
  }

  // -- function to get data from Google API -- //
  const getGoogleData = (id) => {
    const googleKey = process.env.GOOGLE_KEY;

    axios
      .get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}${googleKey}`)
      .then(res => res.data)
      .then(res => JSON.stringify(res))
      .then(res =>
        callback(null, {
          statusCode,
          headers,
          body: res,
        }))
      .catch(e =>
        callback(null, {
          body: `${e}`,
        }));
  };

  // -- function to get data from Facebook API -- //
  const getFacebookData = (id) => {
    const facebookKey = process.env.FACEBOOK_KEY;

    axios
      .get(`https://graph.facebook.com/v2.11/${id}?fields=overall_star_rating`, {
        headers: {
          Authorization: facebookKey,
        },
      })
      .then(res => res.data)
      .then(res => JSON.stringify(res))
      .then(res =>
        callback(null, {
          statusCode,
          headers,
          body: res,
        }))
      .catch(e =>
        callback(null, {
          body: `${e}`,
        }));
  };

  // -- Parses data and sends to appropriate function
  const data = event.body;
  const { id } = JSON.parse(data);
  const { host } = JSON.parse(data);

  if (host === 'google') {
    getGoogleData(id);
  } else if (host === 'facebook') {
    getFacebookData(id);
  }
};

// const facebookKey = process.env.FACEBOOK_KEY;
// const data = event.body;
// const { id } = JSON.parse(data);
// console.log(facebookKey);
// callback(null, {
//   statusCode,
//   headers,
//   body: id,
// });
// axios
//   .get(`https://graph.facebook.com/v2.11/${id}?fields=overall_star_rating`, {
//     headers: {
//       Authorization: facebookKey,
//     },
//   })
//   .then(res => res.data)

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
