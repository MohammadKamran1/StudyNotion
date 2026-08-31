import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupFormData: null
}

const signUpSlice = createSlice({
    name:"signupdata",
    initialState,
    reducers: {
        setSignUpData(state,action){
            state.signupFormData = action.payload; 
        },
        clearSignupData(state){
            state.signupFormData = null;
        }
    }
})

export const {setSignUpData, clearSignupData} = signUpSlice.actions;
export default signUpSlice.reducer;
