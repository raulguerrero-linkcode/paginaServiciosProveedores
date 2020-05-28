import React from 'react'
import { Container,  Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CarouselView from './CarouselView'
import LinkButton from '../components'
import FooterPrincipal from './FooterPrincipal'
import Logo from '../../logo.png'
import { Media } from 'reactstrap'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop : 8,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
top: "5%",

},
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default function SimpleExpansionPanel() {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
        <div display="flex">
            <Media src={Logo} width="20%" alt="LinkCode services" />
        
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography className={classes.heading}>Iniciar sesion o registrarse</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <LinkButton to='/login' >Inicie sesion o regístrese con nosotros!</LinkButton>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
    <Grid >
      <CarouselView />
      </Grid>
    <p>
        <FooterPrincipal />
    </p>
    </Container>
  )
}
