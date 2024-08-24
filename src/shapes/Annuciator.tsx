import { FC, useEffect, useRef, useState, } from 'react';

interface AnnuciatorProps {
  x: number;
  y: number;
  id: string,
}

const Annuciator: FC<AnnuciatorProps> = ({ x, y, id, }) => {
  const elementRef = useRef<SVGGElement>(null);
  const [showBoundary, setshowBoundary] = useState<boolean>(false);
  const width = 100;
  const height = width / 2;

  const showBoundaries = () => {
    setshowBoundary(prev => !prev);
    console.log(elementRef.current?.getBBox())
  }

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
      onClick={showBoundaries}
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
    >
      {showBoundary &&       <rect
        x={elementRef.current!.getBBox().x - 5}
        y={elementRef.current!.getBBox().y - 5}
        width={elementRef.current!.getBBox().width + 10}
        height={elementRef.current!.getBBox().height + 10}
        fill="transparent"
        stroke={ "green" }
        style={{ cursor: "auto" }}
        strokeDasharray="5,5"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="10"
          dur="0.2s"
          repeatCount="indefinite"
        />
      </rect>}
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

