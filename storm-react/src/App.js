import {BrowserRouter, Route} from 'react-router-dom'

import Main from './pages/main.page'
import Login from './pages/login.page'
import Signup from './pages/signup.page'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Route exact path="/" render={() => <Main />}/>
                <Route path="/login" render={(router) => <Login router={router}/>} />
                <Route path="/signup" render={(router) => <Signup router />} />
            </div>
        </BrowserRouter>

    );
}

export default App;
