import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiAuth } from "../service/api/api.auth";
import { Login } from "../components/LoginRegister/login.component";
import React from "react";
const ThemeContext = React.createContext<any>({})
export const useThemeContextLogin = () => useContext(ThemeContext)
export function LoginCntainer() {
    const navigate = useNavigate()
    const onClickSignIn = () => {
        navigate('/')
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onClickLogIn = async () => {
        const service = new ApiAuth()
        const result = await service.loginUser(email, password)
        if (!result.data) {
            alert('Email or Password is invalid')
            return;
        }
        setEmail('')
        setPassword('')
        navigate('/main')
    }
    return (
        <ThemeContext.Provider value={{ onClickSignIn, email, setEmail, password, setPassword, onClickLogIn }}>
            <Login />
        </ThemeContext.Provider>
    )
}