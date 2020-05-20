import React, { Component } from 'react';
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home'



const style = {
    container:{
        paddinTop : '8px'

    },
    paper : {
        marginTop : 8,
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
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
    }
}


class NuevoServicio extends Component {
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

                        />
                    </Grid>

                </Paper>

            </Container>
        );
    }
}

export default NuevoServicio;