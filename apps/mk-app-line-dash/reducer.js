import { Map, fromJS } from 'immutable';
import { reducer as MetaReducer } from 'mk-meta-engine';
import config from './config';
import { getInitState } from './data';

class reducer {
	constructor(option) {
		this.metaReducer = option.metaReducer;
	}

	init = (state, option) => {
		const initState = getInitState();
		initState.data.list = option;
		return this.metaReducer.init(state, initState);
	}

	load = (state, response) => {
		state = this.metaReducer.sf(state, 'data.list', fromJS(response.list));
		return state;
	}

}

export default function creator(option) {
	const metaReducer = new MetaReducer(option),
		o = new reducer({...option, metaReducer })
	return { ...metaReducer, ...o }
}
