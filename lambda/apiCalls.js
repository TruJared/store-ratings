(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1).config();

const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = (event, context, callback) => {
  const stores = [{
    sNumber: 5162,
    googleId: 'ChIJt6qFTtRv2IkRgVspR4_8ksA',
    yelpId: 'advance-auto-parts-watertown',
    facebookId: 'AdvanceAutoPartsStore5162'
  }, {
    sNumber: 5239,
    googleId: 'ChIJyXZsm-xB2YkRnrUGpmQCc7Q',
    yelpId: 'advance-auto-parts-new-hartford',
    facebookId: 'AdvanceAutoPartsStore5239'
  }, {
    sNumber: 5842,
    googleId: 'ChIJWzdXuaFM2YkRkTzClGINzYQ',
    yelpId: 'advance-auto-parts-hamilton-3',
    facebookId: 'AdvanceAutoPartsStore5842'
  }, {
    sNumber: 6318,
    googleId: 'ChIJi9Cgv43yy0wRlPlWg2W_LSY',
    yelpId: 'nodata1',
    facebookId: 'AdvanceAutoPartsStore6318'
  }, {
    sNumber: 6331,
    googleId: 'ChIJseZ7xXmG2IkRxTsaqRzgPXU',
    yelpId: 'advance-auto-parts-carthage-3',
    facebookId: 'AdvanceAutoPartsStore6331'
  }, {
    sNumber: 6332,
    googleId: 'ChIJ97UHOO9A2YkR8oiZPm6238U',
    yelpId: 'advance-auto-parts-yorkville',
    facebookId: 'AdvanceAutoPartsStore6332'
  }, {
    sNumber: 6367,
    googleId: 'ChIJCZ5PMtNG2YkRVQHhvVYPbg0',
    yelpId: 'advance-auto-parts-utica',
    facebookId: 'AdvanceAutoPartsStore6367'
  }, {
    sNumber: 6423,
    googleId: 'ChIJi9Cgv43yy0wRlPlWg2W_LSY',
    yelpId: 'advance-auto-parts-malone',
    facebookId: 'AdvanceAutoPartsStore6423'
  }, {
    sNumber: 6472,
    googleId: 'ChIJIduZN9w_zEwRN_Z67SBYhis',
    yelpId: 'advance-auto-parts-massena',
    facebookId: 'AdvanceAutoPartsStore6472'
  }, {
    sNumber: 6592,
    googleId: 'ChIJN-V96EKqzUwRs91Rx-iNqRU',
    yelpId: 'advance-auto-parts-ogdensburg',
    facebookId: 'AdvanceAutoPartsStore6592'
  }, {
    sNumber: 6633,
    googleId: 'ChIJ-3p-kBMby0wRK8SopzN_ypo',
    yelpId: 'advance-auto-parts-saranac-lake',
    facebookId: 'AdvanceAutoPartsStore6633'
  }, {
    sNumber: 6959,
    googleId: 'ChIJ0821KExnzEwRqqx_hNarA4I',
    yelpId: 'advance-auto-parts-potsdam',
    facebookId: 'AdvanceAutoPartsStore6959'
  }, {
    sNumber: 7156,
    googleId: 'ChIJBQniKteS2IkRb5OqbAnRkPA',
    yelpId: 'advance-auto-parts-lowville',
    facebookId: 'AdvanceAutoPartsStore7156'
  }, {
    sNumber: 7202,
    googleId: 'ChIJp812PjA12IkRTBCdNRaKptc',
    yelpId: 'advance-auto-parts-pulaski-3',
    facebookId: 'AdvanceAutoPartsStore7202'
  }, {
    sNumber: 7259,
    googleId: 'ChIJd4b2nKLX24kRGcfyd9MYigg',
    yelpId: 'advance-auto-parts-hamilton-3',
    facebookId: 'AdvanceAutoPartsStore7259'
  }, {
    sNumber: 8402,
    googleId: 'ChIJExMtPjuF2YkRnn52_YbMens',
    yelpId: 'advance-auto-parts-chittenango',
    facebookId: 'AdvanceAutoPartsStore8402'
  }];
  callback(null, {
    statusCode,
    headers,
    body: 'her-mer-gurd!'
  });
};
// -- GOOGLE -- //
// const googleRatings = {};
// const googleIds = stores.map(element => element.googleId);

// const googleApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';

// googleIds.forEach((element) => {
//   axios
//     .get(`${googleApi}${element}${googleKey}`)
//     .then(res => (googleRatings[element] = res.data.result.rating.toFixed(2)))
//     .catch(e => console.log(e));
// });

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(2)
const path = __webpack_require__(3)

/*
 * Parses a string or buffer into an object
 * @param {(string|Buffer)} src - source to be parsed
 * @returns {Object} keys and values from src
*/
function parse (src) {
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split('\n').forEach(function (line) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]

      // default undefined or missing values to empty string
      let value = keyValueArr[2] || ''

      // expand newlines in quoted values
      const len = value ? value.length : 0
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()

      obj[key] = value
    }
  })

  return obj
}

/*
 * Main entry point into dotenv. Allows configuration before loading .env
 * @param {Object} options - options for parsing .env file
 * @param {string} [options.path=.env] - path to .env file
 * @param {string} [options.encoding=utf8] - encoding of .env file
 * @returns {Object} parsed object or error
*/
function config (options) {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding = 'utf8'

  if (options) {
    if (options.path) {
      dotenvPath = options.path
    }
    if (options.encoding) {
      encoding = options.encoding
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }))

    Object.keys(parsed).forEach(function (key) {
      if (!process.env.hasOwnProperty(key)) {
        process.env[key] = parsed[key]
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.load = config
module.exports.parse = parse


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ])));