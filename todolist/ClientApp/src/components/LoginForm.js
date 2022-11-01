import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useInputState from '../hooks/useInputState';
import { AuthContext } from "../context";
import { useContext, useState } from "react";
import { NavLink } from 'react-router-dom';



const LoginForm = ({ saveTodo }) => {

    //const { emailValue, resetEmail, onChangeEmail } = useInputState();
    //const { passwordValue, resetPassword, onChangePassword } = useInputState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuth, setIsAuth } = useContext(AuthContext)


    const login = async (e) => {
        event.preventDefault();
        //TODO сделать нормальную валидацию. Возможно использовать Formik
        if (email === null || password === null || email === '' || password === '') {
            alert("поля не могут быть пустыми")
            return;
        }
        var tokenKey = "accessToken";
        // отправляет запрос и получаем ответ
        const response = await fetch("/User/Login", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if (response.status === 401) {
            alert("Не верный логин или пароль!")
        }
        // если запрос прошел нормально
        if (response.ok === true) {
            // получаем данные
            const data = await response.json();

            // сохраняем в хранилище sessionStorage токен доступа
            sessionStorage.setItem(tokenKey, data.access_token);
            setIsAuth(true);
            //localStorage.setItem('auth', 'true')
        }
        else  // если произошла ошибка, получаем код статуса
            console.log("Status: ", response.status);
    }

    return (
        <div className="App">
            <form onSubmit={login}>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="Email"
                        placeholder="email...."
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="Password"
                        placeholder="password...."
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                    />
                </div>
                <Button variant="contained" type="submit">Login</Button>
                
            </form>
            <div style={{ margin: 10 }}>
                <Button variant="contained" ><NavLink to={"/register"}>Register</NavLink></Button>
            </div>
        </div>
    );
};

export default LoginForm;
