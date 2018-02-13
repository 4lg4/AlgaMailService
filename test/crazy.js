/**
 * Created by www.Alga.me on 13/2/18.
 */

import mailgun from 'mailgun-js'

var apiKey = 'key-0dee7ba4319e4159feb85f743668add6';
var domain = 'sandbox81d965a93ae8468794ae14d7e81f4607.mailgun.org';
var mailgun = require('mailgun-js')({ apiKey, domain });

var data = {
    from: 'Alga no-reply <no-reply@alga.me>',
    to: 'alga@alga.me',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness! '+new Date().toLocaleString()
};

mailgun.messages().send(data, function (error, body) {
    console.log('ERROR ',error);
    console.log(body);
});
