/**
 * Created by www.Alga.me on 13/2/18.
 */

import AlgaRequest from './AlgaRequest'

const defaults = {
    from: null,
    to: null,
    cc: null,
    bcc: null,
    subject: null,
    text: null,
    html: null
};
export default class Mail {
    constructor(props = {}) {
        this.props = Object.assign({}, defaults, props);

        this.props.from = this.props.from || this.props.env.from;
        this._checkEmail();

        this._request = new AlgaRequest(this.props);
        this._emailAddress = [];
    }

    send(body) {
        // TODO: get a better solution for this
        if(!this._checkUniqueEmailAddress(this.props.to) || !this._checkUniqueEmailAddress(this.props.cc) || !this._checkUniqueEmailAddress(this.props.bcc)) {
            return Promise.reject('to, cc, bcc email addresses should be unique');
        }

        return this._request.post({ body: body || this.props });
    }

    _checkEmail(){
        if(!this.props.from || !this.props.to || !this.props.subject || (!this.props.text && !this.props.html)){
            throw new Error('from, to, subject, text / html are required');
        }

        return true;
    }

    _validateEmailAddress(email){
        if(!email) {
            return false;
        }

        return (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
    }

    // this should be overwrite when extended
    _checkEmailAddress(emails) {
        return true;
    }

    _checkUniqueEmailAddress(emails) {
        if(!emails) {
            return true;
        }

        if(!(emails instanceof Array)){
            emails = [emails];
        }

        for(let i=0; emails.length>i; i++){
            if(!!this._emailAddress.find((e)=>(e === emails[i]))) {
                return false;
            }

            this._emailAddress.push(emails[i]);
        }

        return true;
    }
}
