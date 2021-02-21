import { Route, BrowserRouter } from 'react-router-dom'
import {useState} from 'react'

import Main from './pages/main.page'
import VideoPage from './pages/video.page'
import Login from './pages/login.page'

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
                <Route path="/video" render={(router) => <VideoPage router={router}/>} />
            </div>
        </BrowserRouter>
    );
}

export default App;
