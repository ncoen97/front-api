import React from 'react';
import Curso from './Curso'
import Actions from '../actions'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

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

    render(){
        console.log(this.state.cursos)
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            TP API REST!
                        </Typography>
                    </Toolbar>
                </AppBar>

                <List component="nav" aria-label="main mailbox folders">
                    {this.state.cursos.map(curso => (
                        <div key={curso._id}>
                            <ListItem button key={curso._id}>
                                <ListItemText primary={curso.tema} />
                            </ListItem>
                            <Collapse key={this.state.cursos._id} component="li" timeout="auto" unmountOnExit>
                                <List disablePadding>
                                    {curso.alumno.map((alumno) => {
                                        return (
                                            <ListItem button key={alumno._id}>
                                                <ListItemText key={alumno._id} primary={alumno.dni} />
                                            </ListItem> 
                                        )
                                    })}
                                </List>
                            </Collapse> 
                        </div>
                    ))}
                </List>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    cursos: state.cursos
})

const mapDispatchToProps = dispatch => ({
    addCurso: curso => dispatch(Actions.addCurso(curso)),
    dropCurso: curso => dispatch(Actions.dropCurso(curso)),
    updateCurso: curso => dispatch(Actions.updateCurso(curso))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cursos)