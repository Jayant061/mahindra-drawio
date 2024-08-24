import React from 'react'
interface stepLineProps{
    x1:number;
    y1:number;
    x2:number;
    y2:number;
}
function StepLine({x1,y1,x2,y2}:stepLineProps) {
    const pivotX = Math.abs(x2-x1)/2;
    const leftX = x1>x2?x2:x1;
    const RightX = x2>x1?x2:x1;
  return (
    <>
    <line
      x1={leftX}
      y1={y1}
      x2={leftX+pivotX}
      y2={y1}
      stroke="black"
      strokeWidth="1"
    />
     <line
      x1={leftX+pivotX}
      y1={y1}
      x2={leftX+pivotX}
      y2={y2}
      stroke="black"
      strokeWidth="1"
    />
     <line
      x1={leftX+pivotX}
      y1={y2}
      x2={RightX}
      y2={y2}
      stroke="black"
      strokeWidth="1"
    />
    </>
  )
}

export default StepLine