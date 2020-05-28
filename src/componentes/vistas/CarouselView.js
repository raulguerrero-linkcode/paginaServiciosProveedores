import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper,  Button} from '@material-ui/core'
import Spring from '../../carouselImg/imgSpring.PNG'
import IA from '../../carouselImg/imgIA.PNG'
import Front from '../../carouselImg/imgFront.PNG'
import Excel from '../../carouselImg/imgExcel.PNG'
import Scrum from '../../carouselImg/imgScrum.PNG'

import LinkButton from '../components'



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

export default function CarouselView(props)


{
    var items = [
        {
            
            img: Spring
            

        },
        {
            
            img: IA
            
        },
        {
            img: Front
        }

        ,
        {
            img: Excel
        }
        ,
        {
            img: Scrum
        }
    ]
 
    return (
        <Carousel>
            {
                items.map( item => <Item item={item} /> )
            }
        </Carousel>
    )
}


function Item(props)



{
    return (
        <Paper style={style.paper}>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            <img src={props.item.img}></img>
            <LinkButton to='/login' style={style.boton}>¿Desea conocer más?</LinkButton>
        </Paper>
    )
}