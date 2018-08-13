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

    load = async (pagination, filter = { type: 1 }) => {
        
        const response = await this.webapi.asset.init({ pagination, filter })
        response.filter = filter
        this.injections.reduce('load', response)
    }

    reload = async () => {
        const pagination = this.metaAction.gf('data.pagination').toJS()
        const filter = this.metaAction.gf('data.filter').toJS()
        this.load(pagination, filter)
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

    selectType = (selectedKeys, info) => {
        console.log('selected Keys : ',selectedKeys);
        const pagination = { current: 1, total: 0, pageSize: 20 },
            filter = { type: selectedKeys[0] }
        this.load(pagination, filter)
    }

    loopTreeChildrenInternal = data => {
        if (!data) return null

        return data.map((item) => {
            if (item.children && item.children.length) {
                return {
                    name: item.id,
                    component: 'Tree.TreeNode',
                    key: item.id,
                    title: item.name,
                    children: this.loopTreeChildrenInternal(item.children)
                }
            }

            return {
                name: item.id,
                component: 'Tree.TreeNode',
                key: item.id,
                title: item.name
            }
        })
    }

    loopTreeChildren = data => {
        console.log(data);
        var ret = {
            _isMeta: true,
            value: this.loopTreeChildrenInternal(data)
        }
        /*
        return data.map((item) => {
            if (item.children && item.children.length) {
                return <Tree.TreeNode key={item.id} title={item.name}>{this.loopTreeChildren(item.children)}</Tree.TreeNode>
            }
            return <Tree.TreeNode key={item.id} title={item.name} />
        })*/
        return ret;
    }


    addType = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', 'Please select a category')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: 'Add',
            okText: 'Save',
            cancelText: 'Cancel',
            children: this.metaAction.loadApp('mk-app-asset-hierarchy-type', {
                store: this.component.props.store,
                parentId: type
            })
        })

        if (ret) {
            this.reload()
        }
    }

    modifyType = async () => {
        const type = this.metaAction.gf('data.filter.type')

        if (!type) {
            this.metaAction.toast('error', 'Please select a category')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: 'Edit',
            okText: 'Save',
            cancelText: 'Cancel',
            children: this.metaAction.loadApp('mk-app-asset-hierarchy-type', {
                store: this.component.props.store,
                typeId: type
            })
        })
        if (ret) {
            this.reload()
        }

    }

    delType = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', 'Please select a type')
            return
        }

        const ret = await this.metaAction.modal('confirm', {
            title: 'Delete',
            okText:'Delete',
            cancelText:'Cancel',
            content: 'Are you sure to delete?'
        })

        if (ret) {
            const id = this.metaAction.gf('data.filter.type')
            const response = await this.webapi.assetTree.del({ id })
            this.metaAction.toast('success', 'Successully deleted type')
            const pagination = this.metaAction.gf('data.pagination').toJS()
            this.load(pagination, { type: -1 })

        }
    }

    addDetail = async () => {
        const type = this.metaAction.gf('data.filter.type')
        if (!type) {
            this.metaAction.toast('error', 'Asset Details app not working..')
            return
        }

        const ret = await this.metaAction.modal('show', {
            title: 'Add',
            okText:'Save',
            cancelText:'Cancel',
            children: this.metaAction.loadApp('mk-app-asset-hierarchy-detail', {
                store: this.component.props.store,
                typeId: type
            })
        })

        if (ret) {
            this.reload()
        }


    }

    assetOverview = (...args) => async () => {
        const { rowIndex } = args.pop();
        const row = this.metaAction.gf(`data.list.${rowIndex}`).toJS();
        console.log(row);
        if (!this.config.apps['mk-app-asset-overview']) {
            throw 'Depending on the mk-app-asset-overview app, use the mk clone mk-app-asset-overview command to add'
        }
        this.component.props.setPortalContent &&
            this.component.props.setPortalContent('Overview', 'mk-app-asset-overview', { assetData: row })
    }
    // modifyDetail = (id) => async () => {
    //     const ret = await this.metaAction.modal('show', {
    //         title: 'Edit',
    //         children: this.metaAction.loadApp('mk-app-asset-hierarchy-detail', {
    //             store: this.component.props.store,
    //             id
    //         })
    //     })

    //     if (ret) {
    //         this.reload()
    //     }
    // }

    batchDelDetail = async () => {
        const lst = this.metaAction.gf('data.list')

        if (!lst || lst.size == 0){
            this.metaAction.toast('error', 'Please select the item you want to delete')
            return;
        }

        const selectRows = lst.filter(o => o.get('selected'))

        if (!selectRows || selectRows.size == 0){
            this.metaAction.toast('error', 'Please select the item you want to delete')
            return;
        }

        const ret = await this.metaAction.modal('confirm', {
            title: 'Delete',
            okText:'Delete',
            cancelText:'Cancel',
            content: 'Are you sure to delete the record?'
        })

        if (!ret)
            return

        const ids = selectRows.map(o => o.get('id')).toJS()
        await this.webapi.asset.del({ ids })
        this.metaAction.toast('success', 'Record deleted successfully')
        this.reload()
    }


    editRow = async(...args) => {
        console.log('edit row');
        const { rowIndex } = args.pop();
        const row = this.metaAction.gf(`data.list.${rowIndex}`).toJS();
        console.log(row);

        const ret = await this.metaAction.modal('show', {
            title: 'Edit',
            okText:'Save',
            cancelText:'Cancel',
            children: this.metaAction.loadApp('mk-app-asset-hierarchy-detail', {
                store: this.component.props.store,
                id: row.id
            })
        })

        if (ret) {
            this.reload()
        }
    }

    deleteRow = async(...args) => {
        const { rowIndex } = args.pop();
        const row = this.metaAction.gf(`data.list.${rowIndex}`).toJS();
        console.log(row.id);
        console.log('delete row');

        const ret = await this.metaAction.modal('confirm', {
            title: 'Delete',
            okText:'Delete',
            cancelText:'Cancel',
            content: 'Are you sure to delete the record?'
        })

        if (!ret)
            return

        const ids = row.id;
        await this.webapi.asset.delSingle({ ids });
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

