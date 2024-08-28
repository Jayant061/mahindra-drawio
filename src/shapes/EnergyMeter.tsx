import { FC, useRef } from 'react';
 
interface EnergyMeterProps {
  x: number;
  y: number;
  id: string,
radius:number,
}
 
const EnergyMeter: FC<EnergyMeterProps> = ({  x, y, id,radius}) => {
  const elementRef = useRef<SVGGElement>(null);
  return (
    <g
      ref={elementRef}
      fill="transparent"
      stroke="green"
      strokeWidth="0.5"
      id={`EM${id}`}
      // transform={`translate(${0} ${y})`}
    >
      <circle cx={x-radius} cy={y} r={radius}/>
      <text
        id={`EMText1`}
        x={x-radius}
        y={y}
        fontFamily='sans-serif'
        stroke='none'
        fill='green'
        fontSize={10}
        textAnchor="middle"
        dominantBaseline="middle"
      >MFM
      </text>
    </g>
  );
};
 
export default EnergyMeter;
 
 