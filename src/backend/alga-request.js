const http = require('http');
const https = require('https');
const querystring = require('querystring');
const {URL} = require('url');

const logit = (...vars)=> {
  if (process.env.NODE_ENV === 'test' || process.env.DEBUG) {
    console.log(...vars);
  }
};

const encodeBody = ({body, json}) => {
  if (json) {
    try {
      return JSON.stringify(body);
    } catch (e) {
      return '';
    }
  }

  return querystring.stringify(body);
};

const request = ({url, method, headers, body = '', json, auth}) => {
  if (!url || !method) {
    throw new Error('url and method are required');
  }

  const request = (url.indexOf('https') > -1) ? https.request : http.request;
  url = new URL(url);

  if (method === 'POST' && !body) {
    throw new Error('body is required in POST requests');
  }

  const options = {
    hostname: url.hostname,
    protocol: url.protocol,
    port: url.port,
    path: url.pathname,
    method,
    auth,
    search: '?a=2&b=3',
    body,
  };

  if (method === 'POST' && json) {
    options.headers = Object.assign({}, {'Content-Type': 'application/json'}, headers);
  } else if (method === 'POST') {
    options.headers = Object.assign({}, {'Content-Type': 'application/x-www-form-urlencoded'}, headers);
  }

  if (method === 'POST') {
    options.body = encodeBody({body, json});
    options.headers = Object.assign({}, options.headers, {'Content-Length': Buffer.byteLength(options.body)});
  }

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test' && process.env.DEBUG) {
      return resolve(options);
    }

    let bodyRet = '';
    const req = request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => bodyRet += chunk);
      res.on('end', () => {
        if (res.statusCode && !res.statusCode.toString().match(/^20/)) {
          logit(`problem with request: ${res.statusCode}`);
          reject(res.statusCode);
        }

        if (json) {
          try {
            bodyRet = JSON.parse(bodyRet);
          } catch (e) {
            logit('Returned json error');
          }
        }

        return resolve(bodyRet);
      });
    });

    req.on('error', (e) => {
      logit(`problem with request: ${e}`);
      reject(e.statusCode);
    });

    req.write(options.body);
    req.end();
  });
};

const post = ({url, method, headers, body, json, auth}) => request({url, method: 'POST', headers, body, json, auth});
const get = ({url, method, headers, body, json, auth}) => request({url, method: 'GET', headers, body, json, auth});

module.exports = {get, post};
