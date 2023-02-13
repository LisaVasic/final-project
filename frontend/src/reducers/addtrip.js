import { createSlice } from '@reduxjs/toolkit'

const trip = createSlice ({
    name: 'trip',
    initialState: {
        title: null,
        date:null,
        //pages: [],
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
    }    
});


export default trip;