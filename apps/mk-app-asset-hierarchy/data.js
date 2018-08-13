export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-asset-hierarchy',
		children: [{
			name: 'left',
			component: 'Card',
			className: 'mk-app-asset-hierarchy-left',
			title: 'Asset Hierarchy',
			extra: {
				name: 'header',
				component: '::div',
				children: [{
					name: 'add',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'plus',
					onClick: '{{$addType}}'
				}, {
					name: 'modify',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'edit',
					onClick: '{{$modifyType}}'
				}, {
					name: 'del',
					component: 'Button',
					type: "showy",
					shape: "circle",
					icon: 'close',
					onClick: '{{$delType}}'
				}]

			},
			
			children: [{
				name: 'tree',
				component: 'Tree',
				selectedKeys: `{{[data.filter.type+'']}}`,
				onSelect: '{{$selectType}}',
				children: '{{$loopTreeChildren(data.other.assetTree)}}'
			}]
		}, {
			name: 'content',
			component: 'Card',
			className: 'mk-app-asset-hierarchy-content',
			title: 'Assets',
			extra: {
				name: 'header',
				component: '::div',
				className: 'mk-app-asset-hierarchy-content-header',
				children: [{
					name: 'add',
					component: 'Button',
					type: 'softly',
					children: 'Add Details',
					onClick: '{{$addDetail}}'
				},{
					name: 'batch',
					component: 'Dropdown',
					overlay: {
						name: 'menu',
						component: 'Menu',
						//onClick: '{{$batchDelDetail}}', //batchMenuClick
						children: [{
							name: 'enable',
							component: 'Menu.Item',
							key: 'enable',
							children: 'Enable'
						}, {
							name: 'disable',
							component: 'Menu.Item',
							key: 'disable',
							children: 'Disable'
						}]
					},
					children: {
						name: 'internal',
						component: 'Button',
						type: 'bluesky',
						children: ['Enable', {
							name: 'down',
							component: 'Icon',
							type: 'down'
						}]
					}
					//onClick: '{{$batchDelDetail}}'
				}]
			},
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
					name: 'oprate1',
					component: 'DataGrid.Column',
					columnKey: 'oprate1',
					fixed: true,
					width: 30,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: 'Del'
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
					name: 'oprate',
					component: 'DataGrid.Column',
					columnKey: 'oprate',
					fixed: true,
					width: 30,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: 'Edit'
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
				},
				
				{
					name: 'code',
					component: 'DataGrid.Column',
					columnKey: 'code',
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
						children: {
							name: 'link',
							component: '::a',
							className:'assetOverviewLink',
							value:'{{data.list[_rowIndex].name}}',
							children: '{{data.list[_rowIndex].name}}',
							onClick: '{{$assetOverview()}}'
						},
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
						children: 'Description'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						className:'descriptionCls',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].description}}',
					}
				}]
			}, {
				name: 'footer',
				className: 'mk-app-asset-hierarchy-content-footer',
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
		}]
	}
}


export function getInitState() {
	return {
		data: {
			list: [],
			pagination: { current: 1, total: 0, pageSize: 20 },
			filter: {
				type: 1
			},
			other: {}
		}
	}
}
