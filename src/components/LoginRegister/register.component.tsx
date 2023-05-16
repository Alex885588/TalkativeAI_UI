import { useContext } from "react"
import { useThemeContextRegister } from "../../containers/register.container"

export function Register() {
    const { onClickLogIn, email, setEmail, password, setPassword, onClickSignUp, repeatPassword, setRepeatPassword } = useThemeContextRegister()
    return (<div className="register-component">
        <div className="register-header">
            <button className="sign-up-register">Sign Up</button>
            <button className="log-in-register" onClick={onClickLogIn}>Log In</button>
        </div>
        <div className="registartion-form">
            <label ><b>Email</b></label>
            <input type="email" id="email" placeholder="Email Adress" className="registration-email" value={email} onChange={e => { setEmail(e.target.value) }} />
            <label ><b>Password</b></label>
            <input type="password" id="password" placeholder="Password" className="registration-password" value={password} onChange={e => { setPassword(e.target.value) }} />
            <label ><b>Repeat Password</b></label>
            <input type="password" id="repeatPassword" placeholder="Repeat Password" className="registration-password" value={repeatPassword} onChange={e => { setRepeatPassword(e.target.value) }} onKeyDown={(e) => e.key === 'Enter' && onClickSignUp()} />
            <div className="registration-button">
                <button onClick={onClickSignUp}>Sign Up</button>
            </div>
        </div>
    </div>)
}