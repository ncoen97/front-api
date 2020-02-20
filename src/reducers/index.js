import sessionReducer from './session'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
	session: sessionReducer
})

export default allReducers