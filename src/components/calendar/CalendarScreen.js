import React, { useEffect, useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'


//cambiando idioma
moment.locale('es');
const localizer = momentLocalizer(moment);
// const events = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(1, 'hours').toDate(),
//     bgColor: '#fafafa',
//     notes: 'comprar el pan',
//     user: {
//         _id: '123',
//         name: 'Javier'
//     }
// }]


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    useEffect(() => {
        dispatch(eventStartLoading())
        
    }, [dispatch])

    const onDoubleClick = (e) => {
        console.log('abrir modal');
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        // console.log(e);
        dispatch(eventSetActive(e))
        // dispatch(uiOpenModal())
    }

    const onViewChange = (e) => {
        // el e trae: month, week, day , ...
        setLastView(e)
        // console.log(e); 
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        // console.log(e);
        dispatch(eventClearActiveEvent())
    }
    const eventStyleGetter = (event, start, end, isSelected) => {
        
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367cf7': '#455660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
            fontSize: '13px',
            // wordWrap: 'break-word'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer = { localizer }
                events = { events }
                starAccesor = "start"
                endAccesor = "end"
                messages = { messages }
                eventPropGetter = { eventStyleGetter }
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent = { onSelectEvent }
                onView = { onViewChange }
                onSelectSlot = {onSelectSlot}
                selectable = {true}
                view = { lastView }
                components={{
                    event: CalendarEvent
                }}
            /> 

            <AddNewFab />
            {
                (activeEvent) && <DeleteEventFab />
            }
            
            <CalendarModal /> 
            
            
        </div>
        
    )
}
