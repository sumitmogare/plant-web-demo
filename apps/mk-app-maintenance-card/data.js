export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-maintenance-card',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-maintenance-card-header',
			_visible: '{{!data.other.isPop}}',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-maintenance-card-header-left',
				children: [{
					name: 'page',
					component: 'Button.Group',
					children: [{
						name: 'prev',
						component: 'Button',
						type: 'softly',
						size: 'small',
						icon: 'left',
						onClick: '{{$prev}}'
					}, {
						name: 'next',
						component: 'Button',
						type: 'softly',
						size: 'small',
						icon: 'right',
						onClick: '{{$next}}'
					}]
				}]
			}, {
				name: 'right',
				component: 'Layout',
				className: 'mk-app-maintenance-card-header-right',
				children: [{
					name: 'add',
					component: 'Button',
					children: 'Add',
					type: 'primary',
					style: { marginRight: 10 },
					onClick: '{{$add}}'
				}, {
					name: 'save',
					component: 'Button',
					children: 'Save',
					type: 'primary',
					style: { marginRight: 10 },
					onClick: '{{$save}}'
				}]
			}]
		}, {
			name: 'form',
			component: 'Form',
			className: 'mk-app-maintenance-card-form',
			children: [{
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
					onChange: `{{(e)=>$fieldChange('data.form.name',e.target.value)}}`,
				}]
			}, {
				name: 'descriptionItem',
				component: 'Form.Item',
				label: 'Description',
				required: true,
				children: [{
					name: 'description',
					component: 'Input',
					value: '{{data.form.description}}'//,
					//onChange: `{{(e)=>$fieldChange('data.form.name',e.target.value)}}`,
					/*component: 'Select',
					showSearch: false,
					value: '{{data.form.sex}}',
					onChange: "{{(v)=>$setField('data.form.sex', v)}}",
					children: [{
						name: 'man',
						component: 'Select.Option',
						value: '0',
						children: '男'
					}, {
						name: 'woman',
						component: 'Select.Option',
						value: '1',
						children: '女'
					}]*/
				}]
			}, {
				name: 'assetItem',
				component: 'Form.Item',
				label: 'Asset',
				required: true,
				//validateStatus: "{{data.other.error.asset?'error':'success'}}",
				//help: '{{data.other.error.asset}}',
				children: [{
					name: 'asset',
					component: 'Select',//'Input.Number',
					showSearch:false,
					value: '{{data.form.asset}}',
					onChange: "{{(v)=>$setField('data.form.asset', v)}}",
					children:[{
						name:'Asset1',
						component:'Select.Option',
						value:'asset1',
						children:'Asset 1'
					},{
						name:'Asset2',
						component:'Select.Option',
						value:'asset2',
						children:'Asset 2'
					},{
						name:'Asset3',
						component:'Select.Option',
						value:'asset3',
						children:'Asset 3'
					}]
				}]
			},{
				name: 'frequencyTypeItem',
				component: 'Form.Item',
				label: 'Frequency Type',

				children: [{
					name: 'frequencyType',
					component: 'Radio.Group',
					value: '{{data.form.freqType}}',
					onChange: "{{(e)=>$sf('data.form.freqType',e.target.value)}}",
					children: [{
						name: 'timeBased',
						value: 'timeBased',
						component: 'Radio.Button',
						className:'mk-input-textarea',
						children: 'Time Based'
					}, {
						name: 'meterBased',
						value: 'meterBased',
						component: 'Radio.Button',
						className:'mk-input-textarea',
						children: 'Meter Based'
					}]
				}]
			}, {
				name: 'channelItem',
				component: 'Form.Item',
				label: 'Channel',
				required: true,
				_visible:'{{data.form.freqType=="meterBased"}}',
				//help: '{{data.other.error.channel}}',
				children: [{
					name: 'channel',
					component: 'Select',//'Input.Number',
					showSearch:false,
					value: '{{data.form.channel}}',
					onChange: "{{(v)=>$setField('data.form.channel', v)}}",
					children:[{
						name:'Channel1',
						component:'Select.Option',
						value:'Channel1',
						children:'Channel 1'
					},{
						name:'Channel2',
						component:'Select.Option',
						value:'Channel2',
						children:'Channel 2'
					}]
				}]
			},{
				name: 'FrequencyItem',
				component: 'Form.Item',
				label: 'Frequency',
				_visible:'{{data.form.freqType=="meterBased"}}',
				required: true,
				children: [{
					name: 'frequency',
					component: 'Input',
					value: '{{data.form.freq}}'
				}]
			}, {
				name: 'FreqDaysItem',
				component: 'Form.Item',
				label: 'Freq (In Days)',
				_visible:'{{data.form.freqType!="meterBased"}}',
				required: true,
				children: [{
					name: 'freqDays',
					component: 'Input',
					value: '{{data.form.freq}}'
				}]
			}, {
				name: 'freqUnitsItem',
				component: 'Form.Item',
				label: 'Freq Units',
				required: true,
				_visible:'{{data.form.freqType!="meterBased"}}',
				//help: '{{data.other.error.channel}}',
				children: [{
					name: 'freqUnits',
					component: 'Select',//'Input.Number',
					showSearch:false,
					value: '{{data.form.freqUnits}}',
					onChange: "{{(v)=>$setField('data.form.freqUnits', v)}}",
					children:[{
						name:'Days',
						component:'Select.Option',
						value:'Days',
						children:'Days'
					},{
						name:'Weeks',
						component:'Select.Option',
						value:'weeks',
						children:'Weeks'
					}]
				}]
			}, {
				name: 'alertLeadItem',
				component: 'Form.Item',
				label: 'Alert Lead(In Days)',
				_visible:'{{data.form.freqType!="meterBased"}}',
				required: true,
				children: [{
					name: 'alertLead',
					component: 'Input',
					value: '{{data.form.alertLead}}'
				}]
			}, {
				name: 'jobPlanItem',
				component: 'Form.Item',
				label: 'Job Plan',
				required: true,
				//_visible:'{{data.form.freqType=="meterBased"}}',
				//help: '{{data.other.error.channel}}',
				children: [{
					name: 'jobPlan',
					component: 'Select',//'Input.Number',
					showSearch:false,
					value: '{{data.form.jobPlan}}',
					onChange: "{{(v)=>$setField('data.form.jobPlan', v)}}",
					children:[{
						name:'JobPlan1',
						component:'Select.Option',
						value:'JobPlan1',
						children:'JobPlan 1'
					},{
						name:'JobPlan2',
						component:'Select.Option',
						value:'JobPlan2',
						children:'JobPlan 2'
					}]
				}]
			}
			/*, 
			
			
			{
				name: 'birthdayItem',
				component: 'Form.Item',
				label: '生日',
				required: true,
				children: [{
					name: 'birthday',
					component: 'DatePicker',
					value: '{{$stringToMoment(data.form.birthday)}}',
					onChange: "{{(v)=>$sf('data.form.birthday', $momentToString(v,'YYYY-MM-DD'))}}",
				}]
			}, {
				name: 'departmentItem',
				component: 'Form.Item',
				label: '部门',
				children: [{
					name: 'department',
					component: 'Select',
					dropdownFooter: {
						name: 'add',
						component: 'Button',
						type: 'primary',
						style: { width: '100%' },
						children: '新增',
						onClick: '{{$addDepartment}}'
					},
					value: '{{data.form.department}}',
					onFocus: '{{$departmentFocus}}',
					onChange: "{{(v)=>$setField('data.form.department', v)}}",
					children: {
						name: 'option',
						component: 'Select.Option',
						value: '{{data.other.departments[_rowIndex].code}}',
						children: '{{data.other.departments[_rowIndex].name}}',
						_power: 'for in data.other.departments'
					}
				}]
			}, {
				name: 'addressItem',
				component: 'Form.Item',
				label: '地址',
				children: [{
					name: 'address',
					component: 'Input',
					value: '{{data.form.address}}',
					onChange: "{{(e)=>$setField('data.form.address',e.target.value)}}"
				}]
			}*/]
		}]
	}
}


export function getInitState(option) {
	var state = {
		data: {
			form: {
				name: '',
				freq: '',
				asset:'',
				channel: '',
				jobPlan: '',
				freqUnits: 'Days',
				freqType: 'timeBased',
				alertLead:'',
				description:''
			},
			other: {
				departments: [],
				error: {}
			}
		}
	}

	state.data.other.isPop = !!option.isPop //是否弹出卡片使用

	return state
}