import cursosReducer from './cursosReducer'
import sessionReducer from './session'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
	cursosReducer,
	sessionReducer
})

export default allReducers