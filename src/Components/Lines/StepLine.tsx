import React from 'react'
interface stepLineProps{
    x1:number;
    y1:number;
    x2:number;
    y2:number;
}
function StepLine({x1,y1,x2,y2}:stepLineProps) {
    
    const pivotPoint = (x2-x1);
  return (
    <>
    <line
      x1={x1}
      y1={y1}
      x2={x1+pivotPoint}
      y2={y1}
      stroke="black"
      strokeWidth="1"
    />
     <line
      x1={x1+pivotPoint}
      y1={y1}
      x2={x1+pivotPoint}
      y2={y2}
      stroke="black"
      strokeWidth="1"
    />
     <line
      x1={x1+pivotPoint}
      y1={y2}
      x2={x2}
      y2={y2}
      stroke="black"
      strokeWidth="1"
    />
    </>
  )
}

export default StepLine