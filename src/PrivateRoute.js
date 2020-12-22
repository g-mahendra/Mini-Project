import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";

export default function PrivateRoute({component: Component, ...rest}) {
    const { currentUser} = useAuth();
    return(
        <Route
            {...rest}
            render={prps =>{
                return currentUser ? <Component {...rest}/> : <Redirect to='/signin'/> 
            }}
        >
        </Route>
    );
}