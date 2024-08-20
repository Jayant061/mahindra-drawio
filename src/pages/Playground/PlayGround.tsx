import { MouseEventHandler, useEffect, useRef, useState } from "react";
import JSON from "../../jsonFiles/shapes.json";
import Topbar from "../../Components/Topbar/Topbar.tsx";
import Leftbar from "../../Components/Leftbar/Leftbar.tsx";
import Menu from "../../Components/Menu/Menu.tsx";
import "./Playground.css";
import d3ToPng from "d3-svg-to-png";
import Block from "../../Components/Block/Block.tsx";
import ParallelLine from "../../Components/Lines/ParallelLine.tsx";

interface Shape {
  name: string;
  x: number;
  y: number;
  radius?: number;
  id: string;
}
interface block {
  id: string;
  name: string;
  x: number;
  y: number;
  elements: string[];
}

const PlayGround = () => {
  const [shapes, setShapes] = useState<block[]>(JSON);
  const [childCoord, setChildCoord] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({x:0,y:0, width: 0, height: 0 });
  // const [verticalLineCoords,setVerticalLineCoords] = useState({maxX:0,minY:0,maxY:0});

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel * 1.2);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel / 1.2);
  };

  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
    setChildCoord({ x: e.clientX, y: e.clientY });
  };
  const handleMouseDown:MouseEventHandler<SVGSVGElement> = (e)=>{
    const svgElement = svgRef.current;
    if(!svgElement) return;
    const point = svgElement?.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const mousePosition = point.matrixTransform(svgElement.getScreenCTM()?.inverse());
    console.log(mousePosition,e.clientX,e.clientY)
  }

  useEffect(() => {
    const svgRect = svgRef.current?.getBBox();
    // const svgEl = svgRef.current?.ownerSVGElement;
    if (!svgRect) return;
    console.log(svgRect)
    setViewBox(svgRect);
  }, []);

  //Downloading Image
  const captureSVG = async () => {
    try {
      const svgSelector = "svg";
      const fileName = "canvas_image";
      const fileData = await d3ToPng(svgSelector, fileName, {
        scale: 3,
        format: "png",
        quality: 1,
        download: false,
        ignore: ".ignored",
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

  const blocks = shapes.map((shape, index) => {
    return (
      <Block
        key={index}
        id={index}
        childCoord={childCoord}
        shapes={shape}
        zoomLevel={zoomLevel}
      />
    );
  });


  const Connections = shapes.map((shape, index) => {

    if(index >= 1){
      return (<ParallelLine key={index} x1={shapes[index-1].x + 500} y1={shape.y} x2={shape.x + 500} y2={shape.y} />);
    }
  });

  return (
    <>
      <div className="playground">
        <Topbar captureSVG={captureSVG} />
        <div className="container">
          <div className="leftbar">
            <Leftbar />
          </div>
          <div
            className="svg"
            // style={{ backgroundSize: `${zoomLevel * 50}px ${zoomLevel * 50}px, ${zoomLevel * 10}px ${zoomLevel * 10}px` }}>
            style={{
              backgroundImage:
                "conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0),conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0)",
              backgroundSize: `${zoomLevel * 50}px ${zoomLevel * 50}px, ${
                zoomLevel * 10
              }px ${zoomLevel * 10}px`,
            }}
          >
            <div className="menu">
              <Menu />
              <button onClick={handleZoomIn}>zIn</button>
              <button onClick={handleZoomOut}>ZOut</button>
            </div>
            {/* <div                 className="SVG_Canvas"> */}
            <svg
              // onLoad={()=>{console.log(new Date().getTime() - startTime)}}
              ref={svgRef}
              viewBox={`${0} ${0} ${viewBox.width-viewBox.x} ${viewBox.height-viewBox.y}`}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              style={{
                transform: `scale(${zoomLevel})`,
                // transformOrigin: `left top`,
                width: `${100 * zoomLevel}%`,
                height: `${100 * zoomLevel}%`,

                // backgroundImage:
                //   "conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0),conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0)",
                // backgroundSize: `${zoomLevel * 50}px ${zoomLevel * 50}px, ${
                //   zoomLevel * 10
                // }px ${zoomLevel * 10}px`,
              }}
            >
              {blocks}
              {Connections}
            </svg>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default PlayGround;
