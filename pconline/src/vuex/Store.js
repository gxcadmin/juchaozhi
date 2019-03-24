import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    currentSelected: 0,
    currentPath: '/Home/JingXuan'
}
const getters = {

}
const mutations = {
    CHANGESELECTED(state,payload){
        state.currentSelected = payload.currentSelected;
        state.currentPath = payload.path;
    }
}
const actions = {

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})