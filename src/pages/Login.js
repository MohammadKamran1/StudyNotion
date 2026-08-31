import React from 'react'
import Template from '../components/core/auth/Template'
import loginImage from "../assets/Images/login.webp"

const Login = () => {
  return (
    <Template
     title="Welcome Back"
     desc1="Build skills for today, tomorrow & beyond."
     desc2="Education to future-proof your career"
     image={loginImage}
     formType="login"
    />
  )
}

export default Login
