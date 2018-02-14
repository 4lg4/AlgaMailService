/**
 * Created by www.Alga.me on 13/2/18.
 */

import Mail from './Mail'

export default class SendGrid extends Mail {
    constructor(props={}) {
        props.json = true;
        props.headers ={
            Authorization: `Bearer ${props.auth}`
        };

        super(props);
    }


    send(){

        const opt = {
            personalizations: [{
                to: []
            }],
            from: {"email": this.props.from },
            subject: (this.props.env && this.props.env.debug) ? `[SendGrid][${new Date().getTime()}] ${this.props.subject}` : this.props.subject,
            content: [{
                type: "text/plain",
                value: this.props.text || this.props.html
            }]
        };

        if(this.props.to) {
            opt.personalizations[0].to = this._checkEmailAddress(this.props.to);
            if(!opt.personalizations[0].to) {
                return Promise.reject('to should be a string or an Array of strings');
            }
        }

        if(this.props.cc) {
            opt.personalizations[0].cc = this._checkEmailAddress(this.props.cc);
            if(!opt.personalizations[0].cc) {
                return Promise.reject('cc should be a string or an Array of strings');
            }
        }

        if(this.props.bcc) {
            opt.personalizations[0].bcc = this._checkEmailAddress(this.props.bcc);
            if(!opt.personalizations[0].bcc) {
                return Promise.reject('bcc should be a string or an Array of strings');
            }
        }

        // TODO: verify if this option exists
        if(this.props.html) {
            opt.content.push({
                type: "text/html",
                value: this.props.html
            });
        }

        this._checkEmail();
        return super.send(opt);
    }

    _checkEmailAddress(list,unique) {
        const generatedList = [];
        if(!(list instanceof Array)){
            list = [list];
        }

        for(let i=0; list.length>i; i++){
            if(!this._validateEmailAddress(list[i])) {
                return false;
            }
            generatedList.push({ "email": list[i] });
        }

        return generatedList;
    }

}
