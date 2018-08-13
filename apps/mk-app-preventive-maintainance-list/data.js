export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-preventive-maintainance-list',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-preventive-maintainance-list-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-preventive-maintainance-list-header-left',
					children: [ {
						name: 'name',
						component: 'Input',
						placeholder: 'Search for preventive maintenance',
						value: '{{data.filter.name}}',
						onChange: '{{$nameChange}}'
					},{
						name: 'disableMaintenance',
						component:'Checkbox'
					},' :Disable Preventive Maintenance',
					, {
							name: 'clear',
							component: 'Button',
							type: 'softly',
							children: 'Clear',
							onClick: '{{$clearFilter}}'
						},{
							name:'Enable',
							component:'Button',
							type:'softly',
							children:'Enable',
							onClick:'{{$enableMaintenance}}'
						}]
			//	}
			}]
		}, {
			name: 'content',
			className: 'mk-app-preventive-maintainance-list-content',
			component: 'Layout',
			children: [{
				name: 'dataGrid',
				component: 'DataGrid',
				headerHeight: 35,
				rowHeight: 35,
				enableSequence: true,
				startSequence: '{{(data.pagination.current-1)*data.pagination.pageSize + 1}}',
				rowsCount: "{{$getListRowsCount()}}",
				columns: [{
					name: 'select',
					component: 'DataGrid.Column',
					columnKey: 'select',
					width: 40,
					fixed: true,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: {
							name: 'cb',
							component: 'Checkbox',
							checked: '{{$isSelectAll()}}',
							onChange: '{{$selectAll}}'
						}
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: {
							name: 'checkbox',
							component: 'Checkbox',
							checked: '{{data.list[_rowIndex].selected}}',
							onChange: "{{ (e, option) => $setField('data.list.' + _rowIndex + '.selected', e.target.checked ) }}",
						}
					}
				}, {
					name: 'oprate',
					component: 'DataGrid.Column',
					columnKey: 'oprate',
					fixed: true,
					width: 30,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: ''
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: [{
							name: 'edit',
							component: 'Icon',
							showStyle: 'showy',
							type: 'edit',
							style: {
								fontSize: 18
							},
							title: 'edit',
							onClick: '{{$editRow}}'
						}]
					}
				}, {
					name: 'oprate1',
					component: 'DataGrid.Column',
					columnKey: 'oprate1',
					fixed: true,
					width: 30,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: ''
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: [{
							name: 'delete',
							component: 'Icon',
							showStyle: 'showy',
							type: 'close',
							style: {
								fontSize: 18
							},							
							title: 'Delete',
							onClick: '{{$deleteRow}}'
						}]
					}
				}, {
					name: 'name',
					component: 'DataGrid.Column',
					columnKey: 'name',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: 'Name'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].name}}',
					},
				}, {
					name: 'sex',
					component: 'DataGrid.Column',
					columnKey: 'sex',
					width: 50,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '性别'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: "{{data.list[_rowIndex].sex == 0? '男': '女'}}",
					}
				}, {
					name: 'mobile',
					component: 'DataGrid.Column',
					columnKey: 'mobile',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '手机'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].mobile}}',
					},
				}, {
					name: 'birthday',
					component: 'DataGrid.Column',
					columnKey: 'birthday',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '生日'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].birthday}}',
					},
				}, {
					name: 'department',
					component: 'DataGrid.Column',
					columnKey: 'department',
					flexGrow: 1,
					width: 100,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '部门'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].department}}',
					},
				}, {
					name: 'address',
					component: 'DataGrid.Column',
					columnKey: 'address',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: '地址'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].address}}',
					},
				}]
			}]
		}, {
			name: 'footer',
			className: 'mk-app-preventive-maintainance-list-footer',
			component: 'Layout',
			children: [{
				name: 'pagination',
				component: 'Pagination',
				showSizeChanger: true,
				pageSize: '{{data.pagination.pageSize}}',
				current: '{{data.pagination.current}}',
				total: '{{data.pagination.total}}',
				onChange: '{{$pageChanged}}',
				onShowSizeChange: '{{$pageChanged}}'
			}]
		}]
	}
}

