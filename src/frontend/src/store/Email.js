/**
 * Created by www.Alga.me on 18/2/18.
 */
import request from 'axios'

const getEmailAddresses = (emails)=>{
    if(typeof emails === 'string'){
        return emails;
    }

    if(emails instanceof Array){
        return (emails.map((email)=>email.value));
    }
};

const emailNormalize = (email)=>{
    if(!email) {
        return '';
    }

    return email.toLowerCase().trim();
};

const isEmail = (email)=> {
    if(!email) {
        return false;
    }

    return !!(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
};

const checkDups = (state)=> {
    // TODO: get a better solution for this bit and add bcc on the test
    if(state.to && state.cc
        && (!state.invalid.to && !state.invalid.cc)
        && (state.to.length > 0 && state.cc.length > 0)) {

        for (let i = 0; i < state.cc.length; i++) {
            for (let e = 0; e < state.to.length; e++) {
                if(state.cc[i].value && state.to[e].value && (state.cc[i].value === state.to[e].value)){
                    return `email address (${state.to[e].value}) duplicated on to and cc lists`;
                }
            }
        }
    }

    return false;
};

const defaults = {
    emailAddressModel: {
        model: {
            id: 1,
            value: '',
            errors: []
        },
        invalid: {
            id: 'invalid',
            type: 'danger',
            message: 'Invalid email address'
        },
        duplicated: {
            id: 'duplicated',
            type: 'danger',
            message: 'Duplicated'
        }
    }
};

export default {
    state: {
        to: [],
        cc: [],
        bcc: [],
        subject: '',
        text: '',
        html: '',
        invalid: {
            to: true,
            cc: false,
            // bcc: true,
            subject: true,
            text: true,
            html: false
        },
        emailSendStatus: false,
        emailSendStatusMessage: '',
        duplicates: ''
    },

    getters: {
        to(state){
            return state.to;
        },

        cc(state){
            return state.cc;
        },

        bcc(state){
            return state.bcc;
        },

        // getEmailTo(state){
        //     return getEmailAddresses(state.to);
        // },
        //
        // getEmailCc(state){
        //     return getEmailAddresses(state.cc);
        // },
        //
        // getEmailBcc(state){
        //     return getEmailAddresses(state.bcc);
        // },
        //
        // getEmailSubject(state){
        //     return state.subject;
        // },

        getEmailText(state){
            return state.text;
        },

        getEmailHtml(state){
            return state.html;
        },

        emailSendStatus(state){
            return state.emailSendStatus;
        },

        emailGetMessages(state){
            const dups = checkDups(state);

            if(dups) {
                return {
                    status: 'error',
                    message: dups
                };
            }
            return {
                status: state.emailSendStatus,
                message: state.emailSendStatusMessage
            };
        },

        getEmail(state){
            return {
                to: getEmailAddresses(state.to),
                cc: getEmailAddresses(state.cc),
                // bcc: getEmailAddresses(state.bcc), // TODO: upcoming
                subject: state.subject,
                text: state.text,
                html: state.html
            }
        },

        emailIsInvalid(state){
            for(const k in state.invalid) {
                if(state.invalid[k]) {
                    return true;
                }
            }

            return false;
        }
    },

    mutations: {
        emailAdd(state,payload){
            state[payload.type].push(Object.assign({}, defaults.emailAddressModel.model, { id: new Date().getTime() }));
        },
        emailUpdate(state,data){
            const {type,payload} = data;
            const {id,value} = payload;
            const myValue = emailNormalize(value);

            state.invalid[type] = false;

            const item = state[type].find((item)=>(item.id === id));
            item.errors = [];

            if (!isEmail(myValue)) {
                item.errors.push(defaults.emailAddressModel.invalid);
                state.invalid[type] = true;
            }

            Object.assign(item, {
                value: myValue,
                errors: item.errors
            });

            if (!isEmail(myValue)) {
                return true
            }

            state[type] = state[type].map((item)=>{
                if(item.value === myValue && item.id !== id){
                    state.invalid[type] = true;
                    if(!item.errors.find((error)=>(error.id === 'duplicated'))) {
                        item.errors.push(defaults.emailAddressModel.duplicated);
                    }
                } else {
                    item.errors = item.errors.filter((error)=>(error.id !== 'duplicated'));
                }

                return item;
            });
        },

        emailRemove(state,payload){
            const {type, id} = payload;
            state[type] = state[type].filter((item)=>item.id !== id);
            this.commit('emailClearDuplication', { type });
        },

        emailUpdateSubject(state,payload){
            state.subject = payload;
            state.invalid.subject = (state.subject.length < 3);
        },

        emailUpdateText(state,payload){
            state.text = payload;
            state.invalid.text = (state.text.length === 0);
        },

        emailUpdateHtml(state,payload){
            state.html = payload;
            if(state.html) {
                this.commit('emailUpdateText', state.html.replace(/<[^>]+>/g, '')); // TODO: improve the html stripping tags, only a simplified version for this demo purpose
            }
            state.invalid.html = (state.html.length === 0);
        },

        emailSendStatus(state,payload){
            state.emailSendStatus = payload.status;
            state.emailSendStatusMessage = payload.message;
        }
    },

    actions: {
        emailAddTo(ctx,payload={}){
            payload.type = 'to';
            this.commit('emailAdd',payload);
        },

        emailUpdateTo(ctx,payload={}){
            payload.payload = payload;
            payload.type = 'to';
            this.commit('emailUpdate',payload);
        },

        emailRemoveTo(ctx,payload){
            payload = {
                id: payload
            };
            payload.type = 'to';
            this.commit('emailRemove',payload);
        },

        emailAddCc(ctx,payload={}){
            payload.type = 'cc';
            this.commit('emailAdd',payload);
        },

        emailUpdateCc(ctx,payload={}){
            payload.payload = payload;
            payload.type = 'cc';
            this.commit('emailUpdate',payload);
        },

        emailRemoveCc(ctx,payload){
            payload = {
                id: payload
            };
            payload.type = 'cc';
            this.commit('emailRemove',payload);
        },

        emailUpdateSubject(ctx,payload){
            this.commit('emailUpdateSubject',payload);
        },

        emailUpdateText(ctx,payload){
            this.commit('emailUpdateText',payload);
        },

        emailUpdateHtml(ctx,payload){
            this.commit('emailUpdateHtml',payload);
        },

        emailSend(ctx,payload){
            this.commit('emailSendStatus',{
                status: 'sending',
                message: 'Working to sending your email'
            });

            // TODO: move this url composition to the main store core
            return request({
                    method: 'POST',
                    url:`${window.location.protocol}//api.${window.location.hostname}:${window.location.port}`,
                    data: payload
                })
                .then(()=>{
                    this.commit('emailSendStatus',{
                        status: 'success',
                        message: 'Email Sent =)'
                    });
                })
                .catch((err)=>{
                    this.commit('emailSendStatus',{
                        status: 'error',
                        message: `Ooops... something went wrong / ${(err.response) ? err.response.data : ''}`
                    });
                });
        }
    }
}
