const axios = require('axios');
const { $ } = require('./bling');

const getRatings = (stores) => {
  const googleIds = stores.map(store => store.googleId);
  const googleRatingsArray = [];
  const facebookIds = stores.map(store => store.facebookId);
  const facebookRatingsArray = [];
  const yelpIds = stores.map(store => store.yelpId);
  const yelpRatingsArray = [];

  const lambdaUrl =
    // 'http://localhost:9000/callApis'; -- testing
    'https://www.r28ratings.com/.netlify/functions/callApis';

  // -- GOOGLE --//
  googleIds.forEach((id) => {
    axios
      .post(
        lambdaUrl,
        JSON.stringify({
          host: 'google',
          id,
        }),
      )
      // catch NaN
      .then(res =>
        (isNaN(res.data.result.rating)
          ? 0
          : ($(`#${id}`).innerText = res.data.result.rating.toFixed(2))))
      .then(res => googleRatingsArray.push(Number(res)))
      // Find Average
      .then(() =>
        ($('.googleAvgDisplay').innerText =
            googleRatingsArray.reduce((acc, value) => acc + value, 0) / googleRatingsArray.length))
      // Make readable
      .then(() => ($('.googleAvgDisplay').innerText = $('.googleAvgDisplay').innerText.substring(0, 4)))
      // Update Progress Bar
      .then(() => ($('#googleBar').style.width = `${$('.googleAvgDisplay').innerText / 5 * 100}%`))
      .catch(e => console.log(e));
  });

  //   // -- FACEBOOK --//
  facebookIds.forEach((id) => {
    axios
      .post(
        lambdaUrl,
        JSON.stringify({
          host: 'facebook',
          id,
        }),
      )
      // catch NaN
      .then(res =>
        (isNaN(res.data.overall_star_rating)
          ? 0
          : ($(`#${id}`).innerText = res.data.overall_star_rating.toFixed(2))))
      .then(res => facebookRatingsArray.push(Number(res)))
      // Find Average
      .then(() =>
        ($('.facebookAvgDisplay').innerText =
            facebookRatingsArray.reduce((acc, value) => acc + value, 0) /
            facebookRatingsArray.length))
      // Make readable
      .then(() =>
        ($('.facebookAvgDisplay').innerText = $('.facebookAvgDisplay').innerText.substring(0, 4)))
      // Update Progress Bar
      .then(() => ($('#facebookBar').style.width = `${$('.facebookAvgDisplay').innerText / 5 * 100}%`))

      .catch(e => console.log(e));
  });

  //   // -- YELP --//
  // -- Get Yelp Requests and throttle  -- //
  const getYelpRatings = (arr, i) => {
    if (i < arr.length) {
      const id = arr[i];
      i += 1;
      axios
        .post(
          lambdaUrl,
          JSON.stringify({
            host: 'yelp',
            id,
          }),
        )
        // catch NaN
        .then(res =>
          (isNaN(res.data.rating) ? 0 : ($(`#${id}`).innerText = res.data.rating.toFixed(2))))
        .then(res => console.log(res))
        .then(res => yelpRatingsArray.push(Number(res)))
        .then(() => console.log(yelpRatingsArray))
        // Find Average
        .then(() =>
          ($('.yelpAvgDisplay').innerText =
              yelpRatingsArray.reduce((acc, value) => acc + value, 0) / yelpRatingsArray.length))
        // Make readable
        .then(() => ($('.yelpAvgDisplay').innerText = $('.yelpAvgDisplay').innerText.substring(0, 4)))
        // Update Progress Bar
        .then(() => ($('#yelpBar').style.width = `${$('.yelpAvgDisplay').innerText / 5 * 100}%`))

        .catch(e => console.log(e.message));
      // throttle next call to meet yelp standards
      setTimeout(getYelpRatings, 250, arr, i);
    }
  };
  // send to throttle requests //
  getYelpRatings(yelpIds, 0);
};

export { getRatings };
