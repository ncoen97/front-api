import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const MyDeleteButton = () => {
    return (
        <IconButton aria-label="delete" onClick={() => console.log('Delete')}>
            <DeleteIcon />
        </IconButton>
    )
}
export default MyDeleteButton