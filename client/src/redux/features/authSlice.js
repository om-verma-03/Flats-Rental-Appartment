import {createSlice} from '@reduxjs/toolkit'
const initialState= {
    token: null,
    username: null
    
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) =>{
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
        clearAuth: (state) =>{
            state.token = null;
            state.username = null;
        }
    }
})

export const {setAuth, clearAuth} = authSlice.actions;
export default authSlice.reducer;