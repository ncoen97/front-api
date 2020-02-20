const sessionReducer = (state = {logged: false}, action) => {
	switch(action.type){
		case 'LOGIN':
			return {
				logged: true,
				token: "asd123"
			}
		case 'LOGOFF':
			return {
				logged: false
			}
		default:
			return false
	}
}
export default sessionReducer