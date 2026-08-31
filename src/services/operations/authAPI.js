import toast from "react-hot-toast";
import { removeToken, setToken } from "../../slices/authSlices";
import {apiConnector} from "../apiConnector";
import { categories } from "../apis";
import { setLoading } from "../../slices/loadingSlice";
import {setUser} from "../../slices/profileSlice";

export function login(email, password, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try{
            //API Call
            const response = await apiConnector(
                "POST", 
                categories.LOGIN_API,
                {
                    email,
                    password
                }
            );

            console.log("LOGIN API RESPONSE", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            dispatch(setToken(response.data.token));
            const userImage = response?.data?.user?.image ? 
            response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response.data.user, image:userImage}));

            localStorage.setItem("token", response.data.token);
            toast.success("Login Successful", {id: toastId});
            console.log("TOKEN", response.data.token);
            navigate("/dashboard/my-profile");
        }
        catch(error){
            console.log("LOGIN ERROR");
            toast.error(error.response?.data?.message || "Login Failed", {id: toastId});
        } finally{
            dispatch(setLoading(false));
        }
    }
}

export function sendOtp(email, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Sending OTP...");
        dispatch(setLoading(true));
        try{

            const signInOtp = await apiConnector(
                "POST",
                categories.SEND_OTP,
                {
                    email
                }
            )

            console.log("SEND OTP RESPONSE", signInOtp);

            if(!signInOtp?.data?.success){
                throw new Error(signInOtp.data.message);
            }

            toast.success("OTP Sent Successfully", {id:toastId});

            navigate("/verify-otp");
        }
        catch(error){
            toast.error(error?.response?.data?.message || error?.message || "Could Not Send OTP", {id:toastId});
        } finally{
            dispatch(setLoading(false));
        }
    }
}

export function signup(formData,otpData,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));
        try{
            const otp = otpData.join("");
            const response = await apiConnector(
                "POST",
                categories.SIGNUP_API,
                {
                    firstName:formData.firstName,
                    lastName:formData.lastName,
                    email:formData.email,
                    password:formData.password,
                    confirmPassword:formData.confirmPassword,
                    accountType:formData.accountType,
                    otp
                }
            )

            if(!response?.data?.success){
                throw new Error(response.data.message);
            }

            console.log("SIGNUP REPONSE DATA", response);

            toast.success("Account Created Successfully", {id:toastId});
            navigate("/login");
        }
        catch(error){
            toast.error("Signup Failed" || error.message, {id:toastId});
        } finally {
            dispatch(setLoading(true));
        }
    }
}

export function logout(navigate){
    return async (dispatch) => {
        const toastId = toast.loading("loading...");
        setLoading(true);
        try{
            localStorage.removeItem("token");
            dispatch(removeToken());

            toast.success("Logout Successful", {id:toastId});
            navigate("/login");
        }
        catch(error){
            toast.error("Logout Failed", error.message, {id:toastId});
        } finally {
            setLoading(false);
        }
    }
}