import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/HomePage/HighlightText';
import CTAButton from '../components/HomePage/CTAButton';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/HomePage/CodeBlocks';
import TimelineSection from "../components/HomePage/TimelineSection";
import LearningLanguegeSection from "../components/HomePage/LearningLanguageSection";
import InstructorSection from '../components/HomePage/InstructorSection';
import ExploreMore from '../components/HomePage/ExploreMore';

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className="relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center text-white justify-between">

        <Link to={"/signup"}>

            <div className="group mt-16 p-1 mx-auto rounded-full text-richblack-200 bg-richblack-800
            transition-all duration-200 hover:scale-95 w-fit">
                <div className="flex flex-row rounded-full items-center gap-2 px-10 py-[5px] group-hover:bg-richblack-900 ">
                    <p>Become an Instructor</p>
                    <FaArrowRight/>
                </div>
            </div>

        </Link>

        <div className="mt-8 text-4xl font-semibold">
            <div className="flex flex-row gap-1">
                Empower Your Future with
                <HighlightText text={"Coding Skills"}/>
            </div>
        </div>

        <div className="mt-7 max-w-3xl text-richblack-200 mx-auto text-center">
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get
            access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>
        </div>

        <div className="w-full max-w-maxContent mt-12 shadow-[14px_14px_white]">
            <video className="block w-full"
            muted
            loop
            autoPlay
            >
            <source src={Banner}/>
            </video>
        </div>

        <div className="flex flex-row gap-7 mt-8">
            <CodeBlocks
                position="lg:flex-row"
                heading={
                    <div className="text-4xl font-semibold">
                        <span className="flex gap-2">
                            Unlock your <HighlightText text={"coding potential"}/>
                        </span>
                        with our online courses.
                    </div>
                }
                subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                ctabtn1={
                    {
                        btnText:"Try it Yourself",
                        linkto:"/signup",
                        active:true
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn More",
                        linkto:"/signup",
                        active:false
                    }
                }

                codeblock={"<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n<h1><a href=\"/\">Header</a>\n</h1>\n<nav><a href=\"one/\">One</a><a href=\"two/\">Two</a>\n<a href=\"three/\">Three</a>\n</nav>"}
                codeColor="text-yellow-100"
            />
        </div>

        <div className="flex flex-row gap-7 mt-8">
            <CodeBlocks
                position="lg:flex-row-reverse"
                heading={
                    <div className="text-4xl font-semibold">
                        <span className="flex gap-2">
                            Start <HighlightText text={"coding"}/>
                        </span>
                        <HighlightText text={"in seconds"}/>
                    </div>
                }
                subHeading={"Go ahead give it a try. Our hands-on learning environment means you'll be writing real code from very first lesson."}
                ctabtn1={
                    {
                        btnText:"Continue Lesson",
                        linkto:"/signup",
                        active:true
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn More",
                        linkto:"/signup",
                        active:false
                    }
                }

                codeblock={"<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n<h1><a href=\"/\">Header</a>\n</h1>\n<nav><a href=\"one/\">One</a><a href=\"two/\">Two</a>\n<a href=\"three/\">Three</a>\n</nav>"}
                codeColor="text-yellow-100"
            />
        </div>

        <ExploreMore/>

        </div>
        {/* Section 2 */}
        <div className="bg-pure-greys-5 text-richblack-700">

            <div className="homepage_bg h-[310px]">
                
                <div className="w-11/12 max-w-maxContent flex flex-col justify-between mx-auto items-center gap-5">
                <div className="h-[150px]"></div>
                    <div className="flex flex-row gap-7 text-white">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex flex-row gap-3 items-center">
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>

                        <CTAButton>
                            Learn More
                        </CTAButton>
                    </div>
                </div>

            </div>

            <div className="w-11/12 max-w-maxContent flex flex-col justify-between mx-auto items-center gap-5">

                <div className="flex flex-row justify-between gap-5 mt-[110px] mx-auto mb-10">

                    <div className="text-4xl font-semibold w-[45%]">
                        Get the skills you need for a 
                        <HighlightText text={"job that is in demand"}/>
                    </div>

                    <div className="flex flex-col items-start gap-10 w-[45%]">
                        <div className="text-[16px]">
                            The modern StudyNotion is the dictates its own terms. Today's to be a competitive specialist requires more than professional skills.
                        </div>

                        <CTAButton className="flex flex-start" active={true} linkto={"/signup"}>
                            Learn More
                        </CTAButton>    
                    </div>

                </div>

                <TimelineSection/>

                <LearningLanguegeSection/>

            </div>
            
        </div>

        {/* Section 3 */}
        <div className="relative mx-auto max-w-maxContent flex flex-col w-11/12 items-center text-white justify-between">
            <InstructorSection/>

            <h2 className="text-4xl font-semibold mb-16">Reviews from other learners</h2>
        </div>

        {/* Footer */}
    </div>
  )
}

export default Home
