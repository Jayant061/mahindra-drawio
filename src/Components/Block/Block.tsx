import React, {  MouseEventHandler, useEffect, useRef, useState } from "react";
// import { Shape } from "../../models/Shape";

import { Blocks, Plant } from "../../models/Shape";
import { renderShapes } from "./RenderAssets";
interface blockProps {
  block: Blocks;
  id: string;
  childCoord: { x: number; y: number };
  mainLineDistance:number;
  setShape:React.Dispatch<React.SetStateAction<Plant>>
  setIsBlockDrag:React.Dispatch<React.SetStateAction<boolean>>
  elementStartX:number;
  isMouseLeave:boolean;
  zoomLevel:number;
}
function Block({ block, id, childCoord,mainLineDistance,setShape,elementStartX,setIsBlockDrag,isMouseLeave,zoomLevel }: blockProps) {

  const [blockRect, setBlockRect] = useState(<rect key={"emptyrect"+id} />);
  const isBlockDrag = useRef<boolean>(false);
  const [blockCoords, setBlockCoords] = useState({ x: 0, y: 0 });
  // const [offset,setOffset] = useState({x:0,y:0});
  const [transform, setTransform] = useState({ x: block.x, y: block.y });
  const [prevTransform, setPrevTransform] = useState({ x: block.x, y: block.y });
  const svgGrpRef = useRef<SVGGElement>(null);
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

  useEffect(()=>{
    setBlockCoords({x:blockCoords.x*zoomLevel,y:blockCoords.y*zoomLevel})
  },[zoomLevel])
  useEffect(()=>{

    if(isMouseLeave){
      handleMouseUp();
    }
  },[isMouseLeave])
  
  const handleMouseDown: MouseEventHandler<SVGGElement> = (e) => {
    isBlockDrag.current = true;
    setIsBlockDrag(true)
    const svg = e.currentTarget.ownerSVGElement!;
    // const point = new DOMPoint(e.clientX, e.clientY);
    // const svgPoint = point.matrixTransform(svg.getScreenCTM()!.inverse());
    console.log(svg)
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    setBlockCoords({ x: (svgPoint.x), y: (svgPoint.y) });
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
      setTransform({
        x: childCoord.x - blockCoords.x + prevTransform.x,
        y: childCoord.y - blockCoords.y + prevTransform.y,
      });
    }
  }, [childCoord, isBlockDrag.current]);
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
        y2={renderShapes(block.elements,svgGrpRef.current?.getBBox(),elementStartX,mainLineDistance)?.distanceFromTop}
        stroke="black"
        strokeWidth="1"
        />
      {renderShapes(block.elements,svgGrpRef.current?.getBBox(),elementStartX,mainLineDistance)?.shapes}

      {/* {lines.connector}
      {lines.lines} */}
    </g>
  );
}

export default Block;
