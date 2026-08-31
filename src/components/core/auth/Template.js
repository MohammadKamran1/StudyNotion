import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { FaGoogle } from "react-icons/fa";
import frame from "../../../assets/Images/frame.png";

const Template = ({title, desc1, desc2, image, formType}) => {

    const {loading} = useSelector((state) => state.loading);

  return (
    <div>

        <div className="flex w-11/12 max-w-[1100px] justify-around py-12 gap-x-12 gap-y-0 mx-auto text-richblack-5">

            <div className="flex flex-col w-full max-w-[400px]">

                <h2 className="font-semibold text-[1.87rem] leding-[2.375rem] text-richblack-5">{title}</h2>

                <p className="text-[1.125rem] leding-[1.625rem] mt-4">
                    <span className="text-richblack-100">{desc1}</span> <br/>
                    <span className="text-blue-100 font-edu-sa italic font-semibold">{desc2}</span>
                </p>

                {formType === "login" ? (<LoginForm/>) : (<SignupForm/>)}

            </div>

            <div className="relative w-11/12 max-w-[450px]">

                <img 
                    src={frame}
                    width={558}
                    height={504}
                    loading="lazy"
                    alt="frame"
                />

                <img className="absolute -top-4 right-4"
                    src={image}
                    width={558}
                    height={490}
                    loading="lazy"
                    alt="notionGirl"
                />

            </div>

        </div>

    </div>
  )
}

export default Template
