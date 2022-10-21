import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import TodoList from './components/TodoList';
import useTodoState from './hooks/useTodoState';
import './styles.css';
import TodoForm from './components/TodoForm';

const App = () => {
    const { todos, addTodo, deleteTodo } = useTodoState([]);


    const testAuth = async () => {
        var tokenKey = "accessToken"
        const token = sessionStorage.getItem(tokenKey);
        const response = await fetch("WeatherForecast/Data", {
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

    const login = async () => {
        var tokenKey = "accessToken";
        // отправляет запрос и получаем ответ
        const response = await fetch("/WeatherForecast/Login", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        });
        if (response.status === 401) {
            alert("Не успешо!")
        }
        // если запрос прошел нормально
        if (response.ok === true) {
            // получаем данные
            const data = await response.json();
            // изменяем содержимое и видимость блоков на странице
            document.getElementById("loginForm").style.display = "none";
            // сохраняем в хранилище sessionStorage токен доступа
            sessionStorage.setItem(tokenKey, data.access_token);
        }
        else  // если произошла ошибка, получаем код статуса
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
            }}
        />

        <TodoList todos={todos} deleteTodo={deleteTodo} />

        <button onClick={testAuth}>Нажми на меня</button>

        <div id="loginForm">
            <h3>Вход на сайт</h3>
            <p>
                <label>Введите email</label><br />
                <input type="email" id="email" />
            </p>
            <p>
                <label>Введите пароль</label><br />
                <input type="password" id="password" />
            </p>
            <input type="submit" onClick={login} id="submitLogin" value="Логин" />
        </div>
    </div>
);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
