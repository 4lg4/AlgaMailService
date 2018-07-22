const {isEmailAddressValid, checkDuplicationInArray} = require('../../../src/backend/helpers');

describe(`helpers - helpers.js`, () => {
  describe(`isEmailAddressValid`, () => {
    it(`should return true if email is valid`, () =>
      expect(isEmailAddressValid('alga@alga.me')).to.be.true
    );

    it(`should return false if email is valid`, () => {
      expect(isEmailAddressValid('alga@alga.me.')).to.be.false;
      expect(isEmailAddressValid('alga@alga.me.c')).to.be.false;
      expect(isEmailAddressValid('al@alga')).to.be.false;
      expect(isEmailAddressValid('')).to.be.false;
    });
  });

  describe(`checkDuplicationInArray`, () => {
    it(`should return an empity array if not duplicated`, () => {
      expect(checkDuplicationInArray(['g', 'h', 'i', 'j']).length).to.be.eql(0);
      expect(checkDuplicationInArray(false, '').length).to.be.eql(0);
      expect(checkDuplicationInArray(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'])).to.be.an('array');
      expect(checkDuplicationInArray(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']).length).to.be.eql(0);
    });

    it(`should return an array with the duplicated strings`, () =>
      expect(checkDuplicationInArray(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'f', 'i', 'j', 'd', 'i'])).to.eql(['f', 'd', 'i'])
    );
  });
});


