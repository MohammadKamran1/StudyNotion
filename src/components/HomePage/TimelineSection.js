import React from 'react'
import logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../assets/Images/TimelineImage.png";

const timeLine = [
  {
    logo: logo1,
    heading: "Leadership",
    description: "Fully committed to the success company"
  },
  {
    logo: logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority"
  },
  {
    logo: logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills"
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution"
  }
]

const TimelineSection = () => {
  return (
    <div className="mx-auto w-full">

      <div className="flex flex-row justify-between items-center gap-15 mx-auto">

        <div className="w-[45%] flex flex-col gap-5">
          {
            timeLine.map((element, index) => {
              return (
                 <div className="flex flex-row gap-6" key={index}>
                    <div className="w-[50px] h-[50px] bg-white flex justify-center items-center rounded-full">
                      <img src={element.logo} />
                    </div>

                    <div>
                      <p className="font-semibold text-[18px]">{element.heading}</p>
                      <p className="text-base">{element.description}</p>
                    </div>
                </div>
              )
            })
          }
        </div>

        <div className="relative shadow-blue-200">

          <img src={timelineImage}
          alt="timelineImage"
          className=""
          />

          <div className="absolute text-white bg-caribbeangreen-700 uppercase py-10 flex flex-row justify-center items-center gap-4
          left-[50%] translate-x-[-50%] translate-y-[-50%]">

            <div className="flex flex-row gap-2 text-center items-center border-r border-r-caribbeangreen-300 px-7">
              <h2 className="font-bold text-3xl">10</h2>
              <p className="text-caribbeangreen-400 text-sm">Years Experience</p>
            </div>

            <div className="flex gap-2 text-center items-center px-7">
              <h2 className="font-bold text-3xl">250</h2>
              <p className="text-caribbeangreen-400 text-sm">Types of Courses</p>
            </div>

          </div>
          
        </div>

      </div>

    </div>
  )
}

export default TimelineSection
