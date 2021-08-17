
import { types } from "../types/types";

// EVENTO
// {
//     id: new Date().getTime(),
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     notes: 'comprar el pan',
//     user: {
//         _id: '123',
//         name: 'Javier'
//     }
// }


const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action) => {

    switch (action.type) {
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        // cuando son arreglos es recomendable usar el operador spread
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
            
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }    
    
        case types.eventUpdate:
            return{
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }

        case types.eventDeleted:
            return{
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }

        case types.eventLoaded:
            return {
               ...state,
                events: [...action.payload]
            }
        
        case types.eventLogout:
            return {
                ...initialState
            }
        default:
            return state;
    }

}