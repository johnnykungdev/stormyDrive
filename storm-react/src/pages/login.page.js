import React, { useState } from 'react'
import classes from './login.module.scss'
import { Redirect } from 'react-router-dom'

import { auth } from '../utils/firebase'

import api_url from '../utils/api_url'

function LoginPage(props) {
    // console.log(props)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignedIn, setIsSignedIn] = useState(false)

    const login = async (e) => {
        e.preventDefault()
        try {
            const result = await auth().signInWithEmailAndPassword(email, password)
                .then( user => {
                    setIsSignedIn(true)
                })
                .catch( (err) => {
                    document.getElementById("error_msg").innerText = err.message;
                })
            // console.log(result)

        } catch(e) {

        }


        // console.log(email, password)
        // e.preventDefault()
        // fetch(`${api_url}/user/login`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({email, password})
        // })
        // .then(resp => resp.json())
        // .then(data => {
        //     localStorage.setItem("token", data.stsTokenManager.accessToken)
        //     setIsSignedIn(true)
        // })
        // .catch(error => console.log(error))
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    if (isSignedIn) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <form>
                <h2>Login</h2>
                <input type="email" value={email} onChange={(e) => emailChangeHandler(e)}/>
                <input type="password" value={password} onChange={(e) => passwordChangeHandler(e)}/>
                <button onClick={(e) => login(e)}>login</button>
                <p id={'error_msg'}></p>
            </form>
        </div>
    )
}

export default LoginPage