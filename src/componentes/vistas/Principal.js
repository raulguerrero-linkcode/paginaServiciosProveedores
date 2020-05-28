import React from 'react'
import { Container, Avatar, Typography, TextField, Button, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import LinkCode  from '../../carouselImg/linkCode.PNG'
import Login from '../seguridad/Login'
import CarouselView from './CarouselView'


const style={
    
    paper: {
                marginTop: 9,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            },
    boton: {
        margingTop: 50
    }
    
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop : 8,
    margin: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"

    

  },
  paper: {
    marginTop: 9,
    display: "inline",
    flexDirection: "rows",
    alignItems: "center"
},

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default function SimpleExpansionPanel() {
  const classes = useStyles()

  return (
    <Container maxWidth="xl">
    <div >
        <img src={LinkCode} height="10%" width="10%" />
        </div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Iniciar sesion o registrarse</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Login />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      

      <CarouselView />
    
    </Container>
  )
}
