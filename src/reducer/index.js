import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlices";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import loadingReducer from "../slices/loadingSlice";
import signUpDataReducer from "../slices/signUpSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    loading: loadingReducer,
    signUpData: signUpDataReducer
})

export default rootReducer;