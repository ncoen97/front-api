import CursosReducer from './cursosReducer'
import SessionReducer from './session'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
	cursos: CursosReducer,
	sesion: SessionReducer
})

export default allReducers