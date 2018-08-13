import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { fromJS } from 'immutable'
import config from './config'
import moment from 'moment'

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

        const pagination = this.metaAction.gf('data.pagination').toJS()
        this.load(pagination)
    }

    load = async (pagination, filter = {}) => {
        const response = await this.webapi.MaintainanceList.query({ pagination, filter })
        response.filter = filter
        this.injections.reduce('load', response)
    }

    getListRowsCount = () => {
        return this.metaAction.gf('data.list').size
    }

    isSelectAll = () => {
        const lst = this.metaAction.gf('data.list')
        if (!lst || lst.size == 0)
            return false

        return lst.every(o => o.get('selected'))
    }

    selectAll = (e) => {
        this.injections.reduce('selectAll', e.target.checked)
    }

    pageChanged = (current, pageSize) => {
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load({ current, pageSize }, filter)
    }

    nameChange = (e) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.name = e.target.value
        this.load(pagination, filter)
    }

    sexChange = (v) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.sex = v
        this.load(pagination, filter)
    }

    getBirthdayRange = () => {
        const birthdayRange = this.metaAction.gf('data.filter.birthdayRange')
        if (birthdayRange) {
            return birthdayRange.toJS()
        }
    }

    birthdayRangeChange = (dates) => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        filter.birthdayRange = dates
        this.load(pagination, filter)
    }

    clearFilter = () => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = {}
        this.load(pagination, filter)
    }

    enableMaintenance=()=>{
        alert('Enable maintenance for selected records');
    }

    refresh = () => {
        const pagination = this.metaAction.gf('data.pagination').toJS(),
            filter = this.metaAction.gf('data.filter').toJS()

        this.load(pagination, filter)
    }

    editRow = async (...args) => {
        const { rowIndex } = args.pop()
        const row = this.metaAction.gf(`data.list.${rowIndex}`).toJS()
        
        if(!this.config.apps['mk-app-maintenance-card']){
            throw '依赖mk-app-maintenance-card app,请使用mk clone mk-app-maintenance-card命令添加'
        }
        const ret = await this.metaAction.modal('show', {
            title: 'Edit Perventive Maintenance',
            okText: 'Save',
            cancelText: 'Cancel',
            children: this.metaAction.loadApp('mk-app-maintenance-card?from=list', {
                store: this.component.props.store,
                maintenanceId: row.id,
                isPop:true
            })
        })

        if (ret) {
            this.refresh()
        }
    }

    reload = async () => {
        const pagination = this.metaAction.gf('data.pagination').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(pagination, filter)
    }

    deleteRow=async(...args)=>{
        
        const { rowIndex } = args.pop();
        const row = this.metaAction.gf(`data.list.${rowIndex}`).toJS();
        console.log(row.id);

       // const response = await this.webapi.MaintainanceList.deleteRec(row.id);
       const ret = await this.metaAction.modal('confirm', {
            title: 'Delete',
            okText:'Delete',
            cancelText:'Cancel',
            content: 'Are you sure to delete the record?'
        })

        if (!ret)
            return
        var id = row.id;
        await this.webapi.MaintainanceList.deleteRec({id});
        //await this.webapi.goods.delSingle({ ids });
        this.metaAction.toast('success', 'Record deleted successfully');
        this.reload();


    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}