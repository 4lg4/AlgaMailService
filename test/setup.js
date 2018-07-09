const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
global.expect = chai.expect;

process.on('warning', (warning) => {
  if (warning.name === 'PromiseRejectionHandledWarning') {
    console.log(warning.stack);
  }
});

process.on('unhandledRejection', (rejection) => {
  throw rejection;
});
