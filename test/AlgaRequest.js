/**
 * Created by www.Alga.me on 13/2/18.
 */

import assert from 'assert'
import AlgaRequest from '../src/lib/AlgaRequest'

describe(`AlgaRequest`, ()=> {

    describe('_gethostname', ()=> {
        const setUrl = 'https://jsonplaceholder.typicode.com/posts';
        const expected = 'jsonplaceholder.typicode.com';
        const request = new AlgaRequest({ url: setUrl });

        it(`should return a string ${expected}`, () =>
            assert.equal(request._gethostname(setUrl), expected)
        )
    });

    describe('_encodeBody', ()=> {
        const data = {
            from: 'a',
            to: 'b',
            subject: 'subject',
            text: 'text'
        };

        const expectedJson = '{"from":"a","to":"b","subject":"subject","text":"text"}';
        const expectedForm = 'from=a&to=b&subject=subject&text=text';

        it(`should return a stringified object ${expectedJson}`, () => {
            const request = new AlgaRequest({
                json: true,
                url: 'https://jsonplaceholder.typicode.com/posts'
            });

            assert.equal(request._encodeBody(data), expectedJson);
        });

        it(`should return a stringified form ${expectedForm}`, () => {
            const request = new AlgaRequest({
                url: 'https://jsonplaceholder.typicode.com/posts'
            });

            assert.equal(request._encodeBody(data), expectedForm);
        });
    });

    describe('setOptions', ()=> {
        const data = {
            from: 'a',
            to: 'b',
            subject: 'subject',
            text: 'text',
        };

        const expected = {
            hostname: 'jsonplaceholder.typicode.com',
            path: '/posts',
            method: undefined,
            auth: undefined,
            body: 'from=a&to=b&subject=subject&text=text',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        const request = new AlgaRequest({
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: data
        });

        it(`should return an object ${expected}`, () => {
            assert.deepEqual(request.setOptions(), expected);
        });
    });

    describe('post', ()=> {
        const data = {
            from: 'a',
            to: 'b',
            subject: 'subject',
            text: 'text',
        };

        it(`should return true`, () => {
            const request = new AlgaRequest({
                url: 'https://jsonplaceholder.typicode.com/posts'
            });

            request
                .post(data)
                .then((r)=>assert.ok(r))
        });

        it(`should return a string when error`, () => {
            const request = new AlgaRequest({
                url: 'https://jsonplaceholder.typicode.com/postssss'
            });

            request
                .post(data)
                .then((r)=>assert.ok((typeof r === 'string')))
        });
    });
});


