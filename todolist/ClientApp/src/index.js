import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


/*const root = ReactDOM.createRoot(document.getElementById('root'));*/
//root.render(
//    <React.StrictMode>
//        <App />
//    </React.StrictMode>
//);


const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
