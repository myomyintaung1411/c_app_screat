
export default {
    state: {
      loginData: JSON.parse(localStorage.getItem('xztt')) || null,
      profileInfodata:JSON.parse(localStorage.getItem('abcd')) || null,
      passwordInfo:JSON.parse(localStorage.getItem('ear')) || null,
      isShowNotice:false,
      baseImageUrl:'http://45.116.165.93:6195/statics'
    },

    getters: {
        LoginData:state => state.loginData,
        ProfileInfoData:state => state.profileInfodata,
        IsShowNotice:state =>  state.isShowNotice,
        PasswordInfo:state =>  state.passwordInfo,
        BaseImageUrl:state =>  state.baseImageUrl,
    },

    mutations: {
        LOGIN_DATA(state,payload) {
            state.loginData = payload
            localStorage.setItem('xztt',JSON.stringify(payload))
        },
        PROFILE_USER_INFO(state,payload) {
            state.profileInfodata = payload
            localStorage.setItem('abcd',JSON.stringify(payload))
        },
        ISSHOWNOTICE(state,payload){
            state.isShowNotice = payload
        },
        PASSWORD_INFO(state,payload){
            state.passwordInfo = payload
            localStorage.setItem('ear',JSON.stringify(payload))
        }
    },
    namespaced: true
}
