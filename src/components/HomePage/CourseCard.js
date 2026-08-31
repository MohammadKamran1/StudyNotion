import React from 'react'

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    
    <div className="text-white cursor-pointer" onClick={() => setCurrentCard(cardData)} >
        <div className={`bg-richblack-800 ${currentCard === cardData? ("bg-white text-black shadow-[12px_12px_0px_0px_#FFD60A]") : ("")}`}>
            <div className="px-6 py-8">
                <h2 className="font-semibold text-xl mb-2">{cardData.heading}</h2>
                <p className="text-base text-richblack-300">{cardData.description}</p>
            </div>
            <div className="flex justify-between mt-3 border-t w-full p-6 border-dashed">
                <p>{cardData.level}</p>
                <p>{cardData.lessionNumber} Lessons</p>
            </div>
        </div>
    </div>
  )
}

export default CourseCard
