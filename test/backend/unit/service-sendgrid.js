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


describe.only(`Service SendGrid - service-sendgrid.js`, () => {
  describe(`send`, () => {
    it(`should throw an error if from, auth and url are missing`, () =>
      expect(()=> send({})).to.throw('Service SendGrid: from, url and auth are required, see README for more info')
    );

    it(`should throw an error if to, subject, text / html are missing`, () =>
      expect(()=> send({from: 'no-reply@alga.me', auth: '12312', url: 'http://www.google.com'})).to.throw('to, subject, text / html are required')
    );

    it(`should throw an error if cc are an invalid email string or Array of emails`, () => {
      const options = {
        from: 'no-reply@alga.me', auth: '12312', url: 'http://www.google.com',
        subject: 'my email', text: 'the email body', to: ['no-reply@alga.me'],
        cc: ['****'],
      };
      expect(()=> send(options)).to.throw('cc should be an email string or an Array of email strings');

      const options2 = {
        from: 'no-reply@alga.me', auth: '12312', url: 'http://www.google.com',
        subject: 'my email', text: 'the email body', to: ['no-reply@alga.me'],
        cc: '****',
      };
      expect(()=> send(options2)).to.throw('cc should be an email string or an Array of email strings');
    });

    it(`should throw an error if bcc are an invalid email string or Array of emails`, () => {
      const options = {
        from: 'no-reply@alga.me', auth: '12312', url: 'http://www.google.com',
        subject: 'my email', text: 'the email body', to: ['no-reply@alga.me'],
        bcc: ['****'],
      };
      expect(()=> send(options)).to.throw('bcc should be an email string or an Array of email strings');

      const options2 = {
        from: 'no-reply@alga.me', auth: '12312', url: 'http://www.google.com',
        subject: 'my email', text: 'the email body', to: ['no-reply@alga.me'],
        bcc: '****',
      };
      expect(()=> send(options2)).to.throw('bcc should be an email string or an Array of email strings');
    });

    it(`should throw an error if to / cc / bcc have duplicated email`, () => {
      const options = {
        from: 'no-reply@alga.me', auth: '12312', url: 'http://www.google.com',
        subject: 'my email', text: 'the email body', to: ['no-reply@alga.me'],
        cc: ['no-reply@alga.me'],
      };
      expect(()=> send(options)).to.throw('to, cc, bcc email addresses should be unique. Duplicates: no-reply@alga.me');
    });

    it(`should return the generated options and payload before send it`, () => {
      process.env.FAKE_IT = true;

      const options = {
        from: 'no-reply@alga.me', auth: '12312', url: 'http://www.google.com',
        subject: 'my email', text: 'the email body', to: ['yes-reply@alga.me'],
      };
      const {body} = send(options);
      const {personalizations, subject, content} = body;
      expect(body).to.be.an('object');
      expect(body).to.have.property('personalizations');
      expect(body).to.have.property('subject');
      expect(body).to.have.property('content');
      expect(personalizations).to.be.an('array');
      expect(content).to.be.an('array');
      expect(subject).to.be.a('string');
    });
  });
});


