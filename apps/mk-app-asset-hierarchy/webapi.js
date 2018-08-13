/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'mk-utils'

export default {
    asset: {
        init: (option) => fetch.post('/v1/asset/init', option),
        query: (option) => fetch.post('/v1/asset/query', option),
        del: (option)  => fetch.post('/v1/asset/del', option),
        delSingle: (option)  => fetch.post('/v1/asset/delSingle', option),

    },
    assetTree: {
        del: (option) => fetch.post('/v1/assetTree/del', option)
    }
}