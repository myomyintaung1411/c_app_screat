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
    bindBank(data) { 
        return instance({
             url: '/opt/bindBank',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getBankInfo(data) {
        return instance({
             url: '/opt/get_bank_info',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },

    RealName(data) {
        return instance({
            url: `/opt/real_name`,
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    EditNickName(data) {
        return instance({
            url: `/opt/edit_nickname`,
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    WithdrawAmount(data) {
        return instance({ 
            url: `/opt/withdraw`,
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    Recharge(data) {
        return instance({ //use instance instead of photo method
            url: `/user/recharge`,
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
    editAvatar(data) {
        return instance({ //use instance instead of photo method
            url: `/opt/editAvatar`,
            method: 'post',
            data: data,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // },
            requestBase: '/api',
        })
    },
  GetRealNameInfo(data) {
    return instance({ //use instance instead of photo method
        url: `/opt/get_realname_info`,
        method: 'post',
        data: data,
        requestBase: '/api',
    })
  },
  getNoReadMsgApi(data) {
    return instance({ //use instance instead of photo method
        url: `/user/getNoReadPersonalMessage`,
        method: 'post',
        data: data,
        requestBase: '/api',
    })
  }
}