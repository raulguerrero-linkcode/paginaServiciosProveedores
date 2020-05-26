import React, { Component } from 'react';
import { Container, Typography, TextField, Avatar, Grid, Button, Link } from '@material-ui/core'
import LockOutLineIcon from '@material-ui/icons/LockOutlined' 
import { compose } from 'recompose'
import { consumerFirebase } from '../../server/index'
import { crearUsuario } from '../../session/actions/sesionAction'
import { StateContext } from '../../session/store'

import { openMensajePantalla }  from '../../session/actions/snackBarAction'

const style = {
    paper : {
        marginTop : 8,
        display : "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar : {
        margin: 8,
        backgroundColor: "#e53935"
    },
    form: {
        width: "100%",
        marginTop: 10
    },
    submit :{
        marginTop: 15,
        marginButtom:20
    }
}

const usuarioInicial = {
    nombre:'',
    apellido:'',
    email:'',
    password:''
}

class RegistrarUsuario extends Component {
    
    static contextType = StateContext

    state = {
        firebase : null,
        usuario: {
            nombre:'',
            apellido:'',
            email:'',
            password:''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.firebase === prevState.firebase) {
            return null
        }

        return {
            firebase : nextProps.firebase
        }
    }

    onChange = e =>{
        let usuario = Object.assign({}, this.state.usuario)
        usuario[e.target.name] = e.target.value
        this.setState ({
            usuario : usuario
        })
       
    }


    registrarUsuario = async e => {
        e.preventDefault()

        const [ { sesion }, dispatch ] = this.context
        const { firebase, usuario } = this.state

        let correosNoValidos = ["gmail","live","msn","outlook","hotmail", "yahoo", "yandex", "mail", "mailo", "aol", "gmx", "me", "care2"
                                ,"zoho", "disroot", "rediffmail", "tutanota", "protonmail", "mailfence", "lockbin", "criptext", "10minutemail"
                                ,"hushmail", "lycos","net-c","openmailbox","qq","seznam","arvixe"]
        
        if (usuario.email.includes("@")) {

            let correo = usuario.email.split("@",2)
            
            if (correosNoValidos.indexOf(correo[1].toLowerCase().split(".",1).toString())>0 ) {
                
                openMensajePantalla(dispatch, {
                    open : true,
                    mensaje : "Favor de indicar un correo corporativo"
                })

            } else {
                
                let callback = await crearUsuario(dispatch, firebase, usuario)

                if (callback.status) {
                    this.props.history.push("/")
                    openMensajePantalla(dispatch, {
                        open : true,
                        mensaje : "Bienvenido"
                    })
                } else {
                    openMensajePantalla(dispatch, {
                        open : true,
                        mensaje : callback.mensaje.message
                    })
                }
                
            }

        }      

        /*
        console.log('Este es el usuario', this.state.usuario)

        const { usuario, firebase } = this.state

        firebase.autenticacion
        .createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(autenticacion =>{
            
            const usuarioDB_ = {
                usuarioid : autenticacion.user.uid,
                email : usuario.email,
                nombre :  usuario.nombre,
                apellido :  usuario.apellido
            }

            firebase.db
            .collection("users")
            .add(usuarioDB_)
            .then(usuarioAfter => {
                console.log("Dato guardado con éxito", usuarioAfter)
                this.props.history.push("/login")
                this.setState({
                    usuario : usuarioInicial
                })
            })
            .catch(error=>{
                console.log("error", error)
            })
        })
        .catch(error => {
            console.log(error)
        })
        */

        
    }

    render() {
        return (
            <Container maxWidth="md">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrarse con nosotros
                    </Typography>
                    <form style={style.form} >
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <TextField name="nombre" onChange={this.onChange} value={this.state.usuario.nombre} fullWidth label="Ingrese su nombre" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="apellido" onChange={this.onChange} value={this.state.usuario.apellido} fullWidth label="Escriba su apellido Paterno" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="email" onChange={this.onChange} value={this.state.usuario.email} fullWidth label="Ingrese su correo electrónico" />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="password" onChange={this.onChange} value={this.state.usuario.password} type="password" fullWidth label="Escriba un password para su cuenta" />
                            </Grid>


                        </Grid>

                        <Grid container justify="center">
                            <Grid item xs={12} md={6}>
                                <Button type="submit" onClick={this.registrarUsuario} variant="contained" fullWidth size="large" color="primary" style={style.submit}>
                                    Registrarse
                                </Button>
                                
                            </Grid>
                        </Grid>

                    </form>
                    <Typography style={{marginTop : 20}}>¿Ya tiene cuenta? 
                    <Link href="/login" >
                            ingrese a nuestro sistema
                        </Link>
                    </Typography>
                </div>
            </Container>
        );
    }
}

export default compose(consumerFirebase) (RegistrarUsuario)