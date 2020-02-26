import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import computed from './computed'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        filter: {
            group: 'spb',
        },
    },
    actions,
    mutations,
    computed,
    getters
})
