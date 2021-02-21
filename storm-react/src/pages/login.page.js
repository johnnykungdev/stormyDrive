import React, {useState} from 'react'
import classes from './login.module.scss'
import {Redirect} from 'react-router-dom'

import {auth, db} from '../utils/firebase'

import api_url from '../utils/api_url'
import Logo from './logo.png'

async function getUsername(uid) {
    let dbRef = db.collection('user').doc(uid)
    let doc = await dbRef.get()
    let docJson = doc.data()
    let username = docJson['username']
    return username
}

function LoginPage(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUsername] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const login = async (e) => {
        e.preventDefault()
        try {
            const userResult = await auth().signInWithEmailAndPassword(email, password)
            const userName = await getUsername(userResult.user.uid)
            console.log(userResult.user.uid, userName)
            props.setUser({
                authed: true,
                userId: userResult.user.uid,
                userName
            })

        } catch(error) {
            setErrMsg(error.message)
        } 
    }

        const emailChangeHandler = (e) => {
            setEmail(e.target.value)
        }

        const passwordChangeHandler = (e) => {
            setPassword(e.target.value)
        }

        if (props.user.authed) {
            console.log(props.user.userId)
            return <Redirect to="/"/>
        }

        return (
            <div>
                <form>
                    <img src={Logo} id={classes.logo} alt="Stormy Drive Logo" />
                    <h2>Login</h2>
                    <input type="email" value={email} onChange={(e) => emailChangeHandler(e)}/>
                    <input type="password" value={password} onChange={(e) => passwordChangeHandler(e)}/>
                    <button onClick={(e) => login(e)}>login</button>
                    <p id={'error_msg'}>{errMsg}</p>
                </form>
            </div>
        )

}

    export default LoginPage