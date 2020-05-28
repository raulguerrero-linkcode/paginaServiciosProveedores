import React from 'react'
import { List, Divider, ListItemText, ListItem } from "@material-ui/core";
import { Link } from 'react-router-dom'

export const MenuIzquierda = ({classes}) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/perfil" >
                <i className="material-icons">account_box</i>
                <ListItemText classes={{primary : classes.listItemText}} primary="Perfil" />
            </ListItem>
        </List>
        <Divider />
        <List>
            
            
            
            <ListItem component={Link} button to="/listaservicios">
                <i className="material-icons">business</i>
                <ListItemText classes={{primary : classes.listItemText}} primary="Proyectos actuales" />
            </ListItem>
            
            <ListItem component={Link} button to="/privacidad">
                <i className="material-icons">description</i>
                <ListItemText classes={{primary : classes.listItemText}} primary="Privacidad" />
            </ListItem>
        </List>
    </div>
)