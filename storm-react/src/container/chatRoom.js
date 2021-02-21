import React, {useEffect, useState} from 'react'
import {db} from '../utils/firebase'

import classes from './chatRoom.module.scss'

function ChatRoom(props) {
    console.log(props)
    const { userName, userId } = props.user
    const [chats, setChats] = useState([])

    const [nickName, setNickName] = useState([])
    const [roomName, setRoomname] = useState("")
    const [readError, setReadError] = useState(null)
    const [inputMessage, setInputMessage] = useState("")

    useEffect(() => {
        async function getNewChat(district) {
            console.log('triggered')
            try {
                const doc = db.collection("district").doc(district).collection("chats").orderBy("timestamp", "asc");

                doc.onSnapshot((docSnapshot) => {
                    let currentChats = []
                    docSnapshot.forEach(msg => {
                        let data = msg.data()
                        console.log(data)
                        currentChats.push(data)
                    })
                    setChats(currentChats)
                });
            } catch (error) {
                console.log(error)
            }
        }

        getNewChat("Vancouver")
    }, [])

    let chatDivs = []
    if (chats) {
        console.log('chats', chats)
        chats.forEach((msg) => {
            if (msg.user_id === userId) {
                chatDivs.push (
                    <div key={msg.timestamp} className={classes.MyMsg}>
                        <p>
                            {msg.message}
                        </p>
                    </div>
                )
            } else {
                chatDivs.push(
                    <div key={msg.timestamp} className={classes.OthersMsg}>
                        <p>
                            {msg.message}
                        </p>
                    </div>
                )
            }
        })
        console.log(chatDivs)
    }

    async function saveChat(e, district, message) {
        e.preventDefault()
        const data = {
            message: message,
            timestamp: new Date().getTime(),
            user_id: userId,
            userName
        }
        const dbRef = db.collection("district").doc(district).collection('chats').doc();

        await dbRef.set(data);
        setInputMessage("")
    }

    let windowHeight = window.innerHeight;
    return (
        <div className={classes.ChatRoom}>
            <div className={classes.Messages} style={{overflowY: "auto"}}>
                {chatDivs}
            </div>
            <div className={classes.InputBar}>
                <input 
                    className={classes.chatInput}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}/>
                <button 
                    className={classes.enterMessage}
                    onClick={(e) => saveChat(e, "Vancouver", inputMessage)}>enter</button>
            </div>
        </div>
    )
}

export default ChatRoom