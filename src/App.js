import React, { Component, useState, useEffect  } from 'react'
import Grid from '@material-ui/core/Grid'
import ListaServicios  from './componentes/vistas/ListaServicios'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme/theme'
import AppNavBar from './componentes/layout/AppNavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario'
import Login from './componentes/seguridad/Login'
import { FirebaseContext } from './server'

import { useStateValue } from './session/store'
import { Snackbar } from '@material-ui/core'

import PerfilUsuario from './componentes/seguridad/PerfilUsuario'
// Importar el nuevo componente de Ruta autenticada
import RutaAutenticada from './componentes/seguridad/RutaAutenticada'

import privacidad from './componentes/vistas/privacidad'

import NuevoServicio from './componentes/vistas/NuevoServicio'

import Principal from './componentes/vistas/Principal'


function App(props) {

  let firebase = React.useContext(FirebaseContext)

  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false)

  const [ { openSnackbar }, dispatch ] = useStateValue()


  useEffect(() => {
    firebase.estaIniciado()
    .then(val => {
        setupFirebaseInicial(val)
      })
  })
  
  

  return autenticacionIniciada !== false ? (
    <React.Fragment>
      <Snackbar
        anchorOrigin = {{vertical:"bottom", horizontal: "center"}}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby" : "message-id"
        }}
        message={
          <span id="messaqge-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose = {()=>
          dispatch({
            type : "OPEN_SNACKBAR",
            openMensaje : {
              open : false,
              mensaje : ""
            }
          })
        }
        ></Snackbar>
      <Router>
          <MuiThemeProvider theme = {theme}>
            <AppNavBar />
            <Grid container>
              <Switch>
                
                <RutaAutenticada exact path="/perfil" autenticadoFirebase={firebase.auth.currentUser} component={PerfilUsuario} />
                <RutaAutenticada exact path="/listaservicios" autenticadoFirebase={firebase.auth.currentUser} component={ListaServicios} />
                <RutaAutenticada exact path="/nuevoservicio" autenticadoFirebase={firebase.auth.currentUser} component={NuevoServicio} />

                <RutaAutenticada exact path="/" exact component={Principal} />
                <Route path="/newUser/" exact component={RegistrarUsuario}></Route> 
                <Route path="/login/" exact component={Login}></Route> 
                <Route path="/privacidad/" exact component={privacidad}></Route> 
              </Switch>
            </Grid>
            

          </MuiThemeProvider>
      </Router>
    </React.Fragment>
  )
  :null
}


export default App;
