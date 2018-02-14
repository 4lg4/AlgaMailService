/**
 * Created by www.Alga.me on 15/2/18.
 */

import AlgaRequest from '../src/lib/AlgaRequest'

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
    .catch((err)=>console.log('ERR', err));
