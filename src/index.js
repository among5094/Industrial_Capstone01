import React from 'react';
import {BrowserRouter} from "react-router-dom"; /* 리액트 라우터 npm i react-router-dom */
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {UserProvider} from "./pages/auth/UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserProvider>
);
