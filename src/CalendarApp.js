import React from 'react'
import { AppRouter } from './router/AppRouter'
import './styles.css'

import { Provider } from 'react-redux';
import { store } from './store/store';

export const CalendarApp = () => {
    return (
        <Provider store= {store}>
            <AppRouter/>
        </Provider>
    )
}
