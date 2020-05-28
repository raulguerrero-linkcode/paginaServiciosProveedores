import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper,  Button} from '@material-ui/core'
import Spring from '../../carouselImg/imgSpring.PNG'
import IA from '../../carouselImg/imgIA.PNG'
import Front from '../../carouselImg/imgFront.PNG'
import Excel from '../../carouselImg/imgExcel.PNG'
import Scrum from '../../carouselImg/imgScrum.PNG'


const style = {
    
    gridTextField : {
        marginTop : "20px",
        display: "flex",
        minHeight : 100,
        variant:"outlined"

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
        
        <Paper style={style.gridTextField}>
            <img src={props.item.img} width="100%"></img>
        </Paper>
        
    )
}