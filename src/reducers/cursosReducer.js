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

function dropCursoRequest(curso){
    fetch('http://127.0.0.1:8000/cursos/'+curso._id, { 
        method: 'DELETE',
        headers:{
            'User-Agent': 'PostmanRuntime/7.23.0',
            'Accept': '*/*',
            'Cache-Control': 'no-cache',
            'Postman-Token': 'df451244-cd2c-4b0a-8979-40d49549d471',
            'Host': 'localhost:8000',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Length': '',
            'Connection': 'keep-alive'
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