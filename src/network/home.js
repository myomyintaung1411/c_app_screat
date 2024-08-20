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
    getNotice(data) {
        return instance({
            url: '/opt/getNotice',
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