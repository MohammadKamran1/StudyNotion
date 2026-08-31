import React from 'react'
import Instructor from "../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className="mt-16 mb-32">

        <div className="mt-10 flex flex-row justify-center items-center gap-20 mx-auto text-white">

            <div className="w-[40%]">
                <img
                    src={Instructor}
                    alt="instructor"
                />
            </div>

            <div className="w-[40%] font-semibold flex flex-col gap-4">
                <div className="text-4xl">
                    Become an <HighlightText text={"instructor"}/>
                </div>
                <p className="font-medium text-[16px] w-[80%] text-richblack-300">
                    Instructors froma round the world teach millions of students on StudyNotion.
                    we provide the tools and skills to teach what you love
                </p>

                <div className="w-fit mt-10">
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className="flex items-center gap-2">
                            Start Teaching Today <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>

        </div>

    </div>
  )
}

export default InstructorSection
