
export default {
    state: {
      loginData: JSON.parse(localStorage.getItem('xztt')) || null,
      profileInfodata:JSON.parse(localStorage.getItem('abcd')) || null,
    },

    getters: {
        LoginData:state => state.loginData,
        ProfileInfoData:state => state.profileInfodata
    },

    mutations: {
        LOGIN_DATA(state,payload) {
            state.loginData = payload
            localStorage.setItem('xztt',JSON.stringify(payload))
        },
        PROFILE_USER_INFO(state,payload) {
            state.profileInfodata = payload
            localStorage.setItem('abcd',JSON.stringify(payload))
        }
    },
    namespaced: true
}
