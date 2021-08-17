import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    // En el rest vienen el path por jemeplo
    // console.log(rest);
    return (

        // Si esta autenticado redirige a la pagina de inciio para crear los todos, etc.
        // Si no esta autenticado redirige al AuthRouter.js

        // Los props que se envian  al Component {...props} 
        //son por ejemplo: history, location, pathname
        
        <Route {...rest}
            component = {(props) => (
                (isAuthenticated) 
                    ? (<Redirect to="/"/>)
                    : (<Component {...props} /> )
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}