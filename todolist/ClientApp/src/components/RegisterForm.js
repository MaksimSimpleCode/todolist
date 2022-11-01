import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useInputState from '../hooks/useInputState';
import { AuthContext } from "../context";
import { useContext, useState } from "react";



const RegisterForm = ({ saveTodo }) => {

    //const { emailValue, resetEmail, onChangeEmail } = useInputState();
    //const { passwordValue, resetPassword, onChangePassword } = useInputState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { isAuth, setIsAuth } = useContext(AuthContext)


    const register = async (e) => {
        event.preventDefault();
        //TODO сделать нормальную валидацию. Возможно использовать Formik
        if (email === null || password === null || email === '' || password === '' || name === '' || name === null) {
            alert("поля не могут быть пустыми")
            return;
        }
        var tokenKey = "accessToken";
        // отправляет запрос и получаем ответ
        const response = await fetch("/User/Register", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password
            })
        });
        if (response.status === 401) {
            alert("401")
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
            <form onSubmit={register}>
                <div style={{ margin: 10 }}>
                    <TextField
                        variant="outlined"
                        label="Name"
                        placeholder="name...."
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
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
                <Button variant="contained" type="submit">Register</Button>
            </form>
        </div>
    );
};

export default RegisterForm;
