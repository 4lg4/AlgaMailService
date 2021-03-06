/**
 * Created by www.Alga.me on 13/2/18.
 */

import MailGun from '../src/lib/MailGun'
import env from '../src/env.json'

const algaMail = new MailGun({
    url: env.services.MailGun.url,
    auth: env.services.MailGun.auth,
    "from": "no-reply@alga.me",
    "to": "alga@alga.me",
    "cc": ["alga@alga.me", "alga@alga.me"],
    "subject": "outro subject 2",
    "text": "outro email test sempre",
    "html": "<div style='color:red;'>outro email test sempre</div>"
});

return Promise.resolve()
    .then(()=>algaMail.send())
    .then((s)=>console.log('success',s))
    .catch((s)=>console.log('error',s));
