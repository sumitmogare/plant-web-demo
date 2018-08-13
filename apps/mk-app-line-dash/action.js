import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { fromJS, toJS } from 'immutable'
import config from './config'
import moment from 'moment'
import utils from 'mk-utils'

class action {
	constructor(option) {
		this.metaAction = option.metaAction;
		this.config = config.current;
		this.webapi = this.config.webapi;
	}

	onInit = ({ component, injections }) => {
		this.component = component;
		this.injections = injections;
		injections.reduce('init', component.props.lineData);
		this.load();
	}

	load = async () => {
		debugger
		const response = await this.webapi.line.getData();
		this.injections.reduce('load', response);
		console.log(this.metaAction.gf('data.list'));
	}

	getcomponents = (dataList,panel) => { 
        
        if (!dataList || dataList.length == 0)
            return null;
        const ret = this.getNodes(dataList, panel);
        var retData = {
            _isMeta: true,
            value: ret
        }
        return retData;
    }

    getNodes = (data, panel) => {
		var nodes = [];
		debugger
        data.forEach ((node) => {
			console.log(node);
				var node = this.createChannelNodes (node,panel);
            nodes.push(node);
        })
        return nodes;
    }

	createChannelNodes = (nodeData, panel) => {
		var data = null;
		if (panel == 'schedule')
			data = nodeData.schedule;
		else	
			data = nodeData.condition;
		if (data) {

			const percent = this.getPercentage(data.value);
			const msg = {
				msgName: '',
				msgClass: 'warning'
			} // this.getMsgDetails(data.value);

			return {
				name: 'card'+data.channelId,
				component:'::div',
				className: 'cardsTest',
				children:[{
					name:'containerMain'+data.channelId,
					component: 'Layout',
					direction:'column',
					children:[{
						name:'valuesCntr'+data.channelId,
						component:'Layout',
						className:'cardTest-mainContent',
						direction:'row',
						children:[{
							name:'header'+data.channelId,
							component:'::div',
							className:'cardsTest-units',
							children: data.name
						}//, {
							// name:'units'+data.channelId,
							// component: '::div',
							// className:'cardsTest-units',
							// title: data.unit,
							// style: {cursor: 'default'},
							// children: data.symbol
						//}
						, {
							name:'valuectr'+data.channelId,
							component:'::div',
							className: 'cardsTest-mainValue-'+panel,
							children: data.value + ' %' //data.currentvalue
						}]
					}, {
						name:'containerBar'+data.channelId,
						component: 'Layout',
						direction:'column',
						className: msg.msgClass,
						children: [//{
						// 	name:'msg'+data.channelId,
						// 	component:'::span',
						// 	className: msg.msgClass,
						// 	title: msg.msgName,
						// 	style: {cursor: 'default'},
						// 	children: msg.msgName
						// },
						 {
							name: 'progressBar'+ data.channelId,
							component: 'Progress',
							percent: percent,
							showInfo: false
						}]
					}]
				}]
			};
		}
		return null;
	}

	getPercentage = (val) => {
        // var total = max - min;
        // var per = (val / total) * 100;
        // if (per > 100)
        //     per = 100;
		// return per;
		if (val> 100)
			return 98;
		return (val);
    }

    getMsgDetails = (val) => {
        const ret = {};
        // var total = max - min;
        // var per = (val / total) * 100;
        // if (per > 100)
		//     per = 100;
		var per = val;
        if (per>80){
            ret.msgName = 'Danger';
            ret.msgClass = 'error';
        } 
        else if (per > 60){
            ret.msgName = 'Warning';
            ret.msgClass = 'warning';
        }
        else if (per > 40){
            ret.msgName = 'Normal';
            ret.msgClass = 'normal';
        } 
        else if (per > 20){
            ret.msgName = 'Good';
            ret.msgClass = 'good';
        } 
        else {
            ret.msgName = 'Best';
            ret.msgClass = 'success';
        } 
        return ret;
    }

}

export default function creator(option) {
	const metaAction = new MetaAction(option),
		o = new action({ ...option, metaAction }),
		ret = { ...metaAction, ...o }
	metaAction.config({ metaHandlers: ret });

	return ret;
}
