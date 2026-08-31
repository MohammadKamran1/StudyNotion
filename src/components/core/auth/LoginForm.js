import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {login} from "../../../services/operations/authAPI";

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading} = useSelector((state) => state.loading);

    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [accountType, setAccountType] = useState("student");

    const changeHandler = (event) => {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name] : event.target.value
            }
        })
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(formData.email,formData.password,navigate));
    }

  return (
    <div onSubmit={submitHandler} className="flex flex-col w-full gap-y-6 mt-6 text-richblack-5">
        <div className="flex p-1 bg-richblack-800 gap-x-2 rounded-full max-w-max">
            <button className={`${accountType === "student" ? 
            "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200 "}
            py-2 px-5 rounded-full transition-all duration-200`} 
            onClick={() => setAccountType("student")}>Student</button>
            <button className={`${accountType === "instructor" ? 
            "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200 "}
            py-2 px-5 rounded-full transition-all duration-200`} 
            onClick={() => setAccountType("instructor")}>Instructor</button>
        </div>
        <form className="flex flex-col gap-y-2 text-richblack-5">
            <label>
                <p className="text-[0.87rem] mb-1 leading-[1.375rem]">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>

                <input className="rounded p-[12px] w-full border-b border-richblack-200 bg-richblack-800"
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={changeHandler}
                />
            </label>

            <label className="relative w-full">
                <p className="text-[0.87rem] mb-1 leading-[1.375rem]">
                    Password <sup className="text-pink-200">*</sup>
                </p>

                <input className="rounded p-[12px] w-full border-b border-richblack-200 bg-richblack-800"
                type={showPassword ? ("text") : ("password")}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={changeHandler}
                />

                <span className="absolute top-10 right-3"
                onClick={() => setShowPassword((prev) => !prev)}>
                    {
                        showPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>) 
                        : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                    }
                </span>

                <Link to={"/forgot-password"}>
                    <div className="text-sm flex flex-row-reverse text-blue-200">Forgot Password</div>
                </Link>
            </label>

            <button
                type="submit"
                disabled={loading}
                className="bg-yellow-50 py-2 rounded-lg w-full mt-4 text-richblack-900 flex justify-center items-center">
                {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-richblack-900 border-t-transparent"></div>
                ) : (
                    "Sign in"
                )}
            </button>
        </form>
    </div>
  )
}

export default LoginForm
