// /**
//  * Created by www.Alga.me on 13/2/18.
//  */

// import AlgaRequest from '../src/lib/AlgaRequest'
// import config from '../src/env.json'

// Promise
//     .resolve()

//     .then(()=>{
//         const request = new AlgaRequest({
//             url: config.services.MailGun.url,
//             auth: config.services.MailGun.auth
//         });

//         return request.post({
//             body: {
//                 from: 'Alga Me (No Reply)<no-reply@alga.me>',
//                 to: 'Alga <alga@alga.me>',
//                 subject: `Subject - ${new Date().toLocaleString()}`,
//                 text: `Copy ${new Date().toLocaleString()}`
//             }
//         });
//     })
//     .then((s)=>console.log('SUCCESS mail gun', s))


//     .then(()=>{
//         const request = new AlgaRequest({
//             json: true,
//             url: config.sendgrid.url,
//             headers:{
//                 Authorization: `Bearer ${config.services.SendGrid.auth}`
//             }
//         });

//         return request.post({
//             body: {
//                 "personalizations": [{
//                     "to": [{"email": "alga@alga.me"}]
//                 }],
//                 "from": {"email": "no-reply@alga.me"},
//                 "subject": "Hello, World! - "+new Date().toString(),
//                 "content": [{"type": "text/plain", "value": "Heya!"}]
//             }

//         });
//     })
//     .then((s)=>console.log('SUCCESS send grid', s))

//     .catch((err)=>console.log('ERR', err));
