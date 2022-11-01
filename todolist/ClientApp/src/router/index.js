import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import Todo from "../pages/Todo"


export const privateRoutes = [
    { path: '/todo', component: <Todo />, exact: true },
    { path: '/*', component: <Todo />, exact: true },

]

export const publicRoutes = [
    { path: '/login', component: <LoginForm />, exact: true },
    { path: '/register', component: <RegisterForm />, exact: true },
    { path: '/*', component: <LoginForm />, exact: true },

]