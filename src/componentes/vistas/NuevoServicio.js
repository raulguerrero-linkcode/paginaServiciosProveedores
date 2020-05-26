import React, { Component } from 'react';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Button, TableRow, Table, TableBody, TableCell } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home'
import { consumerFirebase } from "../../server/index"
import { openMensajePantalla } from '../../session/actions/snackBarAction'

import ImageUploader from 'react-images-upload'

import uuid from 'react-uuid'
import { crearKeyword } from '../../session/actions/Keyword';

const style = {
    container:{
        paddinTop : '8px'

    },
    paper : {
        marginTop : 8,
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'left',
        padding : '20px',
        backgroundColor : '#F5F5F5'
    },
    link:{
        display: 'flex'
    },
    homeIcon:{
        width : 20,
        heigth :20,
        marginRight: '4px'
    },
    submit:{
        marginTop:15,
        marginBottom:10

    },
    foto:{
        height:"100px"
    }
}


class NuevoServicio extends Component {

state = {
    proyectos:{
        proyecto: '',
        descripcion: '',
        detalle: ''

    },
    archivos: []
}

    entraDatoEstado = e => {
        let proyecto_ = Object.assign({}, this.state.proyectos)
        proyecto_[e.target.name] = e.target.value
        this.setState({
            proyectos : proyecto_
        })
    }


    subirFotos = documentos => {

        // const uniquesDocs = Array.from(new Set(documentos))
        
        Object.keys(documentos).forEach(function(key){
            documentos[key].urlTemp = URL.createObjectURL(documentos[key])
            
        })

        this.setState({
            archivos : this.state.archivos.concat(documentos)
        })

    }


    guardarProyecto = () => {

        const { archivos, proyectos  } = this.state
        
        // Crear a cada imagen o archivo un alias
        // Además el alias será almacenado en el Firestore

        Object.keys(archivos).forEach(function(key){
            let valorDinamico = Math.floor(new Date().getTime()/1000)
            let nombre = archivos[key].name

            // Obtener la extensión del archivo
            let extension = nombre.split(".").pop
            
            archivos[key].alias = (nombre.split(".")[0] + "_" + valorDinamico + "." + extension ).replace(/\s/g, "_").toLowerCase()

        })
        
        const textoBusqueda = proyectos.proyecto + ' ' + proyectos.descripcion + ' ' + proyectos.detalle

        let keywords = crearKeyword(textoBusqueda)

        this.props.firebase.guardarDocumentos(archivos).then(arregloUrls => {
            proyectos.fotos = arregloUrls
            proyectos.keywords = keywords

            console.log(proyectos)

            this.props.firebase.db
            .collection("Proyectos")
            .add(proyectos)
            .then(success=>{
                this.props.history.push("/")
            })
            .catch(error=>{
                openMensajePantalla({
                    open:true,
                    mensaje: error
                })
            })
            
        })


    }

    eliminarFoto = nombreFoto => () => {
        this.setState({
            archivos: this.state.archivos.filter(archivo => {
                return archivo.name !== nombreFoto
            })
        })
    }

    render() {


        return (
            <Container style={style.container}>
                <Paper style={style.paper}>

                    <Grid container spacing={3} >

                        <Grid item xs={12} md={8}>
                            <Breadcrumbs arial-label="breadcrumb">
                                <Link color="inherit" style={style.link} href="/">
                                    <HomeIcon style={style.homeIcon}/>
                                        Home
                                </Link>
                                <Typography color="textPrimary">Nuevo Proyecto</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            name="proyecto"
                            label="Nombre del proyecto"
                            fullWidth
                            onChange={this.entraDatoEstado}
                            value={this.state.proyectos.proyecto}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            name="descripcion"
                            label="Descripcion del proyecto"
                            fullWidth
                            onChange={this.entraDatoEstado}
                            value={this.state.proyectos.descripcion}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            name="detalle"
                            label="Detalle del servicio"
                            fullWidth
                            multiline
                            onChange={this.entraDatoEstado}
                            value={this.state.proyectos.detalle}
                        />
                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} sm={6}>

                            <ImageUploader
                                key = {1000}
                                withIcon = {true}
                                buttonText = "Seleccione las imagenes del proyecto"
                                onChange = {this.subirFotos}
                                imgExtension = {[".jpg", ".png", ".jpeg",".mp4"]}
                                maxFileSize = {524288}
                                />
                            
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Table>
                                <TableBody>
                                    {this.state.archivos.map((archivo, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="left">
                                                <img src={archivo.urlTemp} style={style.foto} />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={this.eliminarFoto(archivo.name)}>
                                                        Eliminar
                                                    </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button
                                onClick={this.guardarProyecto}
                                type="button"
                                fullWidth
                                variant="contained"
                                size="large"
                                color="primary"
                                style={style.submit}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>

            </Container>
        );
    }
}

export default consumerFirebase(NuevoServicio)