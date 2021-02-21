import React, { useState } from 'react'
import classes from './login.module.scss'
import { Redirect } from 'react-router-dom'
import 'firebase/firestore';
import { auth, db } from '../utils/firebase'

import api_url from '../utils/api_url'

async function saveUserName(username, user_id) {
    const data = {
        user_id: user_id,
        username: username
    }
    console.log()
    try {
        await db.collection('user').doc(user_id).set(data);
        return "success"
    } catch(error) {
        throw new Error(error)
    }


}

function Signup(props) {
    console.log("signup")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const login = async (e) => {
        e.preventDefault()

        try {
            const result = await auth().createUserWithEmailAndPassword( email, password)
            let user = result.user
            console.log(user)
            const saveNameresult = await saveUserName(username, user.uid)
            
            if (saveNameresult === "success") {
                setIsSignedUp(true)
            }
        } catch(err) {
            console.log(e)
            setErrMsg(err.message)
        }
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    const usernameChangeHandler = function(e) {
        setUsername(e.target.value)
    }

    if (isSignedUp) {
        return <Redirect to="login" />
    }

    return (
        <div>
            <form>
                <h2>Sign up</h2>
                <label>Email:</label>
                <input type="email" value={email} placeholder={"Email"} onChange={(e) => emailChangeHandler(e)}/>
                <label>Username</label>
                <input type="text" value={username} placeholder={"Username"} onChange={(e) => usernameChangeHandler(e)}/>
                <label>Password</label>
                <input type="password" value={password} placeholder={"Password"} onChange={(e) => passwordChangeHandler(e)}/>
                <button onClick={(e) => login(e)}>Sign Up</button>
                <div><p id={'error_msg'}>{errMsg}</p></div>
            </form>
        </div>
    )
}

export default Signup