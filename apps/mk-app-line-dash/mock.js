import { fetch } from 'mk-utils';
import moment from 'moment';

const mockData = fetch.mockData;

function initData() {
	if (!mockData.lineData){
		mockData.lineData = [];
		for (let i = 0; i<6; i++) {
			var schedule = {
				id: i+1,
				name: 'Device ' + (i + 1),
				value: 17 * (i + 1),
			};
			var condition = {
				id: i+1,
				name: 'Device ' + (i + 1),
  				value: 17 * (i + 1),
			};
			mockData.lineData.push({
				schedule: schedule,
				condition: condition
			});
		}
	}
}

fetch.mock('/v1/line/getData', () => {
	if (!mockData.lineData || mockData.lineData.length == 0) {
		initData();
	}
	var ret = {
		result: true,
		value: {
			list: mockData.lineData
		}
	}
	return ret;
})

