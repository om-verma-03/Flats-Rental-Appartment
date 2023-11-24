import {createSlice} from '@reduxjs/toolkit'
const initialState= {
    location: '',
    type: '',
    price: '',
}

const rentSlice = createSlice({
    name: 'rent',
    initialState,
    reducers: {
        setRentFilter: (state, action) =>{
            state.location = action.payload.location;
            state.type = action.payload.type;
            state.price = action.payload.price;
        },
        clearRentFilter: (state) =>{
            state.location = null;
            state.type = null;
            state.price = null;
        }
    }
})

export const {setRentFilter, clearRentFilter} = rentSlice.actions;
export default rentSlice.reducer;