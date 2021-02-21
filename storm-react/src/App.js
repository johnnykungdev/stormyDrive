import { Route, BrowserRouter} from 'react-router-dom'

import Main from './pages/main.page'
import VideoPage from './pages/video.page'
import Login from './pages/login.page'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Route exact path="/" render={() => <Main />}/>
                <Route path="/login" render={(router) => <Login router={router}/>} />
            </div>
        </BrowserRouter>

    );
}

export default App;
