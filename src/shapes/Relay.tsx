import { FC, useRef, useState } from "react";


interface RelayProps {
  x: number;
  y: number;
  id: string;
  radius: number

}

const Relay: FC<RelayProps> = ({ x, y, radius }): JSX.Element => {
  const elementRef = useRef<SVGGElement>(null);
  const [showBoundary, setshowBoundary] = useState<boolean>(false);
  const arr = [];
  for (let i = 0; i <= 5; i++) {
    let text = "";
    switch (i) {
      case 0:
        text = "50N";
        break;

      case 1:
        text = "50";
        break;

      case 2:
        text = "51N";
        break;

      case 3:
        text = "51";
        break;

      case 4:
        text = "67N";
        break;

      case 5:
        text = "67";
        break;
    }
    arr.push(
      <g key={i} onClick={() => { console.log(i) }}>
        <circle cx={x + 2 * i * (radius + 1)} cy={y} r={radius} style={{ margin: "0", padding: "0" }} />
        <text
          x={x + 2 * i * (radius + 1)}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          stroke='none'
          fill='black'>
          {text}  </text>
      </g>
    )
  }

  const showBoundaries = () => {
    setshowBoundary(prev => !prev);
    console.log(elementRef.current?.getBBox())
  }

  return (
    <g ref={elementRef} fill="white" stroke="black" strokeWidth="1" x={x} y={y}
      className={"relay"}
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
      onClick={showBoundaries}
    >
      {showBoundary &&       <rect
        x={elementRef.current?.getBBox().x}
        y={elementRef.current?.getBBox().y}
        width={elementRef.current?.getBBox().width}
        height={elementRef.current?.getBBox().height}
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
      {arr}
    </g>

  );
};

export default Relay;
