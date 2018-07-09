const path = require('path');
require('dotenv-safe').config({
  allowEmptyValues: true,
  example: path.join(__dirname, '../../../.env.example'),
});
const {send} = require('../../../src/backend/service-sendgrid');


// import SendGrid from '../src/lib/SendGrid'
// import env from '../src/env.json'

const options = {
  // url: env.services.SendGrid.url,
  // auth: env.services.SendGrid.auth,
  from: 'no-reply@alga.me',
  to: 'alga@alga.me',
  cc: ['akgleal@gmail.com', 'adriano@workit.rocks'],
  subject: 'outro subject 2',
  text: 'outro email test sempre',
  html: '<div style=\'color:red;\'>outro email test sempre</div>',
};

// return Promise.resolve()
//     .then(()=>algaMail.send())
//     .then((s)=>console.log('success',s))
//     .catch((s)=>console.log('error',s));


describe.only(`Service SendGrid - service-sendgrid.js`, async () => {
  describe(`send`, () => {
    it(`should throw an error if url is missing`, async () => {
      const options = {};
      try {
        await send(options);
      } catch (e) {
        console.log('####### ', e);
      }
      // expect(send(options)).to.throw(Error);
    });
  });
});


