import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
        this.load()

    }

    load = async () => {
        const response = await this.webapi.bargraph.query()
        this.injections.reduce('load', response)
    }

    getOption = () => {

        const data = this.metaAction.gf('data').toJS()

        return {
            title: {
                text: 'Evaporation and precipitation in a certain area',
                subtext: 'Purely fictitious'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Evaporation', 'Precipitation']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: data.xAxisData
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Evaporationnn',
                    type: 'bar',
                    data: data.seriesData[0],
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Maximum' },
                            { type: 'min', name: 'Minimum' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Average' }
                        ]
                    }
                },
                {
                    name: 'Precipitation',
                    type: 'bar',
                    data: data.seriesData[1],
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Maximum', },
                            { type: 'min', name: 'Minimum', }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: 'Average' }
                        ]
                    }
                }
            ]
        }
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}