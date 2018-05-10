const axios = require('axios');
const { $ } = require('./bling');

const getRatings = (stores) => {
  const googleIds = stores.map(store => store.googleId);
  const facebookIds = stores.map(store => store.facebookId);
  const yelpIds = stores.map(store => store.yelpId);

  const lambdaUrl =
    'https://netlify--affectionate-thompson-b59054.netlify.com/.netlify/functions/callApis';
  // 'http://localhost:9000/callApis';
  // `https://r28ratings.com/.netlify/functions/callApis`

  // -- GOOGLE --//
  googleIds.forEach((id) => {
    $(`#${id}`).innerText = '0.00';

    axios
      .post(
        lambdaUrl,
        JSON.stringify({
          host: 'google',
          id,
        }),
      )
      .then(res => ($(`#${id}`).innerText = res.data.result.rating.toFixed(2)))
      .catch(e => console.log(e));
  });

  // -- FACEBOOK --//
  facebookIds.forEach((id) => {
    $(`#${id}`).innerText = '0.00';

    axios
      .post(
        lambdaUrl,
        JSON.stringify({
          host: 'facebook',
          id,
        }),
      )
      // TODO catch errors for undefined (i.e. does not exist)
      .then(res => ($(`#${id}`).innerText = res.data.overall_star_rating.toFixed(2)))
      .catch(e => console.log(e));
  });

  // -- YELP --//
  // -- Get Yelp Requests and throttle  -- //
  const getYelpRatings = (arr, i) => {
    if (i < arr.length) {
      const id = arr[i];
      $(`#${id}`).innerText = '0.00';
      i++;
      axios
        .post(
          lambdaUrl,
          JSON.stringify({
            host: 'yelp',
            id,
          }),
        )
        .then(res => ($(`#${id}`).innerText = res.data.rating.toFixed(2)))
        .catch(e => console.log(e.message));
      // throttle next call to meet yelp standards
      setTimeout(getYelpRatings, 250, arr, i);
    }
  };
  // send to throttle requests //
  getYelpRatings(yelpIds, 0);
};

export { getRatings };
// axios
//   .post(
//     lambdaUrl,
//     JSON.stringify({
//       host: 'yelp',
//       id,
//     }),
// )
//   // TODO catch errors for undefined (i.e. does not exist)
//   .then(res => ($(`#${id}`).innerText = res.data.rating.toFixed(2)))
//   .catch(e => console.log(e)),
