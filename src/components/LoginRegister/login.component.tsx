import { useContext } from "react"
import { useThemeContextLogin } from "../../containers/login.container"

export function Login() {
    const { onClickSignIn, email, setEmail, password, setPassword, onClickLogIn } = useThemeContextLogin()
    return (<div className="login-component">
        <div className="login-header">
            <button className="sign-up-login" onClick={onClickSignIn}>Sign Up</button>
            <button className="log-in-login">Log In</button>
        </div>
        <div className="login-form">
            <label ><b>Email</b></label>
            <input type="email" id="email" value={email} placeholder="Email Adress" className="login-email" onChange={e => { setEmail(e.target.value) }} />
            <label ><b>Password</b></label>
            <input type="password" id="password" value={password} placeholder="Password" className="login-password" onChange={e => { setPassword(e.target.value) }} onKeyDown={(e) => e.key === 'Enter' && onClickLogIn()} />
            <div className="login-button">
                <button onClick={onClickLogIn}>Log In</button>
            </div>
        </div>
    </div>)
}