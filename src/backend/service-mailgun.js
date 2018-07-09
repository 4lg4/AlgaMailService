/**
 * Created by www.Alga.me on 13/2/18.
 */

import Mail from './Mail'

export default class MailGun extends Mail {
    constructor(props) {
        super(props);
    }

    send(){
        let opt = {
            from: this.props.from,
            to: this._checkEmailAddress(this.props.to),
            subject: (this.props.env && this.props.env.debug) ? `[MailGun][${new Date().getTime()}] ${this.props.subject}` : this.props.subject,
            text: this.props.text || this.props.html
        };

        if(this.props.html) {
            opt.html = this.props.html;
        }

        if(this.props.cc) {
            opt.cc = this._checkEmailAddress(this.props.cc);
        }

        if(this.props.bcc) {
            opt.bcc = this._checkEmailAddress(this.props.bcc);
        }

        this._checkEmail();
        return super.send(opt);
    }

    _checkEmailAddress(emails) {
        if(typeof emails === 'string'){
            emails = [emails];
        }

        if(emails instanceof Array) {
            for(let i=0; emails.length>i; i++){
                if(!this._validateEmailAddress(emails[i])) {
                    throw new Error(`Invalid Email Addresses ${emails.toString()}`);
                }
            }

            return emails.toString();
        }

        throw new Error(`Invalid Email Address ${emails}`);
    }
}
