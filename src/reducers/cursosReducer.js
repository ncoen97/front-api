const initialState = {
    cursos: []
}

const cursosReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADDCURSO':
            return {
                ...state,
                cursos: action.payload
            }
        case 'DROPCURSO':
            return {
                ...state,
                cursos: action.payload
            }
        case 'UPDATECURSO':
            return {
                ...state,
                cursos: action.payload
            }
        case 'ADDALUMNO':
            return {
                ...state,
                cursos: action.payload
            }
        default:
            return state
    }
}

export default cursosReducer