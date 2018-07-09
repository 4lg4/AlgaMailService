// /**
//  * Created by www.Alga.me on 13/2/18.
//  */

// import SendGrid from '../src/lib/SendGrid'
// import env from '../src/env.json'

// const algaMail = new SendGrid({
//     url: env.services.SendGrid.url,
//     auth: env.services.SendGrid.auth,
//     "from": "no-reply@alga.me",
//     "to": "alga@alga.me",
//     "cc": ["akgleal@gmail.com", "adriano@workit.rocks"],
//     "subject": "outro subject 2",
//     "text": "outro email test sempre",
//     "html": "<div style='color:red;'>outro email test sempre</div>"
// });

// return Promise.resolve()
//     .then(()=>algaMail.send())
//     .then((s)=>console.log('success',s))
//     .catch((s)=>console.log('error',s));
