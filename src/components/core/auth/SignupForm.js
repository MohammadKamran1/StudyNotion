import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../../../services/operations/authAPI';
import { setSignUpData } from '../../../slices/signUpSlice';

const SignupForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading} = useSelector((state) => state.loading);

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        accountType: "student"
    })

    function changeHandler(event){
        setFormData(prev => {
            return{
                ...prev,
                [event.target.name] : event.target.value
            }
        })
    }

    function submitHandler(event){
        event.preventDefault();
        if(formData.password !== formData.confirmPassword){
            return toast.error("Password Mismatch");
        }
        console.log("SIGNUP FORM DATA:", formData);
        dispatch(setSignUpData(formData));
        dispatch(sendOtp(formData.email, navigate));
    }

  return (
    <div className="text-richblack-5 flex flex-col">

        <div className="flex p-1 bg-richblack-800 gap-x-2 rounded-full max-w-max mt-[25px]">
            <button type="button" className={`${formData.accountType === "student" ? 
            "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200 "}
            py-2 px-5 rounded-full transition-all duration-200`} 
            onClick={() => setFormData((prev) => ({...prev, accountType:"student"}))}>Student</button>
            <button type="button" className={`${formData.accountType === "instructor" ? 
            "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200 "}
            py-2 px-5 rounded-full transition-all duration-200`} 
            onClick={() => setFormData((prev) => ({...prev, accountType:"instructor"}))}>Instructor</button>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-y-3">
            <div className="flex gap-x-3 mt-[25px]">
                <label>
                    <p className="text-[0.87rem] mb-1 leading-[1.375rem]">First Name <sup className="text-pink-200">*</sup></p>
                    <input className="rounded p-[12px] w-full border-b border-richblack-200 bg-richblack-800"
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    onChange={changeHandler}
                    value={formData.firstName}
                    />
                </label>

                <label>
                    <p className="text-[0.87rem] mb-1 leading-[1.375rem]">Last Name <sup className="text-pink-200">*</sup></p>
                    <input className="rounded p-[12px] w-full border-b border-richblack-200 bg-richblack-800"
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    onChange={changeHandler}
                    value={formData.lastName}
                    />
                </label>
            </div>

            <label>
                <p className="text-[0.87rem] mb-1 leading-[1.375rem]">Email Address <sup className="text-pink-200">*</sup></p>
                <input className="rounded p-[12px] w-full border-b border-richblack-200 bg-richblack-800"
                type="text"
                name="email"
                placeholder="Enter email address"
                onChange={changeHandler}
                value={formData.email}
                />
            </label>

            <div className="flex gap-x-3">
                <label className="relative">
                    <p className="text-[0.87rem] mb-1 leading-[1.375rem]">Create Password <sup className="text-pink-200">*</sup></p>
                    <input className="rounded p-[12px] w-full border-b border-richblack-200 bg-richblack-800"
                    type={showPassword1 ? "text" : "password"}
                    name="password"
                    placeholder="Create Password"
                    onChange={changeHandler}
                    value={formData.password}
                    />

                    <span onClick={() => setShowPassword1((prev) => !prev)}
                        className="absolute right-3 top-[38px] cursor-pointer">
                        {
                            showPassword1 ? (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>) 
                                : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) 
                        }
                    </span>
                </label>

                <label className="relative">
                    <p className="text-[0.87rem] mb-1 leading-[1.375rem]">Confirm Password <sup className="text-pink-200">*</sup></p>
                    <input className="rounded p-[12px] w-full border-b border-richblack-200 bg-richblack-800"
                    type={showPassword2 ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={changeHandler}
                    value={formData.confirmPassword}
                    />

                    <span onClick={() => setShowPassword2((prev) => !prev)}
                        className="absolute right-3 top-[38px] cursor-pointer">
                        {
                            showPassword2 ? (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                            : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) 
                            
                        }
                    </span>
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-yellow-50 py-2 rounded-lg w-full mt-4 text-richblack-900 flex justify-center items-center">
                {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-richblack-900 border-t-transparent"></div>
                ) : (
                    "Create Account"
                )}
            </button>
        </form>

    </div>
  )
}

export default SignupForm
