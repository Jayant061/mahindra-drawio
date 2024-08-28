import React from 'react'
interface FloaterProps {
    x: number;
    y: number;
    id: string,
  }
function Floater({x,y,id}:FloaterProps) {
    const width = 100;
    const height = 50;
  return (
    <g
      
      fill="transparent"
      stroke="green"
      strokeWidth="0.5"
      id={`Annuciator${id}`}
    >
      <rect width={width} height={height} x={x-width} y={y-height/2} id={`InverterReactangle1`} />
      <text
        id={`InvertedText1`}
        x={x - 0.5 * width}
        y={y}
        width={width - 2}
        fontFamily='sans-serif'
        stroke='none'
        fill='green'
        fontSize={20}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        FLoater
      </text>
    </g>
  )
}

export default Floater