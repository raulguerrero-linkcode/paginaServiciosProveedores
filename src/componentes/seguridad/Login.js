import React, { Component } from 'react'
import { Container, Avatar, Typography, TextField, Button, Link } from '@material-ui/core'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { consumerFirebase } from '../../server/index'
import { compose } from 'recompose'
import { iniciarSesion } from '../../session/actions/sesionAction'
import { StateContext } from '../../session/store'

import { openMensajePantalla } from '../../session/actions/snackBarAction'

const style={
    paper: {
        marginTop: 9,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 5,
        backgroundColor: "red"
    },
    form: {
        maxWidth: "100%",
        marginTop : 8
        
    }
}

class Login extends Component {

    static contextType = StateContext

    state = {
        firebase : null,
        usuario : {
            email : '',
            password : ''
        }
    }

    onChange = e => {
        let usuario = Object.assign({} , this.state.usuario)
        usuario[e.target.name] = e.target.value
        this.setState({
            usuario : usuario
        })
    }

    login = async e => {

        e.preventDefault()

        const [ { sesion }, dispatch] = this.context
        const { firebase, usuario } = this.state
        const { email, password } = usuario

        let callback = await iniciarSesion( dispatch, firebase, email, password )

        if (callback.status) {
            this.props.history.push("/listaservicios")
        } else {
            openMensajePantalla(dispatch, {
                open : true,
                mensaje : callback.mensaje.message
            })
        }

        /*const { firebase, usuario } = this.state
        firebase.autenticacion
        .signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(autenticacion => {
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
        })
        */
    }


    static getDerivedStateFromProps(nextProps, prevState){

        if (nextProps.firebase === prevState.firebase) {
            return null
        }

        return {
            firebase : nextProps.firebase
        }

    }

    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variatn="h5">
                        Ingrese su usuario o correo para iniciar
                    </Typography>

                    <form style={style.form}>
                        <TextField 
                            variant="outlined"
                            label="Ingrese el Email registrado"
                            name="email"
                            fullWidth 
                            margin="normal"
                            onChange={this.onChange}
                            value={this.state.usuario.email} />
                        <TextField 
                            variant="outlined"
                            label="Password"
                            type="password"
                            name="password"
                            fullWidth
                            margin="normal"
                            onChange={this.onChange}
                            value={this.state.usuario.password} />

                        <Button 
                            type="submit"
                            onClick={this.login}
                            fullWidth
                            variant="contained"
                            color="primary">
                            Ingresar
                        </Button>
                    </form>

                    <Typography style={{marginTop : 20}}>Si aún no tiene una cuenta, puede crear una  
                    <Link href="/newuser" >
                            aquí
                        </Link>
                    </Typography>

                    <Typography style={{marginTop : 15}} >Si quiere conocer nuestra política de privacidad de click  
                    <Link href="/privacidad" >
                            aquí
                        </Link>
                    </Typography>
                    <Typography style={{marginTop : 15}} >  
                    <Link href="/" >
                            Página principal
                        </Link>
                    </Typography>
                </div>
            </Container>
        );
    }
}


export default compose(consumerFirebase)(Login)