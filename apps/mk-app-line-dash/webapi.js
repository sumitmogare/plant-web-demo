import { fetch } from 'mk-utils';

export default {
	line: {
		getData: () => fetch.post('/v1/line/getData')
	}
}
