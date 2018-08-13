/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'
import moment from 'moment'

const mockData = fetch.mockData

function initJobPlans() {
    if (!mockData.jobplans) {
        mockData.jobplans = []
        for (let i = 0; i < 200; i++) {
            mockData.jobplans.push({
                id: i,
                name: 'Job Plan ' + (i + 1),
                description: 'Job Plan Description ' + (100 + i),
                status: 'active'
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

fetch.mock('/v1/jobplan/query', (option) => {
    initJobPlans()
    initDepartments()

    const { pagination, filter } = option

    var data = mockData.jobplans
    if (filter) {
        if (filter.name)
            data = data.filter(o => o.name.indexOf(filter.name) != -1)
        if (filter.sex)
            data = data.filter(o => o.sex == filter.sex)
        if (filter.birthdayRange && filter.birthdayRange.length == 2) {
            data = data.filter(o => moment(o.birthday).isAfter(filter.birthdayRange[0]) && moment(o.birthday).isBefore(filter.birthdayRange[1]))
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

    ret.value.list = ret.value.list.map(o => {
        return {
            ...o,
            department: o.department ? mockData.departments.find(d => d.code == o.department).name : o.department
        }
    })
    return ret
})
