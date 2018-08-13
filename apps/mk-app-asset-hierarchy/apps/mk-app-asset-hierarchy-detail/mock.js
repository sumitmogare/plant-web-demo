/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
//import './apps/mk-app-asset-hierarchy/mock.js';

const mockData = fetch.mockData
console.log('mock data',mockData);
fetch.mock('/v1/asset/create', (option) => {
    
    const id = mockData.asset.length
    const v = { ...option, id }
    mockData.asset.push(v)
    return { result: true, value: v }
})

fetch.mock('/v1/asset/update', (option) => {
    const v = mockData.asset.find(o => o.id == option.id)
    v.code = option.code
    v.name = option.name
    return { result: true, value: v }
})

fetch.mock('/v1/asset/findById1', (id) => {
    const v = mockData.asset.find(o => o.id == id)
   // const parent = findNode(v.parent,mockData.assetTree);
    return { result: true, value: v }
})

function findNode(id, types) {
    for (let t of types) {
        if (t.id == id)
            return t
        else if (t.children) {
            let n = findNode(id, t.children)
            if (n) return n
        }
    }
}

// fetch.mock('v1/assetTree/getParentList', (option) => {
//     debugger
//     const del = (types) => {
//         types.forEach((t, index) => {
//             if (t.id == option.id) {
//                 types.splice(index, 1)
//                 return true
//             } else if (t.children) {
//                 del(t.children)
//             }
//         })
//     }
// })
