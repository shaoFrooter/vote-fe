import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: localStorage.getItem('userData') ? localStorage.getItem('userData') : ''
  },
  getters: {
    getNickName(state){
      return state.nickName;
    }
  },
  mutations: {
    setUserData: (state, userData) => {
      state.userData = userData;
      localStorage.setItem('userData', JSON.stringify(userData));
    },
    clearUserData:(state)=>{
      state.userData='';
      localStorage.removeItem('userData');
    }
  }
});
