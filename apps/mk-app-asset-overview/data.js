export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		direction:'column',
		className: 'mk-app-asset-overview',
		children: [{
			name: 'breadcrumb',
                component: 'Breadcrumb',
                children: [
                    {
                        name: 'home',
                        component: 'Breadcrumb.Item',
                        children: 'Home',
                        href: ""
                    },
                    {
                        name: 'devices',
                        component: 'Breadcrumb.Item',
                        children: 'Devices',
                        href: ""
                    },
                    {
                        name: 'device',
                        component: 'Breadcrumb.Item',
                        children: 'Asset Details'
                    }
				]
			}, {
				name: 'deviceBanner',
				  component: 'Layout',
				  direction: 'row',
				  className: 'mk-app-asset-overview-banner',
				  height: 100,
				  children:[
					  // {
					  //   name: 'avatar',
					  //     component: 'Avatar',
					  //     src: '{{$getDeviceLogo()}}',
					  //     size: 'large',
					  //     className: 'mk-app-adevice-overview-avatar',
					  //     shape: 'square'
					  // },
					  {
						  name: 'device',
						  component: 'Layout',
						  className: 'mk-app-asset-overview-layout',
						  direction: 'column',
						  children:[
							  {
								  name: 'text',
								  component: '::span',
								  children: "Disconnected",
								  className: 'mk-app-asset-overview-footer-label',
							  },{
								  name: 'text',
								  component: '::span',
								  className: 'mk-app-asset-overview-name',
								  children: "{{$getAssetName()}}" //{{data.assetData.assetName}}" // "Test asset"
							  }, {
								  name: 'footer',
								  component: 'Layout',
								  className: 'mk-app-asset-overview-footer',
								  children: [{
									  name: 'label',
									  className: 'mk-app-asset-overview-footer-label',
									  component: '::span',
									  children: 'From:'
								  }, {
									  name: 'value',
									  className: 'mk-app-asset-overview-footer-value',
									  component: '::h2',
									  children: 'Indoor Air Quality'
								  }]
							}]
					}]
			},{
				name: 'tabs',
				component: 'Tabs',
				className: 'mk-app-asset-overview-tabs',
				activeKey: '{{data.tabKey}}',
				onChange: '{{$tabChange}}',
				children: [ {
					name: 'monitor',
					component: 'Tabs.TabPane',
					key: 'monitor',
					tab: 'Monitoring'
				}, {
					name: 'info',
					component: 'Tabs.TabPane',
					key: 'info',
					tab: 'Information'
				},{
					name: 'modifyApp',
					component: 'Tabs.TabPane',
					key: 'modifyApp',
					tab: 'Location'
				}, {
					name: 'traceAction',
					component: 'Tabs.TabPane',
					key: 'traceAction',
					tab: 'Alerts'
				}, {
					name: 'log',
					component: 'Tabs.TabPane',
					key: 'log',
					tab: 'Activity Log'
				}]
			}, {
				name: 'content',
				component: '::div',
				className: 'mk-app-asset-overview-content',
				children: [{
					name: 'log',
					_visible: "{{data.tabKey=='log'}}",
					component: `{{$isExistsApp('mk-app-activity-log')?'AppLoader':'::div'}}`,
					notRender: "{{data.tabKey!='log'}}",
					appName: 'mk-app-activity-log',
					children: 'The mk-app-activity-log application is required to run the website. You can clone the application using [mk clone mk-app-activity-log apps/]',
					_excludeProps: "{{$isExistsApp('mk-app-activity-log')?['_visible','children']:['notRender','appName']}}"
	
				},{
					name: 'monitor',
					component: `{{$isExistsApp('mk-app-adevice-monitor')?'AppLoader':'::div'}}`,
					notRender: "{{data.tabKey!='monitor'}}",
					_visible: "{{data.tabKey=='monitor'}}",
					appName: 'mk-app-adevice-monitor',
					children: 'The mk-app-adevice-monitor application is required to run the website. You can clone the application using [mk clone mk-app-adevice-monitor apps/]',
					_excludeProps: "{{$isExistsApp('mk-app-adevice-monitor')?['_visible','children']:['notRender','appName']}}"
				}, {
					name: 'mockData',
					component: 'JSONTree',
					_visible: "{{data.tabKey=='mockData'}}",
					data: '{{$getMockData()}}'
				}, {
					name: 'info',
					component: `{{$isExistsApp('mk-app-asset-infoTab')?'AppLoader':'::div'}}`,
					notRender: "{{data.tabKey!='info'}}",
					_visible: "{{data.tabKey=='info'}}",
					appName: 'mk-app-asset-infoTab',
					children: 'Test string asdfasdf',
					_excludeProps: "{{$isExistsApp('mk-app-asset-infoTab')?['_visible','children']:['notRender','appName']}}"
				}, {
					name: 'modifyApp',
					_visible: "{{data.tabKey=='modifyApp'}}",
					component: `{{$isExistsApp('mk-app-activity-log')?'AppLoader':'::div'}}`,
					notRender: "{{data.tabKey!='modifyApp'}}",
					appName: 'mk-app-activity-log',
					children: 'The mk-app-activity-log application is required to run the website. You can clone the application using [mk clone mk-app-activity-log apps/]',
					_excludeProps: "{{$isExistsApp('mk-app-activity-log')?['_visible','children']:['notRender','appName']}}"
	
				}, {
					name: 'traceAction',
					component: `{{$isExistsApp('mk-app-trace-action')?'AppLoader':'::div'}}`,
					notRender: "{{data.tabKey!='traceAction'}}",
					_visible: "{{data.tabKey=='traceAction'}}",
					appName: 'mk-app-trace-action',
					children: 'The mk-app-trace-action application is required to run the website. You can clone the application using [mk clone mk-app-trace-action apps/]',
					_excludeProps: "{{$isExistsApp('mk-app-trace-action')?['_visible','children']:['notRender','appName']}}"
				},{
					name: 'metaDesign',
					component: `{{$isExistsApp('mk-app-meta-design')?'AppLoader':'::div'}}`,
					notRender: "{{data.tabKey!='metaDesign'}}",
					_visible: "{{data.tabKey=='metaDesign'}}",
					appName: 'mk-app-meta-design',
					children: 'The mk-app-meta-design application is required to run the website. You can clone the application using [mk clone mk-app-meta-design apps/]',
					_excludeProps: "{{$isExistsApp('mk-app-meta-design')?['_visible','children']:['notRender','appName']}}"
				}]
			}]
		}
	}


export function getInitState() {
	return {
		data: {
			tabKey: 'monitor',
			list: [],
			assetData:{},
			pagination: { current: 1, total: 0, pageSize: 20 },
			filter: {},
			other: {}
		}
	}
}
