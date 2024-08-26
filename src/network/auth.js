import instance from './index.js'

export default {
    Register(data) {
        return instance({
            url: '/user/regist',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    Login(data) {
        return instance({
            url: '/user/login',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    ForgetPass(data) {
        return instance({
            url: '/user/forgetpass',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    ChangePassWord(data) {
        return instance({
            url: '/change-password',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    }
}