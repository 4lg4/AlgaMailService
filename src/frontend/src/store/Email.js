/**
 * Created by www.Alga.me on 18/2/18.
 */

const getEmailAddresses = (emails)=>{
    if(typeof emails === 'string'){
        return emails;
    }

    if(emails instanceof Array){
        return (emails.map((email)=>email.value)).toString();
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
        invalid: true
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
            return state.invalid;
        }
    },

    mutations: {
        emailAdd(state,payload){
            state[payload.type].push(Object.assign({}, defaults.emailAddressModel.model, { id: new Date().getTime() }));
        },
        emailUpdate(state,data){
            console.log('Store:Email:emailUpdate', data);

            const {type,payload} = data;
            const {id,value} = payload;

            // state[type] = state[type].map((item)=>{
            //     if(item.id !== id) {
            //         return item;
            //     }
            //
            //     item.errors = [];
            //     state.invalid = false;
            //
            //     if (value && !isEmail(value.trim())) {
            //         item.errors.push(defaults.emailAddressModel.invalid);
            //         state.invalid = true;
            //     }
            //
            //     return {
            //         id,
            //         value,
            //         errors: item.errors
            //     };
            // });

            state.invalid = false;

            const item = state[type].find((item)=>(item.id === id));
            item.errors = [];

            if (value && !isEmail(value.trim())) {
                item.errors.push(defaults.emailAddressModel.invalid);
                state.invalid = true;
            }

            Object.assign(item, {
                value,
                errors: item.errors
            });



            state[type] = state[type].map((item)=>{
                if(item.value === value && item.id !== id){
                    if(!item.errors.find((error)=>(error.id === 'duplicated'))) {
                        item.errors.push(defaults.emailAddressModel.duplicated);
                        state.invalid = true;
                    }
                } else {
                    item.errors = item.errors.filter((error)=>(error.id !== 'duplicated'));
                }

                return item;
            });
        },

        emailRemove(state,payload){
            console.log('Store:Email:emailRemove', payload);

            const {type, id} = payload;
            state[type] = state[type].filter((item)=>item.id !== id);
        },

        emailUpdateSubject(state,payload){
            state.subject = payload;
        },

        emailUpdateText(state,payload){
            state.text = payload;
        },

        emailUpdateHtml(state,payload){
            state.html = payload;
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
