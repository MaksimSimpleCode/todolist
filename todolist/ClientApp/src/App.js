import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context";
import { useEffect, useState } from "react";
import AppRouter from "./AppRouter";

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
    }, [])



    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
