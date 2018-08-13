/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    asset: {
        create: (option) => fetch.post('/v1/asset/create', option),
        update: (option) => fetch.post('/v1/asset/update', option),
        findById1: (id) => fetch.post('/v1/asset/findById1', id),
        getTypes: () => fetch.post('/v1/assetType/getTypes')
    }//,
    // assetTree:{
    //     getParentList: (option) => fetch.post('v1/assetTree/getParentList', option)
    // }
}