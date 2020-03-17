const initialState = {
	currentUser: {}
  }
  
const formReducer = (state = initialState, action) => {
	switch(action.type){
		case 'LOGIN':
			return {
				...state, currentUser: action.payload
			}
		case 'LOGOUT':
			return {...state, currentUser: {} }
		default:
			return state
	}
}
export default formReducer