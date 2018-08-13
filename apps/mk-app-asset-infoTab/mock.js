/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initGoods() {
    if (mockData.goodsTypes && mockData.goodsTypes.length > 0)
        return

    mockData.goodsTypes = [{
        id: 1,
        code: '001',
        name: 'House Plant',
        children: [{
            id: 101,
            code: '00101',
            name: 'Press Shop',
            children:[{
                id:1011,
                code: '001011',
                name:'Line 1',
                children:[{
                    id:10111,
                    code:'0010111',
                    name:'Destacker-1'
                },{
                    id:10112,
                    code:'0010112',
                    name:'Destacker-2'
                },{
                    id:10113,
                    code:'0010113',
                    name:'Destacker Robot-1'
                }]
            },{
                id:1012,
                code:'0010112',
                name:'Line 2',
                children:[{
                    id:10121,
                    code:'00101121',
                    name:'Robot-1'
                },{
                    id:10122,
                    code:'00101122',
                    name:'Robot-2'
                },{
                    id:10123,
                    code:'00101123',
                    name:'Robot-3'
                }]
            }]
        }, {
            id: 102,
            code: '00102',
            name: 'Paint Shop',
            children:[{
                id:1021,
                    code:'001021',
                    name:'Paint Robot-1'
                },{
                    id:1022,
                    code:'001022',
                    name:'Paint Robot-2'
                },{
                    id:1023,
                    code:'001023',
                    name:'Paint Robot-3'
            }]
        }]
    }]

    mockData.goods = []

    for (let i = 1; i < 200; i++) {
        mockData.goods.push({
            id: 1000 + i,
            code: 1000 + i + '',
            name: 'Press Shop ' + i,
            type: 101,
            description:'Description ' + i
        })
    }

    for (let i = 1; i < 6; i++) {
        mockData.goods.push({
            id: 2000 + i,
            code: 2000 + i + '',
            name: 'goods 102 ' + i,
            type: 102,
            description:'Description ' + i
        })
    }

    for (let i = 1; i < 10; i++) {
        mockData.goods.push({
            id: 3000 + i,
            code: 3000 + i + '',
            name: 'Line-1 ' + i,
            type: 1011, //103,
            description:'Description ' +i
        })
    }

    for (let i = 1; i < 34; i++) {
        mockData.goods.push({
            id: 4000 + i,
            code: 4000 + i + '',
            name: 'Name 201 ' + i,
            type: 201,
            description:'Description ' + i
        })
    }

    for (let i = 1; i < 8; i++) {
        mockData.goods.push({
            id: 5000 + i,
            code: 5000 + i + '',
            name: 'Line-2 ' + i,
            type: 1012,
            description:'Description ' + i
        })
    }

    for (let i = 1; i < 28; i++) {
        mockData.goods.push({
            id: 6000 + i,
            code: 6000 + i + '',
            name: 'Name 1021 ' + i,
            type: 1021,
            description:'Description ' + i
        })
    }

    for (let i = 1; i < 50; i++) {
        mockData.goods.push({
            id: 7000 + i,
            code: 7000 + i + '',
            name: 'Desktracker 1 ' + i,
            type: 10111,
            description:'Description ' + i
        })
    }
}


fetch.mock('/v1/goods/init', (option) => {
    
    var ret = query(option)
    ret.value.goodsTypes = mockData.goodsTypes
    return ret
})

fetch.mock('/v1/goods/displayData',(option) => {
    if (!option || !option.id)
        return;

    
})

fetch.mock('/v1/goodsType/query', (option) => {
    initGoods()
    return mockData.goodsTypes
})

fetch.mock('/v1/goods/query', (option) => {
    return query(option)
})

function query(option) {
    initGoods()
    const { pagination, filter } = option

    var data = mockData.goods

    if (filter) {
        if (filter.type) {
            data = data.filter(o => {
                return o.type.toString().substr(0, filter.type.toString().length) == filter.type
            })
        }

    }

    var current = pagination.current
    var pageSize = pagination.pageSize
    var start = (current - 1) * pageSize
    var end = current * pageSize

    start = start > data.length - 1 ? 0 : start
    end = start > data.length - 1 ? pageSize : end
    current = start > data.length - 1 ? 1 : current

    var ret = {
        result: true,
        value: {
            pagination: { current, pageSize, total: data.length },
            list: []
        }
    }
    for (let j = start; j < end; j++) {
        if (data[j])
            ret.value.list.push(data[j])
    }

    return ret
}


fetch.mock('/v1/goodsType/del', (option) => {
    const del = (types) => {
        types.forEach((t, index) => {
            if (t.id == option.id) {
                types.splice(index, 1)
                return true
            } else if (t.children) {
                del(t.children)
            }
        })
    }
    del(mockData.goodsTypes)

    return { result: true, value: true }
})


fetch.mock('/v1/goods/del', (option) => {
    option.ids.forEach(id => {
        let index = mockData.goods.findIndex(o => o.id == id)
        
        if (index || index === 0)
            mockData.goods.splice(index, 1)
    })

    return { result: true, value: true }
})

fetch.mock('/v1/goods/delSingle', (option) => {
        let index = mockData.goods.findIndex(o => o.id == option.ids)
        
        if (index || index === 0)
            mockData.goods.splice(index, 1)

    return { result: true, value: true }
})

// fetch.mock('/v1/goodsType/getTypes', (option) => {
//     console.log('reached');
// })