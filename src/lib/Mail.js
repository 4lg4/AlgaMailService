/**
 * Created by www.Alga.me on 13/2/18.
 */

import AlgaRequest from 'AlgaRequest'

const defaults = {
    email: {
        from: null,
        to: null,
        cc: null,
        bcc: null,
        subject: null,
        text: null,
        html: null
    }
};
export default class Mail {
    constructor(props = {}) {
        this.props = Object.assign({}, defaults, props);
        this.props.email = Object.assign(defaults.email,this.props);
        this._request = new AlgaRequest(this.props);
    }

    setFrom(from){
        this._setEmailProp({ from });
    }

    setTo(to){
        this._setEmailProp({ to });
    }

    setCc(cc){
        this._setEmailProp({ cc });
    }

    setBcc(bcc){
        this._setEmailProp({ bcc });
    }

    setSubject(subject){
        this._setEmailProp({ subject });
    }

    setText(text){
        this._setEmailProp({ text });
    }

    setHtml(html){
        this._setEmailProp({ html });
    }

    send(body) {
        this._checkEmail();
        return this._request.post({ body: body || this.props.email });
    }

    _checkEmail(){
        if(!this.props.email.from || !this.props.email.to || !this.props.email.subject || (!this.props.email.text && !this.props.email.html)){
            throw new Error('From, To, Subject, Text / Html are required');
        }

        return true;
    }

    _setEmailProp(prop){
        Object.assign(this.props.email, prop);
    }
}
