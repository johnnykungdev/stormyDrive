import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function privateRoute(props) {
    console.log(props)
    return <Route exact path={props.path} render={() => {
        if(props.authed) {
            return props.children
        } else {
            console.log("you are not permitted")
            return <Redirect to="/login"/>
        }
    }}/>
}

export default privateRoute