import config from './config'
import * as data from './data'

export default {
	name: "mk-app-user-list-new",
	version: "1.0.7",
	description: "mk-app-user-list-new",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-user-list-new")
	}
}