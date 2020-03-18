import React from 'react';
import Actions from '../actions'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Typography, InputBase, Button} from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types'
import { fade, withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
    button: {
        padding: "30px"
    },
    textField: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          }
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(4),
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200
        }
    }
});

class Cursos extends React.Component{

    constructor(){
        super()
        this.state = { cursos: [], searchFilter: '' }
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

    handleValueChange =  (e) => {
        console.log(e.target.value)
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render(){
        console.log(this.state)
        const { classes } = this.props;
        const cursosFiltrados = this.state.cursos.filter(curso => 
            curso.tema.toLowerCase().includes(this.state.searchFilter.toLowerCase()))
        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            TP API REST!
                        </Typography>
                        <div className={classes.search}>
                            <InputBase
                            placeholder="Tema..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            name="searchFilter"
                            value={this.state.searchFilter}
                            onChange={this.handleValueChange}
                            />
                        </div>
                        <div className={classes.grow} />
                    </Toolbar>
                </AppBar>
                <div className={classes.textField}>
                    <Typography variant="h6">
                        Agregar curso:
                    </Typography>
                    <TextField id="standard-basic" label="Tema" />
                    <TextField id="standard-basic" label="Año" />
                    <TextField id="standard-basic" label="Duracion" />
                    <IconButton >
                        <AddIcon />
                    </IconButton>
                </div>
                <Typography variant="h6">
                    Cursos actuales:
                </Typography>
                <List component="nav">
                    {
                    cursosFiltrados.map(curso => (
                        <div key={curso._id}>
                            {curso.alumno != null ?  (
                                <div key={curso._id}>
                                    <ListItem button key={curso._id} onClick={this.handleClick.bind(this, curso._id)} >
                                        <ListItemText primary={`Tema: ${curso.tema} - Año: ${curso.anio_de_dictado}
                                         - Duracion: ${curso.duracion}h`} />
                                        <ListItemSecondaryAction className={classes.button}>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                        {this.state[curso._id] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse key={this.state.cursos._id} component="li" in={this.state[curso._id]} 
                                    timeout="auto" unmountOnExit>
                                        <List disablePadding>
                                            {curso.alumno.map((alumno) => {
                                                return (
                                                    <ListItem button key={alumno._id} className={classes.nested}>
                                                        <ListItemText key={alumno._id} primary={`- DNI: ${alumno.DNI} - Nombre: 
                                                        ${alumno.nombre} - Apellido: ${alumno.apellido} - Nota: ${alumno.nota}`} />                                                        
                                                        <ListItemSecondaryAction>
                                                            <IconButton aria-label="delete" 
                                                                onClick={() => Actions.dropCurso(curso)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
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