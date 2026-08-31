import React from 'react'
import HighlightText from '../../components/HomePage/HighlightText'
import { useState } from 'react'
import { HomePageExplore } from '../../data/homepage-explore'
import CourseCard from '../../components/HomePage/CourseCard'

const tabsName= [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {

    const[currentTab, setCurrentTab] = useState(tabsName[0]);
    const[course, setCourse] = useState(HomePageExplore[0].courses);
    const[currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        setCurrentTab(value);
        console.log(value);
        const result = HomePageExplore.filter((course) => course.tag == value);
        setCourse(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    

  return (
    <div className="flex flex-col justify-center items-center">

        <div className="text-4xl font-semibold flex flex-row gap-2 text-center">
            Unlock the <HighlightText text={"Power of Code"}/>
        </div>

        <div className="text-sm text-richblack-300 text-[16px] mt-3">
            Learn to build anything you can imagine
        </div>

        <div className="flex flex-row px-1 py-1 gap-1 bg-richblack-800 rounded-full mt-5 mb-5">
            {
                tabsName.map((element, index) => {
                    return (<div 
                        className={`text-[16px] flex flex-row items-center gap-2
                        ${currentTab == element ?
                            "bg-richblack-900 text-richblack-5 font-medium"
                            : "text-richblack-200" } rounded-full transition-all px-7 py-2 duration-200 cursor-pointer
                            hover:bg-richblack-900 text-richblack-300"
                        }`}
                        key={index}
                        onClick={() => setMyCard(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className="lg:h-[150px]">
            <div className="flex flex-row gap-4">
                {
                    course.map((element,index) => {
                        return (
                            <CourseCard
                            key={index}
                            cardData={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>

    </div>
  )
}

export default ExploreMore
