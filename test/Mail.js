/**
 * Created by www.Alga.me on 14/2/18.
 */


import assert from 'assert'
import Mail from '../src/lib/Mail'
import env from '../src/env.json'

describe(`Mail`, ()=> {

    describe('_validateEmailAddress', ()=> {
        const input = 'akgleal@gmail.com';
        const expected = true;
        const algaMail = new Mail({ env });

        it(`should return ${expected}`, () =>
            assert.ok(algaMail._validateEmailAddress(input))
        )
    });
});


