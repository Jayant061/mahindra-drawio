import React from 'react'
interface parallelLineProps{
x1:number,
y1:number,
x2:number,
y2:number
}
function ParallelLine({x1,y1,x2,y2}:parallelLineProps) {
  return (
    <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth="1"
            />
  )
}

export default ParallelLine