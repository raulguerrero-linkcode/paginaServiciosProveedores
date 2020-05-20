import sesionReducer from './sessionReducer'
import openSnackBarReducer from './openSnackBarReducer'

export const mainReducer = ({sesion, openSnackbar}, action) => {
    return {
        sesion : sesionReducer(sesion, action), 
        openSnackbar : openSnackBarReducer(openSnackbar, action)
    }
}