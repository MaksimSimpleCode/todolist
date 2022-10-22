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

const Todo = () => {
    const { todos, addTodo, deleteTodo, loadTodo } = useTodoState([]);
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const logout = () => {
        var tokenKey = "accessToken"
        sessionStorage.removeItem(tokenKey);

        setIsAuth(false)
      //  localStorage.removeItem('auth')
    }

    useEffect(() => {
         fetchToDoList();
        //При входе на страничку должны загрузить todo пользователя
    }, [])
    const fetchToDoList = async () => {
        var tokenKey = "accessToken"
        const token = sessionStorage.getItem(tokenKey);
        const response = await fetch("User/Todo", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token  
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


    const getData = async () => {
        var tokenKey = "accessToken"
        const token = sessionStorage.getItem(tokenKey);
        const response = await fetch("User/Data", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token  // передача токена в заголовке
            }
        });

        if (response.status === 401) {
            alert("Не авторизован!")
        }
        if (response.ok === true) {
            const data = await response.json();
            alert(data.data);
        }
        else
            console.log("Status: ", response.status);
    };

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
                }}/>

            <TodoList todos={todos} deleteTodo={deleteTodo} />
            <Button variant="outlined" color="secondary" onClick={logout}> Выйти </Button>
            <Button variant="outlined" color="secondary" onClick={getData}> Получить данные </Button>


        </div>
    );
};


export default Todo;