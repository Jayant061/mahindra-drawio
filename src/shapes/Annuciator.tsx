import { FC, useEffect, useRef, useState, } from 'react';

interface AnnuciatorProps {
  x: number;
  y: number;
  id: string,
}

const Annuciator: FC<AnnuciatorProps> = ({ x, y, id, }) => {
  const elementRef = useRef<SVGGElement>(null);
  const width = 100;
  const height = width / 2;


  useEffect(()=>{
     console.log(elementRef.current?.getBBox())
  }, [elementRef.current?.getBBox().height, elementRef.current?.getBBox().width])

  return (
    <g
      ref={elementRef}
      fill="transparent"
      stroke="green"
      strokeWidth="0.5"
      id={`Annuciator${id}`}
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
    >
      <rect width={width} height={height} x={x} y={y} id={`InverterReactangle1`} />
      <text
        id={`InvertedText1`}
        x={x + 0.5 * width}
        y={y + 0.55 * height}
        width={width - 2}
        fontFamily='sans-serif'
        stroke='none'
        fill='green'
        fontSize={20}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        14W
      </text>
    </g>
  );
};

export default Annuciator;

