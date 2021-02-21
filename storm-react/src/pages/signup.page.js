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

    await db.collection('user').doc(user_id).set(data);

}

function LoginPage(props) {
    // console.log(props)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isSignedUp, setIsSignedUp] = useState(false)

    const login = async (e) => {
        e.preventDefault()

        try {
            const result = await auth().createUserWithEmailAndPassword( email, password)
                .then( (userCred) => {
                    let user = userCred.user;
                    console.log("success");
                    setIsSignedUp(true)
                    saveUserName(username, user.uid)
                        .then()
                        .catch( (err) => {
                            console.log(err.message);
                        });
                }).catch( (err) => {
                    console.log("failed")
                    document.getElementById('error_msg').innerText = err.message;
                    console.log(err.message)
                })


        } catch(e) {
            console.log(e)
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
    const usernameChangeHandler = function(e) {
        setUsername(e.target.value)
    }

    if (isSignedUp) {
        // console.log(isSignedUp)
        return <Redirect to="/login" />
    }

    return (
        <div>
            <form>
                <h2>Login</h2>
                <label>Email   :</label>
                <input type="email" value={email} placeholder={"Email"} onChange={(e) => emailChangeHandler(e)}/>
                <label>Username</label>
                <input type="text" value={username} placeholder={"Username"} onChange={(e) => usernameChangeHandler(e)}/>
                <label>Password</label>
                <input type="password" value={password} placeholder={"Password"} onChange={(e) => passwordChangeHandler(e)}/>
                <button onClick={(e) => login(e)}>Sign Up</button>
                <div><p id={'error_msg'}></p></div>
            </form>
        </div>
    )
}

export default LoginPage