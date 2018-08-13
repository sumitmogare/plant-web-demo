import moment from 'moment'

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-asset-hierarchy-detail',
		children: [{
			name: 'form',
			component: 'Form',
			className: 'mk-app-asset-hierarchy-detail-form',
			children: [/*{
				name: 'codeItem',
				component: 'Form.Item',
				label: 'Code',
				required: true,
				validateStatus: "{{data.other.error.code?'error':'success'}}",
				help: '{{data.other.error.code}}',
				children: [{
					name: 'code',
					component: 'Input',
					value: '{{data.form.code}}',
					onChange: "{{(e)=>$fieldChange('data.form.code',e.target.value)}}"
				}]
			},*/{
				name: 'nameItem',
				component: 'Form.Item',
				label: 'Name',
				required: true,
				validateStatus: "{{data.other.error.name?'error':'success'}}",
				help: '{{data.other.error.name}}',
				children: [{
					name: 'name',
					component: 'Input',
					value: '{{data.form.name}}',
					onChange: "{{(e)=>$fieldChange('data.form.name',e.target.value)}}"
				}]
			}, {
				name: 'nameItem',
				component: 'Form.Item',
				label: 'Description',
				required: true,
				//validateStatus: "{{data.other.error.name?'error':'success'}}",
				//help: '{{data.other.error.name}}',
				children: [{
					name: 'name',
					component: 'Input',
					value: '{{data.form.description}}',
					onChange: "{{(e)=>$fieldChange('data.form.description',e.target.value)}}"
				}]
			}, {
				name: 'codeItem',
				component: 'Form.Item',
				label: 'Asset Code',
				required: true,
				validateStatus: "{{data.other.error.code?'error':'success'}}",
				help: '{{data.other.error.code}}',
				children: [{
					name: 'code',
					component: 'Input',
					value: '{{data.form.code}}',
					onChange: "{{(e)=>$fieldChange('data.form.code',e.target.value)}}"
				}]
			}, {
				name:'location',
				component:'Form.Item',
				label:'Location',
				required:false,
				validateStatus:'{{data.other.error.location?"error":"success"}}',
				help:'{{data.other.error.location}}',
				children:[{
					name:'location',
					component:'Input',
					value:'{{data.form.location}}',
					onChange:"{{(e)=>$fieldChange('data.form.location',e.target.value)}}"
				}]
			}, {
				name:'parent',
				component:'Form.Item',
				label:'Parent',
				required:false,
				children:[{
					name:'parent',
					component:'Select',
					onChange:'{{$selectChange}}',
					children: [{
						name: 'option1',
						component: 'Select.Option',
						value: '0',
						children: 'First Option'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '1',
						children: 'Second Option'
					}]
				}]
			},{
				name: 'nameItem',
				component: 'Form.Item',
				label: 'Type',
				required: true,
				//validateStatus: "{{data.other.error.type?'error':'success'}}",
				//help: '{{data.other.error.type}}',
				children: [{
					name: 'type',
					component: 'Input',
					value: '{{data.form.type}}',
					onChange: "{{(e)=>$fieldChange('data.form.type',e.target.value)}}"
				}]
			}]
		}]
	}
}


export function getInitState() {
	var state = {
		data: {
			form: {
				name: '',
			},
			other: {
				error: {}
			}
		}
	}
	return state
}