/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData

function initMaintenance() {
    if (!mockData.Maintenance) {
        mockData.Maintenance = []
        for (let i = 0; i < 200; i++) {
            mockData.Maintenance.push({
                id: i,
                name: 'username ' + (i + 1),
                description: 'description '+(i+1),
				freq: 'Test Freq '+(i+1),
				asset:'Asset '+(i+1),
				channel: 'Channel '+(i+1),
				jobPlan: 'Job Plan '+(i+1),
				freqUnits: 'Days',
				freqType: (i%2)==0?'timeBased':'meterBased',
				alertLead:'Alert Lead'
            })
        }
    }
}

function initDepartments() {
    if (!mockData.departments) {
        mockData.departments = []
        for (let i = 0; i < 5; i++) {
            mockData.departments.push({
                id: i,
                code: '00' + (i + 1),
                name: '部门' + (i + 1),
            })
        }
    }
}
fetch.mock('/v1/Maintenance/findById', (option) => {
    initMaintenance()
    console.log(mockData.Maintenance)
    const Maintenance = mockData.Maintenance.find(o => o.id == option.id)
    return {
        result: true,
        value: Maintenance
    }
})

fetch.mock('/v1/Maintenance/create', (option) => {
    initMaintenance()

    const id = mockData.Maintenance.length
    const v = { ...option, id }
    mockData.Maintenance.push(v)

    return { result: true, value: v }
})

fetch.mock('/v1/Maintenance/update', (option) => {
    initMaintenance()
    mockData.Maintenance[option.id] = option
    return { result: true, value: option }
})

fetch.mock('/v1/Maintenance/prev', (option) => {
    initMaintenance()
    if (option.id) {
        const index = option.id - 1 < 0 ? 0 : option.id - 1
        return { result: true, value: mockData.Maintenance[index] }
    }

    return { result: true, value: mockData.Maintenance[mockData.Maintenance.length - 1] }
})

fetch.mock('/v1/Maintenance/next', (option) => {
    initMaintenance()
    if (option.id) {
        const index = option.id + 1 > mockData.Maintenance.length - 1 ? mockData.Maintenance.length - 1 : option.id + 1
        return { result: true, value: mockData.Maintenance[index] }
    }

    return { result: true, value: mockData.Maintenance[mockData.Maintenance.length - 1] }
})

fetch.mock('/v1/department/query', data => {
    initDepartments()

    return { result: true, value: mockData.departments }
})


