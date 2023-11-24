import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import rentReducer from './features/rentSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        rent: rentReducer,
    }
})

export default store