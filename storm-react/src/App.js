import { Route, BrowserRouter } from 'react-router-dom'
import {useState} from 'react'

import Main from './pages/main.page'
import Login from './pages/login.page'
import Signup from './pages/signup.page'
import VideoPage from './pages/video.page'

function App() {
    const [user, setUser] = useState({
        authed: false,
        userId: "",
        userName: ""
    })
    return (
        <BrowserRouter>
            <div className="App">
                <Route exact path="/" render={() => <Main />}/>
                <Route path="/login" render={(router) => <Login router={router} setUser={setUser} user={user} />} />
                <Route path="/signup" render={(router) => <Signup    router={router}/>} />
                <Route path="/video" render={(router) => <VideoPage router={router}/>} />
            </div>
        </BrowserRouter>
    );
}

export default App;
