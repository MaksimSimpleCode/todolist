import TodoList from '../components/TodoList';
import useTodoState from '../hooks/useTodoState';
import TodoForm from '../components/TodoForm';
import LoginForm from '../components/LoginForm';
import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../styles.css';
import { useContext } from 'react';
import { AuthContext } from '../context';
import { fetchToDoList } from '../API/api';


const Todo = () => {
    const { todos, addTodo, deleteTodo, loadTodo, changeTodo } = useTodoState([]);
    const { isAuth, setIsAuth } = useContext(AuthContext)

    const logout = () => {
        var tokenKey = "accessToken"
        sessionStorage.removeItem(tokenKey);

        setIsAuth(false)
        //  localStorage.removeItem('auth')
    }

    useEffect(() => {
       fetchToDoList();

    }, [])

     const fetchToDoList = async () => {
        var tokenKey = "accessToken"
        const token = sessionStorage.getItem(tokenKey);
        const response = await fetch("Todo/GetTodo", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + tokenn
            }
        });

        if (response.status === 401) {
            alert("Не авторизован!")
        }
        if (response.ok === true) {
            const data = await response.json();
            console.log(data);
            loadTodo(data);
        }
        else
            console.log("Status: ", response.status);
    }

    return (
        <div className="App">
            <Typography component="h1" variant="h2">
                Todos
            </Typography>

            <TodoForm
                saveTodo={todoText => {
                    const trimmedText = todoText.trim();

                    if (trimmedText.length > 0) {
                        addTodo(trimmedText);
                    }
                }} />

            <TodoList todos={todos} deleteTodo={deleteTodo} changeTodo={changeTodo} />
            <Button variant="outlined" color="secondary" onClick={logout}> Выйти </Button>
        </div>
    );
};


export default Todo;