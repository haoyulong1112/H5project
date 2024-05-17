import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)


const refresh = new Date().getTime()
const state = {
    openId: '',
    user: {},
}
const getters = {
    getOpenid (state) {
        return state.openId
    },
    getUsermsg (state) {
        return state.user
    },
}
const mutations = {
    // 存入url参数
    saveParams (state, data) {
        if (data.cellPhone) {
            state.cellPhone = data.cellPhone;
        }
        if (data.imei) {
            state.imei = data.imei;
        }
        if (data.system) {
            state.system = data.system;
        }
    },
    updateOpenid (state, openId) {
        if (openId) {
            state.openId = openId;
        }
    },
    getUserInfo (state, user) {
        if (user) {
            state.user = user;
        }
    }
}
const actions = {
    checkoutPhone (context, cellphone) {
        context.commit('updateCellPhone', cellphone);
    }
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

// plugins: [createPersistedState()]
