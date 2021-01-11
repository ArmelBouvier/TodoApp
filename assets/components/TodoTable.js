import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteDialog from './DeleteDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import React, { Fragment, useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';

function TodoTable() {

    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShown, setDeletConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    return (
        <Fragment>
            <form onSubmit={(event) => {
                context.createTodo(event, { name: addTodo });
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField value={addTodo} onChange={(event) => {
                                    setAddTodo(event.target.value);
                                }} label="New Task" fullWidth={true} />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton type="submit">
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo ' + index}>
                                <TableCell>
                                    {editIsShown === todo.id ?
                                        <TextField
                                            fullWidth={true}
                                            value={editTodo}
                                            onChange={(event) => {
                                                setEditTodo(event.target.value);
                                            }}
                                            InputProps={{
                                                endAdornment:
                                                    <Fragment>
                                                        <IconButton onClick={() => {
                                                            setEditIsShown(false);
                                                        }}><CloseIcon /></IconButton>
                                                        <IconButton onClick={() => {
                                                            context.updateTodo({ id: todo.id, name: editTodo });
                                                            setEditIsShown(false);
                                                        }}><DoneIcon /></IconButton>
                                                    </Fragment>
                                            }}
                                        />
                                        :
                                        todo.name
                                    }
                                </TableCell>
                                <TableCell align="right">

                                    <IconButton onClick={() => { setEditIsShown(todo.id); setEditTodo(todo.name) }}>
                                        <EditIcon/>
                                    </IconButton>

                                    <IconButton onClick={() => {
                                        setDeletConfirmationIsShown(true);
                                        setTodoToBeDeleted(todo);
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
            
            { deleteConfirmationIsShown && (
                <DeleteDialog 
                todo={todoToBeDeleted} 
                open={deleteConfirmationIsShown} 
                setDeletConfirmationIsShown={setDeletConfirmationIsShown}
            />
            )}   

        </Fragment>
    )
}

export default TodoTable;