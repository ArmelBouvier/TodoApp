import React, { createContext } from 'react';

export const TodoContext = createContext();

class TodoContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id: 1, name: 'do something'},
                {id: 2, name: 'do  something else'},
                {id: 3, name: 'do another thing'},
                {id: 4, name: 'do otherwise'},
            ],
        };
    }

    //create
    createTodo(event, todo) {
        event.preventDefault();
        let data = [...this.state.todos];
        data.push(todo);
        this.setState({
            todos: data,
        });
    }

    //read
    readTodo() {
        
    }

    //update
    updateTodo(data) {
        let todos = [...this.state.todos];
        let todo = todos.find(todo => {
           return todo.id === data.id
        });
        todo.name = data.name;
        this.setState({
            todos: todos,
        });
    }

    //delete
    deleteTodo(data) {
        let todos = [...this.state.todos];
        let todo = todos.find(todo => {
            return todo.id === data.id;
        });
        todos.splice(todos.indexOf(todo), 1);
        this.setState({
            todos: todos,
        });
    }

    render () {
        return (
            <div>
                <TodoContext.Provider value={{
                    ...this.state,
                    createTodo: this.createTodo.bind(this),
                    updateTodo: this.updateTodo.bind(this),
                    deleteTodo: this.deleteTodo.bind(this),
                }}>
                    {this.props.children}
                </TodoContext.Provider>
            </div>
        );
    }
}

export default TodoContextProvider;