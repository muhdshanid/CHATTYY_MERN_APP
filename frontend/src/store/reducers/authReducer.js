import { createSlice } from "@reduxjs/toolkit";

const dataFromLocalStorage = localStorage.getItem("userData")
let userData = JSON.parse(dataFromLocalStorage)
const authReducer = createSlice({
    name:"authReducer",
    initialState:{
       user:userData?.user ? userData.user : null,
       token:userData?.token ? userData.token : null
    },
    reducers:{
        setToken :(state,action)=> {
            state.token = action.payload
        },
        setUser :(state,action)=> {
            state.user = action.payload
        },
        updateUser:(state,action)=> {
            state.user = action.payload
        }
    }
})

export const {setToken,setUser,updateUser} = authReducer.actions;

export default authReducer.reducer 