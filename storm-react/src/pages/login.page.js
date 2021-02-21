import React, {useState} from 'react'
import classes from './login.module.scss'
import {Redirect} from 'react-router-dom'

import {auth, db} from '../utils/firebase'

import api_url from '../utils/api_url'

async function getUsername(uid, props) {
    let dbRef = db.collection('user').doc(uid)
    let doc = await dbRef.get()
    let docJson = doc.data()
    let username = docJson['username']
    props.setUser({
        userName: username
    })
    return props
}

function LoginPage(props) {
    // console.log(props)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUsername] = useState("")
    const [isSignedIn, setIsSignedIn] = useState(false)

    const login = async (e) => {
        e.preventDefault()
        try {
            await auth().signInWithEmailAndPassword(email, password)
                .then(userCred => {
                    setIsSignedIn(true)
                    let user = userCred.user
                    getUsername(user.uid)
                    setIsSignedIn(true)
                    props.setUser({
                        authed: true,
                        userId: user.uid,
                    })
                })
                .catch((err) => {
                    document.getElementById("error_msg").innerText = err.message;
                });
        } catch (e) {
        }
    }

        const emailChangeHandler = (e) => {
            setEmail(e.target.value)
        }

        const passwordChangeHandler = (e) => {
            setPassword(e.target.value)
        }

        if (isSignedIn) {
            // console.log(props.user.userId)
            // return <Redirect to="/"/>
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