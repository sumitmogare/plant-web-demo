import config from './config'
import * as data from './data'

export default {
	name: "mk-app-asset-overview",
	version: "1.0.7",
	description: "mk-app-asset-overview",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-asset-overview")
	}
}