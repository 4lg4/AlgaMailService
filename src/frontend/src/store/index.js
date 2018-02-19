/**
 * Created by www.Alga.me on 18/2/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import email from './Email'

Vue.use(Vuex);
const stores = {
    modules: { email },
    strict: true
};

export default new Vuex.Store(stores);
