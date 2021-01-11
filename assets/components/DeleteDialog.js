import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function DeleteDialog(props) {

    const hide = () => {
        props.setDeletConfirmationIsShown(false);
    };

    const context = useContext(TodoContext);
    return (
        <Dialog onClose={hide} fullWidth={true} maxWidth='sm' open={props.open}>
            <DialogTitle>Are you sure you wish to delete this task ?</DialogTitle>
            <DialogContent>
                {props.todo.name}
            </DialogContent>
            <DialogActions>
                <Button onClick={hide}>
                    Cancel
                </Button>
                <Button  onClick={() => {
                    context.deleteTodo({id: props.todo.id, name: props.todo.name});
                    hide();
                }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeletConfirmationIsShown: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
}

export default DeleteDialog;