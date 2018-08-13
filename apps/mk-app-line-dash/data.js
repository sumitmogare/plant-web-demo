export function getMeta() {
    return {
        name: 'root',
        component: 'Layout',
        direction:'column',
        className: 'mk-app-line-dash',
        children: [{
            name: 'breadcrumb',
	        component: 'Breadcrumb',
            children: [{
				name: 'home',
				component: 'Breadcrumb.Item',
				children: 'Home',
				href: ""
			}, {
				name: 'line',
				component: 'Breadcrumb.Item',
				children: 'Line',
				href: ""
			}]
		}, {
			name: 'overview',
			component: 'Card',
			//width: '100%',
			className: 'mk-app-line-dash-overview',

			children:[{
				name:'overviews',
				component:'Layout',
				direction:'row',
				className:'overview',
				children:[{
					name:'upcoming',
					component:'::div',
					style:{"margin-left":14},
					className:'overviewDiv',
					children:[{
						name:'tesstasdf',
						component:'Layout',
						direction:'row',
						children:[{
							name:'bar',
							component:'::span',
							className:'upcomingBar',
							children:''
						}, {
							name:'upcomingData',
							component:'Layout',
							direction:'column',
							children:[{
								name:'label',
								component:'::div',
								className:'mk-app-line-dash-overview-heading',
								children:'UPCOMING (NEXT 30 DAYS)'
							}, {
								name:'upcommingValue',
								component: '::span',
								className:'overview-value',
								children:'{{data.upcoming}}'
							}]
						}]
					}]
				}, {
					name:'pastDue',
					component:'::div',
					className:'overviewDiv',
					children:[{
						name:'tesstasdf2',
						component:'Layout',
						direction:'row',
						children:[{
							name:'bar',
							component:'::span',
							className:'pastDueBar',
							children:''
						}, {
							name:'pastDueData',
							component:'Layout',
							direction:'column',
							children:[{
								name:'label',
								component:'::div',
								className:'mk-app-line-dash-overview-heading',
								children:'PAST DUE MAINTENENCE'
							}, {
								name:'pastDueValue',
								component: '::span',
								className:'overview-value',
								children:'{{data.pastDue}}'
							}]
						}]
					}]
				}, {
					name:'complete',
					component:'::div',
					className:'overviewDiv',
					children:[{
						name:'tesstasdf3',
						component:'Layout',
						direction:'row',
						children:[{
							name:'bar',
							component:'::span',
							className:'completeBar',
							children:''
						}, {
							name:'completeData',
							component:'Layout',
							direction:'column',
							children:[{
								name:'label',
								component:'::div',
								className:'mk-app-line-dash-overview-heading',
								children:'COMPLETE (PAST 30 DAYS)'
							}, {
								name:'completeValue',
								component: '::span',
								className:'overview-value',
								children:'{{data.complete}}'
							}]
						}]
					}]
				}]
			}]
		}, {
			name: 'content',
			component: 'Layout',
			className: 'mk-app-line-dash-content',
			direction: 'row',
			children: [{
				name: 'scheduleMaintenence',
				//className: 'mainCard',
				component: 'Card',
				style:{width: '50%' },
				title: 'Schedule Maintenence',
				children: '{{$getcomponents(data.list,"schedule")}}'
			}, {
				name: 'conditionMonitoring',
				component: 'Card',
				//className: 'mainCard',
				style:{width: '50%' },
				title: 'Condition Monitoring',
				children: '{{$getcomponents(data.list,"condition")}}'
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			tabKey: 'Maintenence',
			upcoming:34,
			pastDue:25,
			complete:50,
			list: []
		}
	}
}
