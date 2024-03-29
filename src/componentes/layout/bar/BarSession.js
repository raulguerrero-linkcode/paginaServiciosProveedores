import React, { Component } from 'react';
import { Toolbar,  Button, IconButton, Drawer, Avatar } from '@material-ui/core'
// import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { consumerFirebase } from '../../../server/index'
import { compose, fromRenderProps } from 'recompose'

import { StateContext } from '../../../session/store'
import { salirSesion } from '../../../session/actions/sesionAction'
import { MenuDerecha } from './menuDerecha'
import { MenuIzquierda } from './menuIzquierda'
import  fotoUsuarioTemp from '../../../logo.svg'

import logoLink from '../../../logo.png'

import { withRouter } from 'react-router-dom'

const styles = theme => ({

    sectionDesktop : {
        display: "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")] : {
            display: "none"
        }
    },
    grow : {
        flexGrow: 1
    },
    avatarSize:{
        width :40,
        height: 40
    },
    listItemText : {
        fontSize : "14px",
        fontWeight: 600,
        paddingLeft : "15px",
        color : "#212121"
    },
    list : {
        width : 250
    }

})

class BarSession extends Component {

    static contextType = StateContext

    state = {
        firebase : null,
        right : false,
        left : false
    }



    salirSesionApp = () =>{
        const { firebase } = this.state
        const [{ sesion }, dispatch ] = this.context

        console.log("Saliendo de la pagina")
        salirSesion(dispatch, firebase)
        .then(success => {

            this.props.history.push("/")
            }
        )
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side] : open
        })
    }


    static getDerivedStateFromProps(nextProps, prevState){
        let nuevosObjetos={}

        if (nextProps.firebase !== prevState.firebase) {
            nuevosObjetos.firebase = nextProps.firebase
        }
        return nuevosObjetos
    }

    render() {
        const { classes } = this.props
        const [{ sesion }, dispatch ] = this.context
        let textoUsuario = sesion.usuario.nombre +  " " + sesion.usuario.apellido
        return (
            <div>
                <Drawer 
                    open={this.state.left}
                    onClose={this.toggleDrawer("left", false)}
                    anchor={"left"}    
                >
                    <div role="button"
                        onClick={this.toggleDrawer("left", false)}
                        onKeyDown={this.toggleDrawer("left", false)}    
                    >   
                    <MenuIzquierda 
                        classes={classes}></MenuIzquierda>
                    </div>

                </Drawer>




                <Drawer 
                    open={this.state.right}
                    onClose={this.toggleDrawer("right", false)}
                    anchor={"right"}    
                >
                    <div role="button"
                        onClick={this.toggleDrawer("right", false)}
                        onKeyDown={this.toggleDrawer("right", false)}    
                    >   
                    <MenuDerecha 
                        classes={classes} 
                        usuario={sesion.usuario} 
                        textoUsuario={textoUsuario} 
                        fotoUsuario={sesion.usuario.foto || fotoUsuarioTemp} 
                        salirSesion={this.salirSesionApp}></MenuDerecha>
                    </div>

                </Drawer>
                <Toolbar>
                    
                    <IconButton color="inherit" onClick={this.toggleDrawer("left", true)}>
                        <i className="material-icons">menu</i>
                    </IconButton>

                    
                    <img src={logoLink} height= "50px" />

                    <div className={classes.grow}></div>
                    <div className={classes.sectionDesktop}>
                       
                        <Button color="inherit" onClick={this.salirSesionApp}>Log Out</Button>
                        <Button color="inherit">{textoUsuario}</Button>
                        <Avatar src={sesion.usuario.foto ||  fotoUsuarioTemp}></Avatar>

                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton color="inherit"
                            onClick = {this.toggleDrawer("right", true)}
                            >
                            <i className="material-icons">more_vert</i>
                        </IconButton>
                    </div>
                </Toolbar>
            </div>
        );
    }
}

export default compose(
    withRouter,
    consumerFirebase, 
    withStyles(styles)
    )(BarSession);