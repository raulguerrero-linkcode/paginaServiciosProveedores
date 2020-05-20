import React from 'react'
import { List, Link, ListItemText, Avatar, ListItem } from '@material-ui/core'

export const MenuDerecha = ({ classes, user, textoUsuario, fotoUsuario, salirSesion }) => {
    return(
    <div className={classes.list}>
        <List>
            <ListItem button component={Link} to="/newuser">
                <Avatar 
                    classes = {{primary: classes.avatarSize}}
                    src={fotoUsuario}
                    />
                <ListItemText className={{primary : classes.listItemText}} primary={textoUsuario} />
            </ListItem>
            <ListItem button onClick={salirSesion}>
                <ListItemText classes={{primary : classes.listItemText}} primary="LogOut" />
            </ListItem>
        </List>
    </div>
)
}