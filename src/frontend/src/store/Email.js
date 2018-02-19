/**
 * Created by www.Alga.me on 18/2/18.
 */

const getEmailAddresses = (emails)=>{
    if(typeof emails === 'string'){
        return emails;
    }

    if(emails instanceof Array){
        return (emails.map((email)=>email.value)).toString().toLowerCase();
    }
};

const isEmail = (email)=> {
    if(!email) {
        return false;
    }

    return !!(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
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
        }
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

        getEmailTo(state){
            return getEmailAddresses(state.to);
        },

        getEmailCc(state){
            return getEmailAddresses(state.cc);
        },

        getEmailBcc(state){
            return getEmailAddresses(state.bcc);
        },

        getEmailSubject(state){
            return state.subject;
        },

        getEmailText(state){
            return state.text;
        },

        getEmailHtml(state){
            return state.html;
        },

        getEmail(state){
            return {
                to: getEmailAddresses(state.to),
                cc: getEmailAddresses(state.cc),
                bcc: getEmailAddresses(state.bcc),
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

            state.invalid[type] = false;

            const item = state[type].find((item)=>(item.id === id));
            item.errors = [];

            if (value && !isEmail(value.trim())) {
                item.errors.push(defaults.emailAddressModel.invalid);
                state.invalid[type] = true;
            }

            Object.assign(item, {
                value,
                errors: item.errors
            });



            state[type] = state[type].map((item)=>{
                if(item.value.toLowerCase() === value.toLowerCase() && item.id !== id){
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
        }

    }
}
