import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import Actions from '../actions'

const dropSomething = (props) => {
    if(props.type.localeCompare('curso')){
        //es un alumno
        console.log('Delete alumno')
    }
    else{
        //es un curso
        const cursoADropear = props.cursos.find( curso => curso._id === props.cursoId)
        props.dropCurso(cursoADropear)
    }
}

const MyDeleteButton = (props) => {
    return (
        <IconButton aria-label="delete" onClick={() => dropSomething(props)}>
            <DeleteIcon />
        </IconButton>
    )
}

const mapStateToProps = state => {
    return{
        cursos: state.cursosReducer.cursos
    }
}

const mapDispatchToProps = dispatch => ({
    dropCurso: curso => dispatch(Actions.dropCurso(curso)),
    updateCurso: curso => dispatch(Actions.updateCurso(curso))
})

export default connect(mapStateToProps,mapDispatchToProps)(MyDeleteButton)