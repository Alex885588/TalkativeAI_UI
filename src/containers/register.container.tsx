import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiAuth } from "../service/api/api.auth";
import { Register } from "../components/LoginRegister/register.component";
import React from "react";
const ThemeContext = React.createContext<any>({})
export const useThemeContextRegister = () => useContext(ThemeContext)
export function RegisterContainer() {
    const navigate = useNavigate()
    const onClickLogIn = () => {
        navigate('/login')
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const onClickSignUp = async () => {
        const service = new ApiAuth()
        const result = await service.registerUser(email, password, repeatPassword)
        if (!result) {
            alert('Invalid Credentials')
            return;
        }
        setEmail('')
        setPassword('')
        navigate("/login");
    }
    return (
        <ThemeContext.Provider value={{ onClickLogIn, email, setEmail, password, setPassword, onClickSignUp, repeatPassword, setRepeatPassword }}>
            <Register />
        </ThemeContext.Provider>
    )
}
