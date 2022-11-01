import { useState } from 'react';

export default initialValue => {
    const [todos, setTodos] = useState(initialValue);

    return {
        todos,
        addTodo: todoText => {
            const newTodo = { content: todoText, isDone: false }
            createTodo(newTodo)
                .then(function (value) {
                    newTodo.id = value;
                    setTodos([...todos, newTodo]);
                }).catch();
            
        },
        deleteTodo: todoId => {
            deleteTodo(todoId).then(function (deletedId) {
                const newTodos = todos.filter(todo => todo.id !== todoId);
                setTodos(newTodos);
            }).catch();
            
        },
        changeTodo: todoIndex => {
            const modifiedTodo = todos.filter((_, index) => index === todoIndex)[0];
            modifiedTodo.isDone = !modifiedTodo.isDone
            changeTodo(modifiedTodo);
            setTodos([...todos]);
        },
        loadTodo: loadingTodos => {
            setTodos(loadingTodos);
        },
    };
};


const deleteTodo = async (id) => {
    var tokenKey = "accessToken"
    const token = sessionStorage.getItem(tokenKey);
    const response = await fetch("Todo/Delete", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            id: id,
        })
    });

    if (response.status === 401) {
        alert("Не авторизован!")
    }
    if (response.ok === true) {
        const id = await response.json();
        return id;
    }
    else
        console.log("Status: ", response.status);
}

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

const createTodo = async (newTodo) => {
    var tokenKey = "accessToken"
    const token = sessionStorage.getItem(tokenKey);
    const response = await fetch("Todo/Create", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            Content: newTodo.content,
            isDone: newTodo.isDone
        })
    });

    if (response.status === 401) {
        alert("Не авторизован!")
    }
    if (response.ok === true) {
        const id = await response.json();
        return id;
    }
    else
        console.log("Status: ", response.status);
}