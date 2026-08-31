import React from 'react'

const HighlightText = ({children, text}) => {
  return (
    <div className="font-bold text-blue-200 ">
      {" "}
      {text}
    </div>
  )
}

export default HighlightText
