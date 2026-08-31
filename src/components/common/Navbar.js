import React, { useEffect, useState } from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDownMenu from "../../components/core/auth/ProfileDropDownMenu";
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { IoIosArrowDown } from "react-icons/io";
import {logout} from "../../services/operations/authAPI";

const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sublinks, setSubLinks] = useState([]);

    const getSubLinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log(result.data.allCategory);
            setSubLinks(result.data.allCategory);
        }
        catch(error){
            console.log("Could not get categories links for navbar", error);
        }
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(logout(navigate));
    }

    useEffect(() => {
        getSubLinks();
    },[]);

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className="flex lg:h-14 items-center border border-b-[1px] border-b-richblack-700">

        <div className="w-11/12 mx-auto flex justify-between items-center">

            <Link to={"/signup"}>
                <img src={logo} width={160} height={42} loading="lazy" alt="studynotionLogo"/>
            </Link>

            <nav>
                <ul className="flex gap-x-6 justify-between text-richblack-25">
                    {
                        NavbarLinks.map((link, index) => {
                            return <li key={index}>
                                {
                                    link?.title == "Catalog" ? (
                                    <div className="relative flex flex-row gap-1 items-center z-10 group">
                                        <p>{link.title}</p>
                                        <IoIosArrowDown size={15}/>

                                        <div className="invisible absolute top-[-50%] left-[50%]
                                        translate-x-[-30%] translate-y-[50%]
                                        opacity-0 z-1 lg:w-[250px] bg-richblack-5 text-richblack-900
                                        transition-all duration-200 p-4 flex flex-col rounded group-hover:opacity-100
                                        group-hover:visible">

                                        <div className="absolute z-1 h-6 w-6 bg-richblack-5 -top-5 
                                        left-[28%] rounded rotate-45
                                        translate-x-[80%] translate-y-[45%]"></div>

                                        {
                                            sublinks ? (
                                                sublinks.map((subLink, index) => (
                                                <Link to={subLink?.link} key={index}>
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            ))
                                            ) : (<div></div>)
                                        }

                                        </div>
                                    </div>
                                    
                                ) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-200"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        })
                    }
                </ul>
            </nav>

            <div className="flex gap-x-4 items-center">

                {
                    user && user.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"}>
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className="border border-richblack-700 bg-richblack-800 
                            px-[12px] py-[8px] text-richblack-100 rounded-md">
                                Login
                            </button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className="border border-richblack-700 bg-richblack-800 
                            px-[12px] py-[8px] text-richblack-100 rounded-md">
                                Signup
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null && (
                        <Link to={"/logout"}>
                            <button onClick={submitHandler}
                            className="border border-richblack-700 bg-richblack-800 
                            px-[12px] py-[8px] text-richblack-100 rounded-md">
                                Logout
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null && (
                        <Link to={"/dashboard"}>
                            <button className="border border-richblack-700 bg-richblack-800 
                            px-[12px] py-[8px] text-richblack-100 rounded-md">
                                Dashboard
                            </button>
                        </Link>
                    )
                }

                {
                    user !== null && <ProfileDropDownMenu/>
                }

            </div>

        </div>

    </div>
  )
}

export default Navbar
