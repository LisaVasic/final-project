import { createSlice } from '@reduxjs/toolkit'

const user = createSlice ({
    name: 'trip',
    initialState: {
        pages: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setTitle: (store, action) => {
            store.title = action.payload
        },
        setDate: (store, action) => {
            store.date = action.payload
        },
        setCountdown: (store, action) => {
            store.countdown = action.payload
        }
    }    
});
