import React, { useState } from 'react'

import api_url from '../utils/api_url'

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    console.log("login")
    const login = () => {
        fetch(`${api_url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        .then(resp => resp.json())
        .then(data => localStorage.setItem(data.to))
        .catch(error => console.log(error))
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div>
            <form>
                <input type="email" value={email} onChange={(e) => emailChangeHandler(e)}/>
                <input type="password" value={password} onChange={(e) => passwordChangeHandler(e)}/>
                <button>login</button>
            </form>
        </div>
    )
}

export default LoginPage