import React, {  MouseEventHandler, useEffect, useRef, useState } from "react";
// import { Shape } from "../../models/Shape";
import EnergyMeter from "../../shapes/EnergyMeter";
import Annuciator from "../../shapes/Annuciator";
import Breaker from "../../shapes/Breaker";
import Inverter from "../../shapes/Inverter";
import Transformer from "../../shapes/Transformer";
import Relay from "../../shapes/Relay";
import { Blocks, Plant } from "../../models/Shape";
import Connector from "../../shapes/Connector";
interface blockProps {
  block: Blocks;
  id: string;
  childCoord: { x: number; y: number };
  // zoomLevel: number;
  // origin:{x:number,y:number}
  mainLineDistance:number;
  setShape:React.Dispatch<React.SetStateAction<Plant>>
  elementStartX:number;
}
function Block({ block, id, childCoord,mainLineDistance,setShape,elementStartX }: blockProps) {
  const radius = 20;
  const gap = 30;
  const transformerLength = 120;
  const rectLength = 50
  const breakerLength = 70;
  let distanceFromTop = gap;
  const [blockRect, setBlockRect] = useState(<rect key={"emptyrect"+id} />);
  const isBlockDrag = useRef<boolean>(false);
  const [blockCoords, setBlockCoords] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ x: block.x, y: block.y });
  const [prevTransform, setPrevTransform] = useState({ x: block.x, y: block.y });
  const svgGrpRef = useRef<SVGGElement>(null);
  // const [distanceBetweenComp,setDistanceBetweenComp,] = useState<number>(10);
  const renderShapes = () => {
    const rect = svgGrpRef.current?.getBBox();
    if(!rect)return;
    return block.elements.map((element, index) => {
      switch (element.name) {
        case "Relay":
          return (
            <React.Fragment key={element.id}>
              <Relay
                key={element.id}
                id={element.id}
                x={elementStartX}
                y={distanceFromTop}
                radius={radius}
              />
              <Connector
                id="connector1"
                key={"connector"+element.id}
                x1={elementStartX}
                y1={distanceFromTop}
                x={elementStartX + mainLineDistance}
                y={distanceFromTop}
              />
              {distanceFromTop +=(gap+2*radius)}
            </React.Fragment>
          );
        case "Transformer":
          return (
            <React.Fragment key={element.id}>
            <Transformer
              key={element.id}
              id={element.id}
              x={elementStartX + mainLineDistance}
              y={distanceFromTop}
              
              />
            {distanceFromTop +=(gap+transformerLength)}
              </React.Fragment>
          );
        case "Inverter":
          return (
            <React.Fragment key={element.id}>
            <Inverter
              key={element.id}
              id={element.id}
              x={elementStartX + mainLineDistance}
              y={distanceFromTop}
              />
              {distanceFromTop +=(gap+rectLength)}
              </React.Fragment>
          );
        case "Breaker":
          return (
            <React.Fragment key={element.id}>
            <Breaker
              key={element.id}
              id={element.id}
              x={elementStartX + mainLineDistance}
              y={distanceFromTop}
              />
              {distanceFromTop +=(gap+breakerLength)}
              </React.Fragment>
          );
        case "Annuciator":
          return (
            <React.Fragment key={element.id}>
              <Annuciator
                key={element.id}
                id={element.id}
                x={elementStartX}
                y={distanceFromTop}
              />
              <Connector
                id="connector1"
                key={"connector"+element.id}
                x1={elementStartX}
                y1={distanceFromTop}
                x={elementStartX + mainLineDistance}
                y={distanceFromTop}
              />
              {distanceFromTop +=(gap+rectLength)}
            </React.Fragment>
          );
        case "EnergyMeter":
          return (
            <React.Fragment key={element.id}>
              <EnergyMeter
                
                id={element.id + "realy" + index}
                x={elementStartX}
                y={distanceFromTop}
                radius={radius}
              />
              <Connector
                id="connector1"
                key={"connector"+element.id}
                x1={elementStartX}
                y1={distanceFromTop}
                x={elementStartX + mainLineDistance}
                y={distanceFromTop}
              />
              {distanceFromTop +=(gap+2*radius)}
            </React.Fragment>
          );
        default:
          return null;
      }
    });
  };
  useEffect(() => {
    setShape((prevShape) => {
      const newBlocks = prevShape.blocks.map((block) => {
        if (block.id === id) {
          return { ...block, x: transform.x, y: transform.y };
        } else {
          return block;
        }
      });
      return { ...prevShape, blocks: newBlocks };
    });
  }, [transform]);
  
  const handleMouseDown: MouseEventHandler<SVGGElement> = (e) => {
    isBlockDrag.current = true;
    const svg = e.currentTarget.ownerSVGElement!;
    const point = new DOMPoint(e.clientX, e.clientY);

    // Convert the screen coordinates to SVG coordinates
    const svgPoint = point.matrixTransform(svg.getScreenCTM()!.inverse());
    setBlockCoords({ x: svgPoint.x, y: svgPoint.y });
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
      key={"rect"+id}
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
      // setTransform({
      //   x:
      //     (childCoord.x - blockCoords.x + prevTransform.x * zoomLevel) /
      //     zoomLevel,
      //   y:
      //     (childCoord.y - blockCoords.y + prevTransform.y * zoomLevel) /
      //     zoomLevel,
      // });
      setTransform({
        x: childCoord.x - blockCoords.x + prevTransform.x,
        y: childCoord.y - blockCoords.y + prevTransform.y,
      });
    }
  }, [childCoord, isBlockDrag]);
  return (
    <g
      transform={`translate(${transform.x} ${transform.y})`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      key={block.id}
      style={isBlockDrag.current ? { border: "2px solid gray" } : {}}
      ref={svgGrpRef}
      fill="green"
      stroke="green"
    >
      {blockRect}
      <line
        key={block.id+"line"}
        x1={elementStartX + mainLineDistance}
        y1={0}
        x2={elementStartX + mainLineDistance}
        y2={renderShapes()?.length && distanceFromTop}
        stroke="black"
        strokeWidth="1"
        />
        {distanceFromTop = gap}
      {renderShapes()}

      {/* {lines.connector}
      {lines.lines} */}
    </g>
  );
}

export default Block;
