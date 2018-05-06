const axios = require('axios');

const getRatings = (stores) => {
  const googleIds = stores.map(store => store.googleId);
  const facebookIds = stores.map(store => store.facebookId);
  const yelpIds = stores.map(store => store.yelpId);

  const proxy = 'https://jared-proxy.herokuapp.com/';

  // lambdas
  // https://netlify--affectionate-thompson-b59054.netlify.com/.netlify/functions/{filename}
  // https://r28ratings.com/.netlify/functions/{filename}
  const googleUrl =
    'https://netlify--affectionate-thompson-b59054.netlify.com/.netlify/functions/apiCalls';
  // 'http://localhost:9000/apiCalls';

  googleIds
    .forEach(id => axios.post(googleUrl, JSON.stringify({ id })).then(res => console.log(res)))
    .catch(e => console.log(e));
  console.log(facebookIds);
  console.log(yelpIds);

  // const cell = document.querySelector(`#${element[0]}`);
  // console.log(element[0]);
  // cell.innerText = element[1];
};

export { getRatings };
