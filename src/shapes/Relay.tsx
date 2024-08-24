import { FC, useRef } from "react";


interface RelayProps {
  x: number;
  y: number;
  id: string;
  radius: number

}

const Relay: FC<RelayProps> = ({ x, y, radius }): JSX.Element => {
  const cx = x-(11*radius) - 10
  const elementRef = useRef<SVGGElement>(null);
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
      <g key={i} >
        <circle cx={cx + 2 * i * (radius + 1)} cy={y} r={radius} style={{ margin: "0", padding: "0" }} />
        <text
          x={cx + 2 * i * (radius + 1)}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          stroke='none'
          fill='black'>
          {text}  </text>
      </g>
    )
  }

  return (
    <g ref={elementRef} fill="white" stroke="black" strokeWidth="1" x={x} y={y}
      className={"relay"}
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
    >
      {arr}
    </g>
  );
};

export default Relay;
