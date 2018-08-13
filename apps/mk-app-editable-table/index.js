import config from './config'
import * as data from './data'

export default {
	name: "mk-app-editable-table",
	version: "1.0.7",
	description: "mk-app-editable-table",
	meta: data.getMeta(),
	components: [],
	dependencies:['mk-aar-grid'],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-editable-table")
	}
}