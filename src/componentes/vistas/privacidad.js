import React, { Component } from 'react'
import { Container, Paper, Grid, Avatar, Typography, Button } from '@material-ui/core'
import logoLink from '../../logo.png'


const style = {
    formato :  {
        margin : 20,
        alignItems : "center"
    },
    paper: {
        maxWidth: 200,
        margin: "100px auto",
        padding: 35
    }
}



class privacidad extends Component {

    registrarUsuario = e => {
        this.props.history.push("/")
    }
    
    render() {

       

        return (
            <Container style={style.formato}>
                <Paper >
                    <Grid container wrap="nowrap"  item xs={12} md={12} spacing={2}>
                    <Grid item>
                        <img src={logoLink} height= "100px" />
                    </Grid>
                    <Grid >
                        <Typography>
                                <div>
                                    Política de manejo de información
                                </div>
                                <p>En esta política, se describe la forma en la que LinkCode utilizará la información que nos proporciones con la finalidad de ofrecerte una experiencia de calidad.</p>
                                <p>¿Qué tipo de información obtenemos?</p>
                                <p>Con la finalidad de ofrecer nuestros productos requerimos que realices la creación de una cuenta, con la cual solo se requiere:</p>
                                <div>•	Nombre</div>
                                <div>•	Apellido</div>
                                <div>•	Correo empresarial, es decir, no podrás crear tu cuenta con correos como Gmail, Hotmail, etc.</div>
                                
                
                                <p>Al realizar la creación de su cuenta, se enviará un correo para confirmar su nueva cuenta.</p>
                            <p>Una vez creada su cuenta, puede agregar un número de teléfono (opcional) con la finalidad de asegurar la seguridad de su cuenta en nuestra plataforma.</p>
                            <p>El correo con el que usted crea su cuenta no se puede cambiar una vez que se ha verificado.</p>
                            <p>Bajo ninguna circunstancia se compartirán sus datos con terceros, 
                                    la finalidad de LinkCode es dar a conocer productos y servicios, con la excepción de que deseé integrarse a la 
                                academia interna de LinkCode, con la cuál será un proceso de recopilación de información independiente a la 
                                creación de una cuenta común.</p>
                        </Typography>
                        <Button type="submit" onClick={this.registrarUsuario} variant="contained" fullWidth size="large" color="primary" style={style.submit}>
                                    Regresar a la pantalla principal o Logearse
                                </Button>
                    </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

export default privacidad;