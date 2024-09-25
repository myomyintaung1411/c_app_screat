import instance from './index.js'

export default {
    getHomePageRotograph(data) {
        return instance({
            url: '/opt/getHomePageRotograph',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    // getHomePageImgList(data) {
    //     return instance({
    //         url: '/opt/getHomePageImgList',
    //         method: 'post',
    //         data: data,
    //         requestBase: '/api',
    //     })
    // },
    getHomePageArticle(data) {
        return instance({
            url: '/opt/getHomePageArticle',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getHomePageArticleList(data) {
        return instance({
            url: '/opt/getHomePageArticleList',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getTaskContentApi(data) {
        return instance({
            url: '/opt/getTaskContent',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getNotice(data) {
        return instance({
            url: '/opt/getNotice',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    setPersonalMessage(data) {
        return instance({
            url: '/opt/setPersonalMessage',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getPersonalMessage(data) {
        return instance({
            url: '/opt/getPersonalMessage',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getQuestion(data) {
        return instance({
            url: '/opt/get_question',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getAnswer(data) {
        return instance({
            url: '/opt/answer',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    postComment(data) {
        return instance({
            url: '/opt/comment',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getComment(data) {
        return instance({
            url: '/opt/get_comment',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getuploadTaskCertificate(data) {
        return instance({
            url: '/opt/uploadTaskCertificate',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getRedpack(data) {
        return instance({
            url: '/opt/getRedpack',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getRedpackRecord(data) {
        return instance({
            url: '/opt/getRedpackRecord',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getTeamMemberNumber(data) {
        return instance({
            url: '/opt/getTeamMemberNumber',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
    getTeamMemberDetail(data) {
        return instance({
            url: '/opt/getTeamMemberDetail',
            method: 'post',
            data: data,
            requestBase: '/api',
        })
    },
}