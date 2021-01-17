import React from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from './contexts/TodoContext';
import AppSnackbar from './components/AppSnackbar';
import TodoTable from './components/TodoTable';
import { CssBaseline } from '@material-ui/core';

class App extends React.Component {
    render () {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodoTable/>
                    <AppSnackbar/>
                </CssBaseline>                
            </TodoContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));