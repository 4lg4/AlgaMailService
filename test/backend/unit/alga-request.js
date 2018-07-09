const {get, post} = require('../../../src/backend/alga-request');

describe(`AlgaRequest - alga-request.js`, () => {
  describe(`get: based on (https://jsonplaceholder.typicode.com/posts)`, () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    it(`should return an array of objects **** if this bit is broken is because of the endpoint`, async () => {
      try {
        const results = await get({url, json: true});
        expect(results).to.be.an('array');
        expect(results[0]).to.have.property('id');
        expect(results[0]).to.have.property('userId');
        expect(results[0]).to.have.property('title');
        expect(results[0]).to.have.property('body');
      } catch (e) {
        expect(e).to.eql(200); // generates an error
      }
    });

    it(`should throw an error`, async () => {
      try {
        await get({url: `${url}ssssssss`, json: true});
      } catch (e) {
        expect(e).to.eql(404);
      }
    });
  });

  describe(`post: based on (https://jsonplaceholder.typicode.com/post)`, () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    it(`should return an object **** if this bit is broken is because of the endpoint`, async () => {
      try {
        const result = await post({
          url,
          json: true,
          body: {
            title: 'foo',
            body: 'bar',
            userId: 1,
          },
        });

        expect(result).to.be.an('object');
        expect(result).to.have.property('id');
        expect(result).to.have.property('userId');
        expect(result).to.have.property('title');
        expect(result).to.have.property('body');
      } catch (e) {
        expect(e).to.eql(200); // generates an error
      }
    });

    it(`should throw an error`, async () => {
      try {
        await get({url: `${url}ssssssss`, json: true});
      } catch (e) {
        expect(e).to.eql(404);
      }
    });
  });
});


