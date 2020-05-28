import { Route, Redirect } from 'react-router-dom'
import React from 'react'

// Trabajaremos con el statdo de la sesion global
import { useStateValue } from '../../session/store'

// Crear la funcion para hacer la autenticación de la ruta
function RutaAutenticada( { component : Component, autenticadoFirebase, ...rest }){

    const [{ autenticado }, dispatch ] = useStateValue()

    return (
        <Route
            {...rest}
            render={(props) => (autenticado===true || autenticadoFirebase !== null)
            
                ? <Component { ...props} { ...rest} />
            : <Redirect to="/listaservicios" />
            }
             
        />
    )
}

export default RutaAutenticada