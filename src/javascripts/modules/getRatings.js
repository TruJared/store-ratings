const axios = require('axios');

const getRatings = (stores) => {
  console.log(stores);
  const googleIds = stores.map(store => store.googleId);
  const facebookIds = stores.map(store => store.facebookId);
  const yelpIds = stores.map(store => store.yelpId);

  console.log(facebookIds);
  console.log(yelpIds);

  // const cell = document.querySelector(`#${element[0]}`);
  // console.log(element[0]);
  // cell.innerText = element[1];
};

export { getRatings };
