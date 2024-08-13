import { FC, useRef } from 'react';
 
interface EnergyMeterProps {
  x: number;
  y: number;
  id: string,
radius:number,
}
 
const EnergyMeter: FC<EnergyMeterProps> = ({  x, y, id}) => {
  const elementRef = useRef<SVGGElement>(null);
  return (
    <g
      ref={elementRef}
      fill="transparent"
      stroke="green"
      strokeWidth="0.5"
      id={`EM${id}`}
      transform={`translate(${x} ${y})`}
      onMouseDown={(e)=>{e.preventDefault(); e.stopPropagation()}}
    >
      <circle cx={x} cy={y} r={30}/>
      <text
        id={`EMText1`}
        x={x}
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
 
 