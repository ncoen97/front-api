import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
const Curso = (props) => (
    <ListItem button>
        <ListItemText primary={`Tema: ${props.data.tema} - Año: ${props.data.anio_de_dictado} - Duracion: ${props.data.duracion}`} />
    </ListItem>
)
export default Curso