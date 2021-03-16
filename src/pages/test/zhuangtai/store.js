import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    cellPhone: '17839103019',
    name: '郝玉龙'
};
const getters = {
    isName (state) {
        return state.name
    },
    isCellPhone (state) {
        return state.cellPhone
    }
}
const mutations = {
    updateName (state, newname) {
        state.name = newname;
    },
    updatePhone (state, num) {
        state.cellPhone = num;
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations
});
export default store;
