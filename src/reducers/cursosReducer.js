const initialState = {
    cursos: []
}

const cursosReducer = (state = initialState, action) => {
    // console.log(state)
    switch(action.type){
        case 'ADDCURSO':
            fetch('http://127.0.0.1:8000/cursos', { 
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers:{
                    'Content-Type': 'application/json'
                  }
            })
            return {
                ...state,
                cursos: [...state.cursos, action.payload]
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