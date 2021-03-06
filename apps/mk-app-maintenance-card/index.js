import config from './config'
import * as data from './data'

export default {
	name: "mk-app-maintenance-card",
	version: "1.0.9",
	description: "mk-app-maintenance-card",
	meta: data.getMeta(),
	components: [],
	dependencies: ["mk-aar-form"],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-maintenance-card")
	}
}