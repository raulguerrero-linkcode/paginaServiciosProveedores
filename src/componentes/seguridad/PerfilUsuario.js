import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../session/store'
import { Container, Avatar, Typography, TextField, Button, Grid } from '@material-ui/core'
import reactFoto from '../../logo.svg'
import { consumerFirebase } from '../../server'
import { openMensajePantalla } from '../../session/actions/snackBarAction'
import ImageUploader from 'react-images-upload'
import uuid from 'react-uuid'


const style = {
    paper : {
        marginTop : 8,
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
    },
    form : {
        width: "100%",
        margintTop :40,
        marginBottom :10
    },
    submit : {
        marginTop : 15,
        marginBottom :20
    },
    avatar : {
        marginTop : 20,
        marginBottom :20
    }

}

const PerfilUsuario = props => {

    const [ { sesion }, dispatch ] = useStateValue()

    const firebase = props.firebase 
    // el useState tiene dos partes, una es para definir los valores
    // y una funcion que nos permitirá cambiar los datos
    let [ estado, cambiarEstado ] = useState({

        nombre : "",
        apellido : "" ,
        email : "",
        telefono : "",
        id : "",
        foto : ""


    })

    const cambiarDato = e => {
        const { name, value } = e.target
        cambiarEstado(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const guardarCambios = e => {
        e.preventDefault()
        firebase.db
        .collection("users")
        .doc(firebase.auth.currentUser.uid)
        .set(estado, {merge :true})
        .then(success => {

            dispatch({
                type : "INICIAR_SESION",
                sesion : estado,
                autenticado : true
            })
            openMensajePantalla(dispatch , {
                open: true,
                mensaje : "Los cambios fueron actualizados"
            })

        })
        .catch( error => {
            openMensajePantalla(dispatch , {
                open : true,
                mensaje : "Errores actualizando su perfil " + error 
            })
        })
    }

    useEffect(() => {

        if (estado.id === "") {
            if (sesion) {
                cambiarEstado(sesion.usuario)
            }   
        }
    })

    const subirFoto = fotos => {
        // Capturar la imagen
        const foto = fotos[0]
        console.log("Obteniendo imagen")
        console.log(foto)
        // Renombrar la imagen
        const claveUnicaFoto = uuid()
        console.log(claveUnicaFoto)
        // Obtener la imagen
        const nombreFoto = foto.name
        // obtener la extensión de la foto()
        const extensionFoto = nombreFoto.split('.').pop()
        // Nuevo nombre de la foto
        const alias = (nombreFoto.split('.')[0] + "_" + claveUnicaFoto + "." + extensionFoto).replace(/\s/g,"_").toLowerCase()

        firebase.guardarDocumento(alias, foto)
        .then(metadata => {
            firebase.devolverDocumento(alias)
                .then(urlFoto=>{
                    estado.foto = urlFoto
                    console.log("Guardando foto")
                    console.log(urlFoto)
                    firebase.db
                        .collection("users")
                        .doc(firebase.auth.currentUser.uid)
                        .set({
                            foto : urlFoto
                        },
                        {merge : true}
                        )
                        .then(userDB => {
                            dispatch({
                                type : "INICIAR_SESION",
                                sesion : estado,
                                autenticado : true
                            })
                        })

                })

        })

    }

    return (sesion ? (
            <Container component="main" maxWidth="md" justify="center">

                <div style={style.paper}>
                    <Avatar style={style.avatar} src={estado.foto || reactFoto} />
                        <Typography component="h1" variant="h5">
                            Perfil de la cuenta
                        </Typography>

                    <form style={style.form}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="nombre"
                                    variant="outlined"
                                    fullWidth
                                    label="nombre"
                                    value={estado.nombre}
                                    onChange={cambiarDato}
                                />
                            </Grid>


                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="apellido"
                                    variant="outlined"
                                    fullWidth
                                    label="apellidos"
                                    value={estado.apellido}
                                    onChange={cambiarDato}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    label="E-mail"
                                    value={estado.email}
                                    disabled
                                    onChange={cambiarDato}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="telefono"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    label="Telefono"
                                    value={estado.telefono}
                                    onChange={cambiarDato}
                                    inputProps={{maxLength :10}}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <ImageUploader
                                    withIcon={false}
                                    key={1000}
                                    singleImage={true}
                                    buttonText="Seleccione su imagen de perfil"
                                    onChange={subirFoto}
                                    imgExtension={[".jpg",".png",".jpeg"]}
                                    maxFileSize={5242880}
                                    />
                            </Grid>

                        </Grid>
                        <Grid container justify="center">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                color="primary"
                                style={style.submit}
                                onClick={guardarCambios}

                                >Actualizar información</Button>
                        </Grid>
                    </form>

                </div>



            </Container>
            )
                : null)




}

export default consumerFirebase(PerfilUsuario)