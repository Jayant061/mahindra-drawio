import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar.tsx";
import Leftbar from "../../Components/Leftbar/Leftbar.tsx";
import Menu from "../../Components/Menu/Menu.tsx";
import "./Playground.css";
import d3ToPng from "d3-svg-to-png";
import Block from "../../Components/Block/Block.tsx";
import SLDData from "../../jsonFiles/shapes3.json";
import { Plant } from "../../models/Shape.ts";
import StepLine from "../../Components/Lines/StepLine.tsx";


const PlayGround = () => {
  const [shapes, setShapes] = useState<Plant>(SLDData);
  // const [shapes, setShapes] = useState<Plant>(
  //   {
  //     "id": "ksdf",
  //     "name": "Sld001",
  //     "type": "plant",
  //     blocks: [
  //       {
  //         "id": "asdf",
  //         "name": "Block1",
  //         "type": "plant",
  //         "x" : 200,
  //         "y": 300, 
  //         "elements" : []
  //       }
  //     ]
  //   }
  // );


  
  const [childCoord, setChildCoord] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const svgParentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState<{ x: number, y: number, width: number, height: number }>({ x: 0, y: 0, width: 0, height: 0 });
  const [isBlockDragging, setIsBlockDragging] = useState<boolean>(true)

  const [fixedScale, setfixedScale] = useState(1);

  const handleZoomIn = () => {
    setfixedScale((prevfixedScale) => prevfixedScale / 1.2);
    setZoomLevel((prevZoomLevel) => prevZoomLevel * 1.2);
  };

  const handleZoomOut = () => {
    setfixedScale((prevfixedScale) => prevfixedScale * 1.2);
    setZoomLevel((prevZoomLevel) => prevZoomLevel / 1.2);
  };

  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
    const svg = e.currentTarget;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    if (!isBlockDragging) return;
    setChildCoord(prevCoord => {
      if (Math.abs(prevCoord.x - svgPoint.x) > 5 || Math.abs(prevCoord.y - svgPoint.y) > 5) {
        return {x:svgPoint.x,y:svgPoint.y}
      }
      else {
        return prevCoord;
      }
  })
}

  const handleMouseLeave: MouseEventHandler<SVGSVGElement> = () => { setIsBlockDragging(false) };
const handleMouseUp:MouseEventHandler<SVGSVGElement> = ()=>{
  const svgRect = svgRef.current?.getBBox();
  if(!svgRect)return;
  setViewBox({x:svgRect.x,y:svgRect.y,width:svgRect.width,height:svgRect.height})
}
  const svgRenderingCount = useRef<number>(0)
  useEffect(() => {
    const padding = 20;
    // const padding = 50;
    const svgRect = svgRef.current?.getBBox();
    console.log(svgRect)
    if (!svgRect) return;
    if(svgRect.height)svgRenderingCount.current++;
    svgRenderingCount.current===1?setViewBox({x:svgRect.x-padding,y:svgRect.y-padding,width:svgRect.width,height:svgRect.height}):
    setViewBox(prev=>{return {
      ...prev,
      width: svgRect.width + padding,
      height: svgRect.height + padding,
    }});
  }, [svgRef.current?.getBBox().width, svgRef.current?.getBBox().height]);

  //Downloading Image
  const captureSVG = async () => {
    try {
      const svgSelector = "svg";
      const fileName = "canvas_image";
      const fileData = await d3ToPng(svgSelector, fileName, {
        scale: fixedScale,
        format: "png",
        quality: 1,
        download: false,
        ignore: undefined,
        background: "white",
      });

      const downloadLink = document.createElement("a");
      downloadLink.href = fileData;
      downloadLink.download = `${fileName}.png`; // Specify the file extension
      downloadLink.click();
    } catch (error) {
      console.error("Error capturing SVG:", error);
    }
  };

  const blocks = shapes?.blocks.map((block, index) => {
    const mainLineDistance = 200
    return (
      <React.Fragment key={block.id}>
        {index < shapes.blocks.length - 1 && <StepLine key={index + "blockLine"} x1={block.x + mainLineDistance + 120} y1={block.y} x2={shapes.blocks[index + 1].x + mainLineDistance + 120} y2={shapes.blocks[index + 1].y} />}
        <Block key={index} id={block.id} childCoord={childCoord} block={block} mainLineDistance={mainLineDistance} setShape={setShapes} setIsBlockDrag={setIsBlockDragging} elementStartX={120} isMouseLeave={!isBlockDragging} zoomLevel={zoomLevel} />
      </React.Fragment>
    );
  });
  return (
    <>
      <div className="playground">
        <Topbar captureSVG={captureSVG} />
        <div className="container">
          <div className="leftbar">
            <Leftbar />
          </div>
          <div className="svg" ref={svgParentRef}>
            <div className="menu">
              <Menu />
              <button onClick={handleZoomIn}>zIn</button>
              <button onClick={handleZoomOut}>ZOut</button>
            </div>
            {/* <div                 className="SVG_Canvas"> */}
            <svg
              onLoad={()=>{console.log(svgRef.current?.getBBox())}}
              key={"svg-1"}
              ref={svgRef}
              viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              // onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              style={{
                transformOrigin: `center`,
                transform:`transform(${zoomLevel})`,
                width: `${100}%`,
                height: `${100}%`,
                minWidth: `${viewBox.width}`,
                minHeight: `${viewBox.height}`,
                backgroundImage: `conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0),conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0)`,
                backgroundSize: `${zoomLevel * 50}px ${zoomLevel * 50}px, ${zoomLevel * 10
                  }px ${zoomLevel * 10}px`,
              }}
            >  
              {blocks}        

            </svg>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default PlayGround;
