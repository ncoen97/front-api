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

function updateCursoRequest(curso){
    fetch('http://127.0.0.1:8000/cursos/' + curso._id, { 
        method: 'PUT',
        body: JSON.stringify(curso),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

function dropCursoRequest(curso){
    fetch('http://127.0.0.1:8000/cursos/' + curso._id, { 
        method: 'DELETE'
    })
}

const cursosReducer = function(state = initialState, action){
    switch(action.type){
        case 'GETCURSOS':
            return {
                ...state,
                cursos: action.payload
            }
        case 'ADDCURSO':
            const newCurso = action.payload
            newCurso._id = MongoObjectId().toHexString()
            console.log(newCurso)
            addCursoRequest(newCurso)
            return {
                ...state,
                cursos: [...state.cursos, newCurso]
            }
        case 'DROPCURSO':
            dropCursoRequest(action.payload)
            return {
                ...state,
                cursos: state.cursos.filter(c => c._id !== action.payload._id)
            }
        case 'UPDATECURSO':
            updateCursoRequest(action.payload)
            return {
                ...state,
                cursos: state.cursos.map( curso => {
                    if(curso._id === action.payload._id){
                        return action.payload
                    }
                    else return curso
                })
            }
        default:
            return state
    }
}

export default cursosReducer