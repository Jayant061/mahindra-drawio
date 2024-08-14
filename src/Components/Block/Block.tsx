import { MouseEventHandler, useEffect, useRef, useState } from "react";
// import { Shape } from "../../models/Shape";
import EnergyMeter from "../../shapes/EnergyMeter";
import Annuciator from "../../shapes/Annuciator";
import Breaker from "../../shapes/Breaker";
import Inverter from "../../shapes/Inverter";
import Transformer from "../../shapes/Transformer";
import Relay from "../../shapes/Relay";
import { renderLines } from "../Lines/Lines";
interface blockProps {
  shapes: {
    id: string;
    name: string;
    x: number;
    y: number;
    elements: string[];
  };
  key: number;
  childCoord: { x: number; y: number };
  zoomLevel: number;
}
function Block({ shapes, key, childCoord, zoomLevel }: blockProps) {
  const radius = 20;
  const gap = 60
  const [blockRect, setBlockRect] = useState(<rect />);
  const isBlockDrag = useRef<boolean>(false);
  const [blockCoords, setBlockCoords] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [prevTransform, setPrevTransform] = useState({ x: 0, y: 0 });
  const svgGrpRef = useRef<SVGGElement>(null);

  const lines = renderLines(shapes.elements, shapes.x, shapes.y,gap);
  const renderShapes = () => {
    return shapes.elements.map((shape, index) => {
      switch (shape) {
        case "Relay":
          return (
            <Relay
              key={index}
              id={shapes.id + "realy" + index}
              x={shapes.x + 100}
              y={shapes.y + gap * (index + 1)}
              radius={radius}
            />
          );
        case "Transformer":
          return (
            <Transformer
              key={index}
              id={shapes.id + "realy" + index}
              x={shapes.x + 350}
              y={shapes.y + gap * (index + 1)}
            />
          );
        case "Inverter":
          return (
            <Inverter
              key={index}
              id={shapes.id + "realy" + index}
              x={shapes.x + 100 + 11*radius+10-100}
              y={shapes.y + gap * (index + 1)}
            />
          );
        case "Breaker":
          return (
            <Breaker
              key={index}
              id={shapes.id + "realy" + index}
              x={shapes.x + 500}
              y={shapes.y + gap* (index + 1)}
            />
          );
        case "Annuciator":
          return (
            <Annuciator
              key={index}
              id={shapes.id + "realy" + index}
              x={shapes.x + 100}
              y={shapes.y + gap * (index + 1)}
            />
          );
        case "EnergyMeter":
          return (
            <EnergyMeter
              key={index}
              id={shapes.id + "realy" + index}
              x={shapes.x + 100}
              y={shapes.y + gap*(index + 1)}
              radius={radius}
            />
          );
        default:
          return null;
      }
    });
  };
  const handleMouseDown: MouseEventHandler = (e) => {
    isBlockDrag.current = true;
    setBlockCoords({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => {
    isBlockDrag.current = false;
    setPrevTransform(transform);
  };
  useEffect(() => {
    const GrpEL = svgGrpRef.current?.ownerSVGElement;
    const rect = svgGrpRef.current?.getBBox();
    if (!rect || !GrpEL) return;
    setBlockRect(
      <rect
  x={rect.x}
  y={rect.y}
  width={rect.width}
  height={rect.height}
  fill="transparent"
  stroke={isBlockDrag.current ? "blue" : "transparent"}
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
</rect>

    );
    if (isBlockDrag.current) {
      setTransform({
        x:
          (childCoord.x - blockCoords.x + prevTransform.x * zoomLevel) /
          zoomLevel,
        y:
          (childCoord.y - blockCoords.y + prevTransform.y * zoomLevel) /
          zoomLevel,
      });
    }
  }, [childCoord, isBlockDrag]);
  return (
    <g
      transform={`translate(${transform.x} ${transform.y})`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      key={key}
      style={isBlockDrag.current ? { border: "2px solid gray" } : {}}
      ref={svgGrpRef}
      fill="green"
      stroke="green"
    >
      {blockRect}
      {renderShapes()}
      {lines.connector}
      {lines.lines}
    </g>
  );
}

export default Block;
