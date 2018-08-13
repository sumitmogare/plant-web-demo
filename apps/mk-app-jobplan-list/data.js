export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-jobplan-list',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-jobplan-list-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-jobplan-list-header-left',
				children: ['Job Plan:', {
					name: 'name',
					component: 'Input',
					placeholder: 'Search by job plans',
					value: '{{data.filter.name}}',
					onChange: '{{$nameChange}}'
				},{
					name: 'add',
					component: 'Button',
					type: 'softly',
					children: 'Add'
				}, {
					name: 'batch',
					component: 'Dropdown',
					overlay: {
						name: 'menu',
						component: 'Menu',
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
				}, {
						name: 'clear',
						component: 'Button',
						type: 'softly',
						children: 'Clear',
						onClick: '{{$clearFilter}}'
					}]
			}]
		}, {
			name: 'content',
			className: 'mk-app-jobplan-list-content',
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
					name: 'description',
					component: 'DataGrid.Column',
					columnKey: 'description',
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
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].description}}',
					},
				}, {
					name: 'status',
					component: 'DataGrid.Column',
					columnKey: 'status',
					flexGrow: 1,
					width: 200,
					header: {
						name: 'header',
						component: 'DataGrid.Cell',
						children: 'Status'
					},
					cell: {
						name: 'cell',
						component: 'DataGrid.Cell',
						_power: '({rowIndex})=>rowIndex',
						children: '{{data.list[_rowIndex].status}}',
					},
				}]
			}]
		}, {
			name: 'footer',
			className: 'mk-app-jobplan-list-footer',
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
