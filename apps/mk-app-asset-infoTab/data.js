export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-asset-infoTab',
		children: [{
			name: 'left',
			component: 'Card',
			className: 'mk-app-asset-infoTab-left',
			title: 'DETAILS',
			extra: {
				name: 'headerRight',
				component: '::div',
			   // className: 'mk-app-adevice-details-widget-header-right',
				children: [{
					name: 'edit',
					component: 'Button',
					type: 'primary',
					children: 'Edit'
				}]
			},
			children: [{
				name: 'device',
				component: 'Layout',
				className: 'mk-app-asset-infoTab-layout',
				direction: 'column',
				// children:[
				// {
				// 	name: 'name',
				// 	component: '::span',
				// 	children:'Name',
				// //	className: 'mk-app-asset-overview-footer-label'
				// }, {
				// 	name: 'name-value',
				// 	component: '::span',
				// //	className: 'mk-app-asset-overview-name',
				// 	children: "{{data.assetData.name}}"
				// }, {
				// 	name: 'code',
				// 	component: '::span',
				// 	children:'Code',
				// //	className: 'mk-app-asset-overview-footer-label'
				// }, {
				// 	name: 'code-value',
				// 	component: '::span',
				// //	className: 'mk-app-asset-overview-name',
				// 	children: "{{data.assetData.code}}"
				// }, {
				// 	name: 'description',
				// 	component: '::span',
				// 	children:'Description',
				// //	className: 'mk-app-asset-overview-footer-label'
				// },{
				// 	name: 'desc-value',
				// 	component: '::span',
				// 	className: 'mk-app-asset-overview-name',
				// 	children: "{{data.assetData.description}}"
				// }]
				
				children: [{
					name: 'title',
					component: '::span',
					className: 'mk-app-adevice-details-widget-top-left-label',
					children: 'Serial #'
				}, {
					name: 'total',
					component: '::h2',
                    className: 'mk-app-adevice-details-widget-top-left-value',
					children: 'f2bc46cb-b9c8-4f1d-9fd9-52d60b328e2d'
				},{
                    name: 'title',
					component: '::span',
					className: 'mk-app-adevice-details-widget-top-left-label',
                    children: 'Exposure'
                }, {
                    name: 'total',
                    component: '::h2',
                    className: 'mk-app-adevice-details-widget-top-left-value',
                    children: '{{data.assetData.name}}'//'{{data.assetData.name}}'//'outdoor'
                },{
                    name: 'domain',
					component: '::span',
					className: 'mk-app-adevice-details-widget-top-left-label',
                    children: 'Disposition'
                }, {
                    name: 'total',
                    component: '::h2',
                    className: 'mk-app-adevice-details-widget-top-left-value',
                    children: '{{data.assetData.description}}'//'fixed'
                },{
                    name: 'domain',
					component: '::span',
					className: 'mk-app-adevice-details-widget-top-left-label',
                    children: 'Domain'
                }, {
                    name: 'total',
                    component: '::h2',
                    className: 'mk-app-adevice-details-widget-top-left-value',
                    children: 'physical'
                },{
                    name: 'elevation',
					component: '::span',
					className: 'mk-app-adevice-details-widget-top-left-label',
                    children: 'Elevation'
                }, {
                    name: 'total',
                    component: '::h2',
                    className: 'mk-app-adevice-details-widget-top-left-value',
                    children: '10'
                },{
                    name: 'latitudeLong',
					component: '::span',
					className: 'mk-app-adevice-details-widget-top-left-label',
                    children: 'Latitude & Longitude'
                }, {
                    name: 'total',
                    component: '::h2',
                    className: 'mk-app-adevice-details-widget-top-left-value',
                    children: '--'
                },{
                    name: 'created',
					component: '::span',
					className: 'mk-app-adevice-details-widget-top-left-label',
                    children: 'Created'
                }, {
                    name: 'total',
                    component: '::h2',
                    className: 'mk-app-adevice-details-widget-top-left-value',
                    children: '7 minutes ago @4:29pm by UserName'
                },{
                    name: 'updated',
					component: '::span',
					className: 'mk-app-adevice-details-widget-top-left-label',
                    children: 'Updated'
                }, {
                    name: 'total',
                    component: '::h2',
                    className: 'mk-app-adevice-details-widget-top-left-value',
                    children: '1 few seconds ago @4:36pm by UserName'
                }]
			}]
		}, {
			name: 'content',
			component: 'Card',
			className: 'mk-app-asset-infoTab-content',
			title: 'TIMELINE',
			// children: [{
			// 	name: 'timeline',
			// 	component: '::div',
            //     children:'Test timeline'
			// }]
			children: [{
				name: 'history',
				component: 'Timeline',
				className:'mk-app-asset-infoTab-content-timeline',
				children: [{
					name: 'versionItem',
					component: 'Timeline.Item',
					color: 'green',
					children: 'Created the device 5 days ago @4:29pm by UserName'
				}, {
					name: 'versionItem',
					component: 'Timeline.Item',
					color: 'green',
					children: 'Associated the device to Macdonalds 2 days ago @9:15am by UserName'
				},{
					name: 'versionItem',
					component: 'Timeline.Item',
					color: 'green',
					dot: {
					   name: 'icon',
						component: 'Icon',
						showStyle: 'showy',
						type: 'check-circle'
					},
					children: 'Activated the device 1 day ago @9:00am'
				},{
					name: 'versionItem',
					component: 'Timeline.Item',
					children: 'Device Online since 1 day ago @9:00am',
					dot: {
						name: 'badge',
						component: 'Badge',
						status: 'processing',
						className: 'mk-app-adevice-details-widget-badge-status-text'
					}
				}]
			}]
		}]
	}
}


export function getInitState() {
	return {
		data: {
			list: [],
			assetData:{},
			pagination: { current: 1, total: 0, pageSize: 20 },
			filter: {
				type: 1
			},
			other: {}
		}
	}
}

