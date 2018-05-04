const axios = require('axios');

const proxy = 'https://jared-proxy.herokuapp.com/'; // needed to test locally

const lambda = (stores) => {
  // -- GOOGLE -- //


const getRatings = (stores) => {
  // returns object holding an array of arrays
  // will need to iterate over array and get data like so...
  // id = ratings[0][0] value = ratings[0][1]
  // dynamic keys in object were causing problems
  const ratings = lambda(stores);
  console.log(ratings);

  // const cell = document.querySelector(`#${element[0]}`);
  // console.log(element[0]);
  // cell.innerText = element[1];
};

// const cell = document.querySelector(`#${element}`);
// cell.innerHTML = res.data.result.rating.toFixed(2);

// const getRatings = (stores) => {


export { getRatings };
