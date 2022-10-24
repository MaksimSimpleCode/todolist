import { useState } from 'react';

export default initialValue => {
    const [todos, setTodos] = useState(initialValue);

    return {
        todos,
        addTodo: todoText => {
            const newTodo = { content: todoText, isDone: false }
            setTodos([...todos, newTodo]);
        },
        deleteTodo: todoIndex => {
            const newTodos = todos.filter((_, index) => index !== todoIndex);

            setTodos(newTodos);
        },
        changeTodo: todoIndex => {
            const modifiedTodo = todos.filter((_, index) => index === todoIndex)[0];
            modifiedTodo.isDo = !modifiedTodo.isDo
            setTodos([...todos]);
            //Ўлем fetch в базу
        },
        loadTodo: loadingTodos => {
            setTodos(loadingTodos);
        },
    };
};
