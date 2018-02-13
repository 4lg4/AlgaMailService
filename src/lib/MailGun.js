/**
 * Created by www.Alga.me on 13/2/18.
 */

import Mail from './Mail'

export default class MailGun extends Mail {
    constructor(props) {
        super(props);
    }

    send(){
        return super.send();
    }







    testSandBox(){

        // Sandbox example

        // curl -s --user 'api:key-0dee7ba4319e4159feb85f743668add6' \
        // https://api.mailgun.net/v3/sandbox81d965a93ae8468794ae14d7e81f4607.mailgun.org/messages \
        //      -F from='Mailgun Sandbox <postmaster@sandbox81d965a93ae8468794ae14d7e81f4607.mailgun.org>' \
        //      -F to='Alga <alga@alga.me>' \
        //      -F subject='Hello Alga' \
        //      -F text='Congratulations Alga, you just sent an email with Mailgun!  You are truly awesome!'


        const request = new AlgaRequest({
            url: 'https://api.mailgun.net/v3/sandbox81d965a93ae8468794ae14d7e81f4607.mailgun.org/messages',
            auth: 'api:key-0dee7ba4319e4159feb85f743668add6'
        });

        return request.post({
            body: {
                from: 'Alga Me (No Reply)<no-reply@alga.me>',
                to: 'Alga <alga@alga.me>',
                subject: `Subject - ${new Date().toLocaleString()}`,
                text: `Copy ${new Date().toLocaleString()}`
            }
        });

    }
}
