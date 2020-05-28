import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { Container, Paper, Grid, Breadcrumbs, Link, Typography, TextField, Card, CardContent, CardActions, CardMedia } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home'
import { consumerFirebase } from '../../server';
import logo from '../../logo.svg'


const style = {
    cardGrid : {
        paddingTop: 8,
        paddingBottom : 8

    },
    paper :  {
        backgroundColor: "#f5f5f5",
        padding : "20px",
        minHeight : 650
    },
    link : {
        display: "flex"
    },
    gridTextField : {
        marginTop : "20px"
    },
    card : {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%"
    },
    cardContent: {
        flexGrow: 1
    }

}



class ListaServicios extends Component {

    state = {
        servicios : [],
        buscarServicios : ""
    }

    cambiarBusquedaTexto = e => {
        const self = this
        self.setState({
            [e.target.name] : e.target.value
        })

        if (self.state.typingTimeout){
            clearTimeout(self.state.typingTimeout)
        }

        self.setState({
            name: e.target.value,
            typing: false,
            typingTimeout : setTimeout(goTime => {
                console.log("Obteniendo datos de servicios")
                let objectQuery = this.props.firebase.db
                    .collection("Proyectos")
                    .orderBy("descripcion")
                    .where("keywords", "array-contains", self.state.buscarServicios.toLowerCase())
                    console.log(self.state.buscarServicios.toLowerCase())
                    if( self.state.buscarServicios.trim()===""){
                        objectQuery = this.props.firebase.db
                        .collection("Proyectos")
                        .orderBy("descripcion")
                    }


                    objectQuery.get()
                    .then(snapshot => {
                        const arrayServicios = snapshot.docs.map(doc=>{
                            let data = doc.data()
                            let id = doc.id
                            return {id, ...data}
                        })
                        this.setState({
                            servicios: arrayServicios
                        })
                    })
            },500)
        })

        /*this.setState({
            [e.target.name] : e.target.value
        })
        */
    }

    async componentDidMount(){
        let objectQuery = this.props.firebase.db.collection("Proyectos")

        const snapshot = await objectQuery.get()

        const arrayProyectos = snapshot.docs.map(doc =>{
            let data = doc.data()
            let id = doc.id

            return {id, ...data}
        })

        this.setState({
            servicios: arrayProyectos
        })
    }



    render() {
        return (
            

            <Container style={style.cardGrid} >
                <Paper style={style.paper}>

                    <Grid item xs={12} sm={12}>
                        <Breadcrumbs aria-label="breadcrumbs">
                            <Link color="inherit" style={style.link} href="/">
                                <HomeIcon />
                            </Link>
                            <Typography color="textPrimary">Servicios disponibles </Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12} sm={8} style={style.gridTextField}>
                        <TextField
                            fullwith
                            InputLabelProps ={{
                                shrink :true
                            }}
                            name="buscarServicios"
                            variant="outlined"
                            label="Busque servicios"
                            onChange={this.cambiarBusquedaTexto}
                            value={this.state.buscarServicios}
                            />

                    </Grid>

                    <Grid item xs={12} sm={12} style={style.gridTextField}>
                        <Grid container spacing={4}>
                            {this.state.servicios.map( card=> (
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <Card style={style.card}>
                                        <CardMedia style={style.cardMedia}
                                        image={
                                            card.fotos
                                            ? card.fotos[0] 
                                                ? card.fotos[0] 
                                                : logo 
                                            : logo
                                        }
                                        title="Mi servicios disponibles"
                                        />


                                        <CardContent style={style.cardContent}>
                                            <Typography gutterBottom variant="h4" component="h12">
                                                {card.descripcion}
                                            </Typography>

                                        </CardContent>
                                        <CardContent style={style.cardContent}>
                                            <Typography gutterBottom variant="h8" component="h12">
                                                    {card.detalle}
                                                </Typography>
                                        </CardContent>

                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary">
                                                Solicitar información
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>




                </Paper>




            </Container>



        );
    }
}

export default consumerFirebase(ListaServicios)