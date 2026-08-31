import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth);

  return (
    <div className="text-richblack-5">
        {
            loading ? (<div>Loading...</div>) 
            : (
                <div>
                    <h1>
                        {
                            !emailSent ? "Reset your Password" : "Check You Email"
                        }
                    </h1>
                    
                    <p>
                        {
                            !emailSent ? `Have no fear. We will email you instructions to reset your 
                            password. If you dont have access to your email we can try account recovery`
                            : `we have sent the email address to ${email}`
                        }
                    </p>

                    <form>
                        {
                            !emailSent && (
                                <label>
                                    <p>Email Address <sup>*</sup></p>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Enter your mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                            )
                        }
                    </form>

                    <button>
                        {
                            !emailSent ? "Reset Password" : "Resend Email"
                        }
                    </button>

                    <div>
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword
