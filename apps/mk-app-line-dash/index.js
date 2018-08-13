import config from './config';
import * as data from './data';

export default {
	name: 'mk-app-line-dash',
	version: '1.0.7',
	description: 'mk-app-line-dash',
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, 'mk-app-line-dash')
	}
}
