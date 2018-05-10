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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(15).config();

const axios = __webpack_require__(18);

const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST'
};

exports.handler = (event, context, callback) => {
  // make sure it's a valid request ...
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: 'no data'
    });
  }

  // -- function to get data from Google API -- //
  const getGoogleData = id => {
    const googleKey = process.env.GOOGLE_KEY;

    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}${googleKey}`).then(res => res.data).then(res => JSON.stringify(res)).then(res => callback(null, {
      statusCode,
      headers,
      body: res
    })).catch(e => callback(null, {
      body: `${e.message}`
    }));
  };

  // -- function to get data from Facebook API -- //
  const getFacebookData = id => {
    const facebookKey = process.env.FACEBOOK_KEY;

    axios.get(`https://graph.facebook.com/v2.11/${id}?fields=overall_star_rating`, {
      headers: {
        Authorization: facebookKey
      }
    }).then(res => res.data).then(res => JSON.stringify(res)).then(res => callback(null, {
      statusCode,
      headers,
      body: res
    })).catch(e => callback(null, {
      body: `${e.message}`
    }));
  };

  // -- function to get data from Yelp API -- //
  const getYelpData = id => {
    const yelpKey = process.env.YELP_KEY;
    console.log(id);

    axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
      headers: {
        Authorization: yelpKey
      }
    }).then(res => res.data).then(res => JSON.stringify(res)).then(res => callback(null, {
      statusCode,
      headers,
      body: res
    })).catch(e => console.log(e.response.data.error.code));
  };
  // -- Parses data and sends to appropriate function
  const data = event.body;
  const { id } = JSON.parse(data);
  const { host } = JSON.parse(data);

  if (host === 'google') {
    getGoogleData(id);
  } else if (host === 'facebook') {
    getFacebookData(id);
  } else if (host === 'yelp') {
    getYelpData(id);
  }
};

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/jared/Dropbox/documents/coding/websites/store-ratings/node_modules/dotenv/lib/main.js'");

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/jared/Dropbox/documents/coding/websites/store-ratings/node_modules/axios/index.js'");

/***/ })

/******/ })));