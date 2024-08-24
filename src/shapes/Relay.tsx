import { FC, useRef } from "react";

interface RelayProps {
  x1: number;
  y1: number;
  id: string;

  radius: number;
}

const Relay: FC<RelayProps> = ({ x1, y1, radius }): JSX.Element => {
  const x = x1-11*radius-10;
  const y = y1;
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
      <g
        key={i}
      >
        <circle
          cx={x + 2 * i * (radius + 1)}
          cy={y}
          r={radius}
          style={{ margin: "0", padding: "0" }}
        />
        <text
          x={x + 2 * i * (radius + 1)}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="none"
          fill="black"
        >
          {text}{" "}
        </text>
      </g>
    );
  }
  return (
    <g
      ref={elementRef}
      fill="white"
      stroke="black"
      strokeWidth="1"
      x={x}
      y={y}
      className={"relay"}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      // onMouseUp={handleMouseUp}
    >
      {arr}
    </g>
  );
};

export default Relay;
