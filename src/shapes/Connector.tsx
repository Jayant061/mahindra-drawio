import React, { FC } from 'react'
interface connectorProps{
    x:number,
    y:number,
    id:string,
    zoomLevel:number

}
const Connector:FC<connectorProps> = ({x,y})=> {
    const yOffset = 20;
    const lineLength = 20
  return (
    <g
    strokeWidth={2}
    >
        {/* top */}
        <line x1={x-lineLength/2} y1={(y- yOffset)} x2={(x+ lineLength/2)} y2={(y- yOffset)} stroke='black'/>
        {/* mid */}
        <line x1={x} y1={y} x2={(x+ lineLength/2)} y2={y} stroke='black'/>
        {/* bottom */}
        <line x1={x-lineLength/2} y1={(y + yOffset)} x2={(x+ lineLength/2)} y2={(y + yOffset)} stroke='black'/>
        top arc 
        <path
        d={`M ${x+ lineLength/2} ${y- yOffset} A ${yOffset/2} ${yOffset/2} 0 0 1 ${x+ lineLength/2} ${ y}`} 
        fill="none" 
        stroke={"black"} 
        strokeWidth={2} 
      />
      <path
    //   starting point  center of circle at the point end point
        d={`M ${x+ lineLength/2} ${y} A ${yOffset/2} ${yOffset/2} 0 0 1 ${x+ lineLength/2} ${y+ yOffset}`} 
        fill="none" 
        stroke={"black"} 
      />
        </g>
  )
}

export default Connector