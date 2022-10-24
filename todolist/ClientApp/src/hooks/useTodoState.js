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
            modifiedTodo.isDone = !modifiedTodo.isDone
            setTodos([...todos]);
            changeTodo(modifiedTodo);
            //Шлем fetch в базу
        },
        loadTodo: loadingTodos => {
            setTodos(loadingTodos);
        },
    };
};

const changeTodo = async (modifiedTodo) => {
    var tokenKey = "accessToken"
    const token = sessionStorage.getItem(tokenKey);
    const response = await fetch("Todo/Change", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            id: modifiedTodo.id,
            Content: modifiedTodo.content,
            isDone: modifiedTodo.isDone
        })
    });

    if (response.status === 401) {
        alert("Не авторизован!")
    }
    if (response.ok === true) {
        const data = await response.json();
    }
    else
        console.log("Status: ", response.status);
}