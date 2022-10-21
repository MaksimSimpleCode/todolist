import React from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from '../hooks/useInputState';

const TodoForm = ({ saveTodo }) => {
    const { value, reset, onChange } = useInputState();

    return (
        <div className="App">
            <form
                onSubmit={event => {
                    event.preventDefault();

                    saveTodo(value);
                    reset();
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Add todo"
                    margin="normal"
                    onChange={onChange}
                    value={value}
                />
            </form>
        </div>
    );
};

export default TodoForm;
