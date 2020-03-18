import React from 'react';
import Curso from './Curso'
import Actions from '../actions'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography} from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        background: theme.palette.background.paper
    }
});

class Cursos extends React.Component{

    constructor(){
        super()
        this.state = { cursos: [] }
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8000/cursos', { method: 'GET'}).then(
            result => { return result.json() }
        ).then(data => {
            this.setState({ cursos: data.message })
        })
    }
    handleClick = (e) => {
        this.setState({ [e]: !this.state[e] })
    }

    render(){
        console.log(this.state.cursos)
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            TP API REST!
                        </Typography>
                    </Toolbar>
                </AppBar>

                <List component="nav">
                    {this.state.cursos.map(curso => (
                        <div key={curso._id}>
                            {curso.alumno != null ?  (
                                <div key={curso._id}>
                                    <ListItem button key={curso._id} onClick={this.handleClick.bind(this, curso._id)} >
                                        <ListItemText primary={`Tema: ${curso.tema} - Año: ${curso.anio_de_dictado}
                                         - Duracion: ${curso.duracion}`} />
                                        {this.state[curso._id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse key={this.state.cursos._id} component="li" in={this.state[curso._id]} 
                                    timeout="auto" unmountOnExit>
                                        <List disablePadding>
                                            {curso.alumno.map((alumno) => {
                                                return (
                                                    <ListItem button key={alumno._id} className={classes.nested}>
                                                        <ListItemText key={alumno._id} primary={`DNI: ${alumno.DNI} - Nombre: 
                                                        ${alumno.nombre} - Apellido: ${alumno.apellido}`} />
                                                    </ListItem> 
                                                )
                                            })}
                                        </List>
                                    </Collapse> 
                                </div>
                            ) : ( 
                            <ListItem button onClick={this.handleClick.bind(this, curso._id)} key={curso._id}>
                                <ListItemText primary={curso.tema}/>
                            </ListItem> )}
                        </div> 
                    ))}
                </List>
            </div>
        )
    }
}
Cursos.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    cursos: state.cursos
})

const mapDispatchToProps = dispatch => ({
    addCurso: curso => dispatch(Actions.addCurso(curso)),
    dropCurso: curso => dispatch(Actions.dropCurso(curso)),
    updateCurso: curso => dispatch(Actions.updateCurso(curso))
})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cursos))