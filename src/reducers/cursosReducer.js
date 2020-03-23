var MongoObjectId = require('bson-objectid')

const initialState = {
    cursos: []
}

function addCursoRequest(curso){
    fetch('http://127.0.0.1:8000/cursos', { 
        method: 'POST',
        body: JSON.stringify(curso),
        headers:{
            'Content-Type': 'application/json'
            }
    })
}

const cursosReducer = function(state = initialState, action){
    // console.log(state)
    switch(action.type){
        case 'GETCURSOS':
            return {
                ...state,
                cursos: action.payload
            }
        case 'ADDCURSO':
            console.log('cursoviejo cursonuevo')
            console.log(action.payload)
            const newCurso = action.payload
            newCurso._id = MongoObjectId().toHexString()
            console.log(newCurso)
            addCursoRequest(newCurso)
            return {
                ...state,
                cursos: [...state.cursos, newCurso]
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