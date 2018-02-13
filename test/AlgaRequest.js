/**
 * Created by www.Alga.me on 13/2/18.
 */

import assert from 'assert'
import AlgaRequest from '../src/lib/AlgaRequest'
//
// describe(`AlgaRequest`, ()=> {
//
//     describe('_gethostname', ()=> {
//         const setUrl = 'https://jsonplaceholder.typicode.com/posts';
//         const expected = 'jsonplaceholder.typicode.com';
//         const request = new AlgaRequest({ url: setUrl });
//
//         it(`should return a string ${expected}`, () =>
//             assert.equal(request._gethostname(setUrl), expected)
//         )
//     });
//
//     describe('_encodeBody', ()=> {
//         const data = {
//             from: 'a',
//             to: 'b',
//             subject: 'subject',
//             text: 'text'
//         };
//
//         const expectedJson = '{"from":"a","to":"b","subject":"subject","text":"text"}';
//         const expectedForm = 'from=a&to=b&subject=subject&text=text';
//
//         it(`should return a stringified object ${expectedJson}`, () => {
//             const request = new AlgaRequest({
//                 json: true,
//                 url: 'https://jsonplaceholder.typicode.com/posts'
//             });
//
//             assert.equal(request._encodeBody(data), expectedJson);
//         });
//
//         it(`should return a stringified form ${expectedForm}`, () => {
//             const request = new AlgaRequest({
//                 url: 'https://jsonplaceholder.typicode.com/posts'
//             });
//
//             assert.equal(request._encodeBody(data), expectedForm);
//         });
//     });
//
//     describe('setOptions', ()=> {
//         const data = {
//             from: 'a',
//             to: 'b',
//             subject: 'subject',
//             text: 'text',
//         };
//
//         const expected = {
//             hostname: 'jsonplaceholder.typicode.com',
//             path: '/posts',
//             method: undefined,
//             auth: undefined,
//             body: 'from=a&to=b&subject=subject&text=text',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//         };
//
//         const request = new AlgaRequest({
//             url: 'https://jsonplaceholder.typicode.com/posts',
//             body: data
//         });
//
//         it(`should return an object ${expected}`, () => {
//             assert.deepEqual(request.setOptions(), expected);
//         });
//     });
//
//     describe('post', ()=> {
//         const data = {
//             from: 'a',
//             to: 'b',
//             subject: 'subject',
//             text: 'text',
//         };
//
//         it(`should return true`, () => {
//             const request = new AlgaRequest({
//                 url: 'https://jsonplaceholder.typicode.com/posts'
//             });
//
//             request
//                 .post(data)
//                 .then((r)=>assert.ok(r))
//         });
//
//         it(`should return a string when error`, () => {
//             const request = new AlgaRequest({
//                 url: 'https://jsonplaceholder.typicode.com/postssss'
//             });
//
//             request
//                 .post(data)
//                 .then((r)=>assert.ok((typeof r === 'string')))
//         });
//     });
// });


Promise
    .resolve()
    .then(()=>{
        const request = new AlgaRequest({
            url: 'https://jsonplaceholder.typicode.com/posts',
            json: true
        });

        return request.post({
            body: {
                title: 'foo',
                body: 'bar',
                userId: 1
            }
        });
    })
    .then((s)=>console.log('SUCCESS json placeholder', s))

    // .then(()=>{
    //     const request = new AlgaRequest({
    //         url: 'https://api.mailgun.net/v3/sandbox81d965a93ae8468794ae14d7e81f4607.mailgun.org/messages',
    //         auth: 'api:key-0dee7ba4319e4159feb85f743668add6'
    //     });
    //
    //     return request.post({
    //         body: {
    //             from: 'Alga Me (No Reply)<no-reply@alga.me>',
    //             to: 'Alga <alga@alga.me>',
    //             subject: `Subject - ${new Date().toLocaleString()}`,
    //             text: `Copy ${new Date().toLocaleString()}`
    //         }
    //     });
    // })
    // .then((s)=>console.log('SUCCESS mail gun', s))

    .catch((err)=>console.log('ERR', err));
