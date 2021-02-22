import Vue from 'vue'
import Vuex from 'vuex'
// import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
	fullLoading:false,
}

const mutations = {
	fullLoadingFun(state,fullLoading){
		state.fullLoading = fullLoading;
	},
}

const actions = {
	
}
export default new Vuex.Store({
	state,
	actions,
	mutations
})