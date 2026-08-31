import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div className="mt-[150px] mb-32">

      <div className="flex flex-col gap-5 justify-center items-center mt-28">
        
        <div className="flex gap-2 text-4xl font-semibold">
          Your Swiss knife for <HighlightText text={"learning any language"}/>
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
          Using spin making learning multiple languages easy, with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-row items-center justify-center mt-5 mx-auto">

          <img 
            src={know_your_progress}
            alt="knowYourProgress"
            className="object-contain -mr-32"
          />

          <img 
            src={compare_with_others}
            alt="compareWithOthers"
            className="object-contain"
          />

          <img 
            src={plan_your_lesson}
            alt="planYourLesson"
            className="object-contain -ml-36"
          />

        </div>

        <div>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>

      </div>

    </div>
  )
}

export default LearningLanguageSection
