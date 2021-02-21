import React, { useState } from 'react'
import classes from './login.module.scss'
import { Redirect } from 'react-router-dom'

import { auth } from '../utils/firebase'

import api_url from '../utils/api_url'
import { db } from '.'

function LoginPage(props) {
    console.log(props)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault()
        try {
            const result = await auth().signInWithEmailAndPassword(email, password)
            console.log(result.user)
            props.setUser({
                authed: true,
                userId: result.user.uid,
                userName: ""
            })
            await d
        } catch(error) {
            console.log(error)
        }
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    if (props.user.authed) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <form>
                <h2>Login</h2>
                <input type="email" value={email} onChange={(e) => emailChangeHandler(e)}/>
                <input type="password" value={password} onChange={(e) => passwordChangeHandler(e)}/>
                <button onClick={(e) => login(e)}>login</button>
            </form>
        </div>
    )
}

export default LoginPage