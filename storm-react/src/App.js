import { Route, BrowserRouter } from 'react-router-dom'
import {useState} from 'react'
import PrivateRoute from './components/PrivateRoute/privateRoute'

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
                <Route path="/login" render={(router) => <Login router={router} setUser={setUser} user={user} />} />
                <Route path="/signup" render={(router) => <Signup router={router}/>} />

                <PrivateRoute authed={user.authed} path="/video">
                    <Route path="/video" 
                        render={(router) => <VideoPage router={router} user={user}/>} />
                </PrivateRoute>
                <PrivateRoute exact authed={user.authed} path="/">
                    <Route exact path="/"
                            render={(router) => <Main router={router}/>} />
                </PrivateRoute>
            </div>
        </BrowserRouter>
    );
}

export default App;
