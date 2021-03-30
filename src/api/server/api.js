const axios = require('axios').default;
const {promisify} = require('util');
const sleep = promisify(setTimeout);

// Callbacks to be run when a specific error code is returned.
// These are global callbacks that must be registered when user logs in
// and are independent of the page.
let run401Handler = undefined; // todo: Should normally logout
let run403Handler = undefined; // todo: Should probably redirect home and refresh eventual authentication token

let handlerCalled = false;

const register401Handler = (callback) => {
  run401Handler = callback;
  handlerCalled = false;
};

const register403Handler = (callback) => {
  run403Handler = callback;
  handlerCalled = false;
};

const domain =
  process.env.REACT_APP_MODE === 'production' ?
    process.env.REACT_APP_SERVER_URL_PRODUCTION :
    process.env.REACT_APP_SERVER_URL;
const server = axios.create({
  baseURL: domain + '/api/v1',
  timeout: 120000,
});

// Returns [code, data], where data is undefined if code is not 200
// code will not be 401 or 403 as they are handler centrally
const post = async (path, data, config = {}) => {
  try {
    const res = await server.post(path, data, config);
    return [res.status, res.data];
  } catch (err) {
    if (!err.response) {
      // handlerCalled = true;
      return [undefined, undefined];
    }

    if (err.response.status === 401) {
      if (!handlerCalled) {
        handlerCalled = true;
        await run401Handler();
      }
      await sleep(10000); // wait for logout to finish
    } else if (err.response.status === 403) {
      if (!handlerCalled) {
        handlerCalled = true;
        await run403Handler();
      }
      await sleep(10000); // wait for logout to finish
    } else if (err.response.status === 464) {
      return [err.response.status, err.response.data];
    } else {
      return [err.response.status, undefined];
    }
  }
};

// Returns [code, data], where data is undefined if code is not 200
// code will not be 401 or 403 as they are handler centrally
const get = async (path, config = {}) => {
  try {
    const res = await server.get(path, config);
    return [res.status, res.data];
  } catch (err) {
    if (!err.response) {
      // handlerCalled = true;
      return [undefined, undefined];
    }

    if (err.response.status === 401) {
      if (!handlerCalled) {
        handlerCalled = true;
        await run401Handler();
      }
      await sleep(10000); // wait for logout to finish
    } else if (err.response.status === 403) {
      if (!handlerCalled) {
        handlerCalled = true;
        await run403Handler();
      }
      await sleep(10000); // wait for logout to finish
    } else {
      return [err.response.status, undefined];
    }
  }
};

export {post, get, register401Handler, register403Handler};
