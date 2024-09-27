import instance from './index.js'

export default {
    getUserInfo(data) {
        return instance({
            url: '/opt/getUserInfo',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },  
    changePassword(data) {
        return instance({
            url: '/opt/editPw',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    changePhone(data) {
        return instance({
            url: '/opt/editPhone',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    addAddress(data) { // Add_Address and Edit Address is same method
        return instance({
            url: '/opt/addAddress',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getAddress(data) { // Add_Address and Edit Address is same method
        return instance({
            url: '/opt/getAddress',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    editBankInfo(data) { // editBankInfo and Edit AddBankInfo is same method
        return instance({
            url: '/opt/editBankInfo',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    bindBank(data) { // editBankInfo and Edit AddBankInfo is same method
        return instance({
            //url: '/opt/bindBank',
            url:'/opt/editBankInfo',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },

    RealName(data) {
        return instance({ //use instance instead of photo method
            url: `/opt/real_name`,
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    WithdrawAmount(data) {
        return instance({ //use instance instead of photo method
            url: `/opt/withdraw`,
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },

    UploadImage(data) {
        return instance({ //use instance instead of photo method
            url: `/opt/upload`,
            method: 'post',
            data: data,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // },
            requestBase: '/api',
        })
    },

}