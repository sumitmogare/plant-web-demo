import config from './config'
import * as data from './data'

export default {
	name: "mk-app-jobplan-list",
	version: "1.0.7",
	description: "mk-app-jobplan-list",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-jobplan-list")
	}
}