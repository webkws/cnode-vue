import Vue from  'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


export default new Vuex.Store({
    state: {        
        isLogin: false,   //是否登录的状态
        loading: false,    //loadding动画
        bell: 0,            //消息数量
        token:'',
        bottomNav:'home'
    },
    mutations: {
        login(state) {
          state.isLogin = true;
        },
        logout(state) {
          state.isLogin = false;
        },
        loading: state => state.loading = true,
        loadComplete: state => state.loading = false,
        changeNav(state, nav){
            state.bottomNav = nav;
        }
    },
    actions: {
        login ({commit}) {
            commit('login')
        },
        logout ({commit}) {
            commit('logout')
        },
        closeLoading({commit}) {
          commit('loadComplete')
        },
        changeNav({commit}) {
          commit('changeNav')
        }
    }
});