// export function getMeta() {
// 	return {
// 		name: 'root',
// 		component: 'Layout',
// 		className: 'mk-app-preventive-maintainance-list',
// 		children: [{
// 			name: 'header',
// 			component: 'Card',
// 			className: 'mk-app-preventive-maintainance-list-header',
// 			extra: {
// 				name: 'header',
// 				component: '::div',
// 				children: [{
// 					name: 'name',
// 						component: 'Input',
// 						placeholder: 'Search for preventive maintenance',
// 						value: '{{data.filter.name}}',
// 						onChange: '{{$nameChange}}'
// 					},{
// 						name: 'disableMaintenance',
// 						component:'Checkbox'
// 					},' :Disable Preventive Maintenance',
// 					, {
// 							name: 'clear',
// 							component: 'Button',
// 							type: 'softly',
// 							children: 'Clear',
// 							onClick: '{{$clearFilter}}'
// 						},{
// 							name:'Enable',
// 							component:'Button',
// 							type:'softly',
// 							children:'Enable',
// 							onClick:'{{$enableMaintenance}}'
// 				}]
// 			},
// 			children:[{
// 			// 	name: 'content',
// 			// className: 'mk-app-preventive-maintainance-list-content',
// 			// component: 'Layout',
// 			// children: [{
// 				name: 'dataGrid',
// 				component: 'DataGrid',
// 				headerHeight: 35,
// 				rowHeight: 35,
// 				enableSequence: true,
// 				startSequence: '{{(data.pagination.current-1)*data.pagination.pageSize + 1}}',
// 				rowsCount: "{{$getListRowsCount()}}",
// 				columns: [{
// 					name: 'select',
// 					component: 'DataGrid.Column',
// 					columnKey: 'select',
// 					width: 40,
// 					fixed: true,
// 					header: {
// 						name: 'header',
// 						component: 'DataGrid.Cell',
// 						children: {
// 							name: 'cb',
// 							component: 'Checkbox',
// 							checked: '{{$isSelectAll()}}',
// 							onChange: '{{$selectAll}}'
// 						}
// 					},
// 					cell: {
// 						name: 'cell',
// 						component: 'DataGrid.Cell',
// 						_power: '({rowIndex})=>rowIndex',
// 						children: {
// 							name: 'checkbox',
// 							component: 'Checkbox',
// 							checked: '{{data.list[_rowIndex].selected}}',
// 							onChange: "{{ (e, option) => $setField('data.list.' + _rowIndex + '.selected', e.target.checked ) }}",
// 						}
// 					}
// 				}, {
// 					name: 'oprate',
// 					component: 'DataGrid.Column',
// 					columnKey: 'oprate',
// 					fixed: true,
// 					width: 30,
// 					header: {
// 						name: 'header',
// 						component: 'DataGrid.Cell',
// 						children: ''
// 					},
// 					cell: {
// 						name: 'cell',
// 						component: 'DataGrid.Cell',
// 						_power: '({rowIndex})=>rowIndex',
// 						children: [{
// 							name: 'edit',
// 							component: 'Icon',
// 							showStyle: 'showy',
// 							type: 'edit',
// 							style: {
// 								fontSize: 18
// 							},
// 							title: 'edit',
// 							onClick: '{{$editRow}}'
// 						}]
// 					}
// 				}, {
// 					name: 'oprate1',
// 					component: 'DataGrid.Column',
// 					columnKey: 'oprate1',
// 					fixed: true,
// 					width: 30,
// 					header: {
// 						name: 'header',
// 						component: 'DataGrid.Cell',
// 						children: ''
// 					},
// 					cell: {
// 						name: 'cell',
// 						component: 'DataGrid.Cell',
// 						_power: '({rowIndex})=>rowIndex',
// 						children: [{
// 							name: 'delete',
// 							component: 'Icon',
// 							showStyle: 'showy',
// 							type: 'delete',
// 							style: {
// 								fontSize: 18
// 							},							
// 							title: 'Delete',
// 							onClick: '{{$deleteRow}}'
// 						}]
// 					}
// 				}, {
// 					name: 'name',
// 					component: 'DataGrid.Column',
// 					columnKey: 'name',
// 					flexGrow: 1,
// 					width: 200,
// 					header: {
// 						name: 'header',
// 						component: 'DataGrid.Cell',
// 						children: 'Name'
// 					},
// 					cell: {
// 						name: 'cell',
// 						component: 'DataGrid.Cell',
// 						_power: '({rowIndex})=>rowIndex',
// 						children: '{{data.list[_rowIndex].name}}',
// 					},
// 				}, {
// 					name: 'sex',
// 					component: 'DataGrid.Column',
// 					columnKey: 'sex',
// 					width: 50,
// 					header: {
// 						name: 'header',
// 						component: 'DataGrid.Cell',
// 						children: '性别'
// 					},
// 					cell: {
// 						name: 'cell',
// 						component: 'DataGrid.Cell',
// 						_power: '({rowIndex})=>rowIndex',
// 						children: "{{data.list[_rowIndex].sex == 0? '男': '女'}}",
// 					}
// 				}, {
// 					name: 'mobile',
// 					component: 'DataGrid.Column',
// 					columnKey: 'mobile',
// 					flexGrow: 1,
// 					width: 200,
// 					header: {
// 						name: 'header',
// 						component: 'DataGrid.Cell',
// 						children: '手机'
// 					},
// 					cell: {
// 						name: 'cell',
// 						component: 'DataGrid.Cell',
// 						_power: '({rowIndex})=>rowIndex',
// 						children: '{{data.list[_rowIndex].mobile}}',
// 					},
// 				}, {
// 					name: 'birthday',
// 					component: 'DataGrid.Column',
// 					columnKey: 'birthday',
// 					flexGrow: 1,
// 					width: 200,
// 					header: {
// 						name: 'header',
// 						component: 'DataGrid.Cell',
// 						children: '生日'
// 					},
// 					cell: {
// 						name: 'cell',
// 						component: 'DataGrid.Cell',
// 						_power: '({rowIndex})=>rowIndex',
// 						children: '{{data.list[_rowIndex].birthday}}',
// 					},
// 				}, {
// 					name: 'department',
// 					component: 'DataGrid.Column',
// 					columnKey: 'department',
// 					flexGrow: 1,
// 					width: 100,
// 					header: {
// 						name: 'header',
// 						component: 'DataGrid.Cell',
// 						children: '部门'
// 					},
// 					cell: {
// 						name: 'cell',
// 						component: 'DataGrid.Cell',
// 						_power: '({rowIndex})=>rowIndex',
// 						children: '{{data.list[_rowIndex].department}}',
// 					},
// 				}, {
// 					name: 'address',
// 					component: 'DataGrid.Column',
// 					columnKey: 'address',
// 					flexGrow: 1,
// 					width: 200,
// 					header: {
// 						name: 'header',
// 						component: 'DataGrid.Cell',
// 						children: '地址'
// 					},
// 					cell: {
// 						name: 'cell',
// 						component: 'DataGrid.Cell',
// 						_power: '({rowIndex})=>rowIndex',
// 						children: '{{data.list[_rowIndex].address}}',
// 					},
// 				}]
// 			}]
// 		}, {
// 			name: 'footer',
// 			className: 'mk-app-preventive-maintainance-list-footer',
// 			component: 'Layout',
// 			children: [{
// 				name: 'pagination',
// 				component: 'Pagination',
// 				showSizeChanger: true,
// 				pageSize: '{{data.pagination.pageSize}}',
// 				current: '{{data.pagination.current}}',
// 				total: '{{data.pagination.total}}',
// 				onChange: '{{$pageChanged}}',
// 				onShowSizeChange: '{{$pageChanged}}'
// 			}]
// 		//	}]
// 		}]
// 	}
// }

export function getInitState() {
	return {
		data: {
			list: [],
			pagination: { current: 1, total: 0, pageSize: 20 },
			filter: {},
			other: {}
		}
	}
}
