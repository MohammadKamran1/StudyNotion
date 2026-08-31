import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/operations/authAPI';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
import { setLoading } from '../slices/loadingSlice';
import toast from 'react-hot-toast';

const VerifyOtp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {signupFormData} = useSelector((state) => state.signUpData);
    const {loading} = useSelector((state) => state.loading);

    const [otpData, setOtpData] = useState(["","","","","",""]);

    console.log("EMAIL FROM SIGNUP",signupFormData.email);

    function handleChange(event,index){
        const value = event.target.value;

        if (!/^\d*$/.test(value)) {
            return;
        }

        if (value.length > 1) {
            return;
        }

        setOtpData((prev) => {
            const newOtpData = [...prev];
            newOtpData[index] = value;
            return newOtpData;
        });
    }

    function submitHandler(event){
        event.preventDefault();
        console.log("formData",signupFormData);
        console.log("otpData",otpData); 
        dispatch(signup(signupFormData,otpData,navigate));
    }

    function backToLoginHandler(event) {
        event.preventDefault();

        const toastId = toast.loading("Going back to login...");
        dispatch(setLoading(true));

        setTimeout(() => {
            dispatch(setLoading(false));
            toast.success("Redirecting to login...", { id: toastId });
            navigate("/login");
        }, 1500);
    }

  return (
    <div className="w-11/12 h-[calc(100vh-180px)] mx-auto flex justify-center items-center text-richblack-5">
        <div className="w-fit">
            <div className="font-semibold text-3xl">
                Verify email
            </div>
            <form onSubmit={submitHandler} className="flex flex-col justify-center space-y-6">
                <label className="space-y-5">
                    <p className="text-richblack-100 text-sm">A verification mail has been sent to {signupFormData.email} <br/> Enter the code below</p>

                    <div className="flex gap-2 justify-between">
                    {
                        otpData.map((input, index) => (
                            <input className="h-14 w-12 text-lg text-center rounded-md text-richblack-5 bg-richblack-700 shadow-sm shadow-richblack-200 border-b-richblack-600"
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={input}
                            onChange={(event) => handleChange(event,index)}
                            />
                        ))
                    }
                    </div>
                </label>

                <button className="w-full rounded-md text-richblack-900 bg-yellow-100 px-4 py-2 text-center">
                    Verify and Register
                </button>
            </form>

            <div className="flex flex-row justify-between items-center mt-3">
                <div onClick={backToLoginHandler} className="flex flex-row gap-2 font-extralight items-center text-sm italic cursor-pointer">
                    <FaArrowLeftLong/>
                    Back to login
                </div>

                <div className="flex flex-row items-center text-sm italic cursor-pointer font-extralight gap-2 text-blue-200">
                    <FaClockRotateLeft/>
                    Resend it
                </div>
            </div>
        </div>

    </div>
  )
}

export default VerifyOtp
