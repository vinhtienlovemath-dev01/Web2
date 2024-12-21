import React, { useState } from "react";
import './LoginRegister.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'


const LoginRegister = () => {

    const [action,setAction] = useState("Login");

    return ( 
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="username" placeholder="Name"/>
                </div>

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email ID"/>
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password"/>
                </div>
            

            </div>

            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            

            <div className="submit-container" >
                <div className={action==="Login"?"sumnit grap":"submit"}>Sign Up</div>
                <div className={action==="Sign Up"?"sumnit grap":"submit"}>Login</div>

            </div>


        </div>
    )
}

export default LoginRegister