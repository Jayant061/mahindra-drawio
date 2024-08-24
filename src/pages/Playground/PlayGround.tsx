import { MouseEventHandler, useEffect, useRef, useState } from "react";
import JSON from "../../jsonFiles/shapes.json";
import TJSON from "../../jsonFiles/example.json"
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

interface Plant {
  id: string;
  name: string;
  type: string;
  blocks: Blocks[];
}

interface Blocks {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  assets: Assets[];
}

interface Assets {
  id: string;
  name: string;
  x: number;
  y: number;
  status: string;
  connectedTo: ParentAssets[];
}

interface ParentAssets {
  id: string,
  connection_type: string
}

const PlayGround = () => {
  const [shapes, setShapes] = useState<block[][]>(JSON);
  const [jsonContent, setjsonContent] = useState<Plant>(TJSON);
  const [childCoord, setChildCoord] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoomLevel, setZoomLevel] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);
  const svgRect = svgRef.current?.getBBox();
  const [viewBox, setViewBox] = useState({ width: 0, height: 0 });


  const [fixedScale, setfixedScale] = useState(1);

  const plant = {
    name: jsonContent.name,
    id: jsonContent.id,

  }

  const blocks = [
    jsonContent.blocks
  ]

  const handleZoomIn = () => {
    setfixedScale((prevfixedScale) => prevfixedScale / 1.2)
    setZoomLevel((prevZoomLevel) => prevZoomLevel * 1.2);
  };

  const handleZoomOut = () => {
    setfixedScale((prevfixedScale) => prevfixedScale * 1.2)
    setZoomLevel((prevZoomLevel) => prevZoomLevel / 1.2);
  };

  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
    setChildCoord({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave: MouseEventHandler<SVGSVGElement> = (e) => {
  }

  useEffect(() => {
    if (!svgRect) return;
    if (svgRect.x > 0 && svgRect.y > 0) {
      setViewBox({
        width: svgRect.width + 150,
        height: svgRect.height + 100,
      });
    }
  }, [svgRect?.width, svgRect?.height]);

  //Downloading Image
  const captureSVG = async () => {
    console.log(fixedScale)
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

  const row = shapes.flatMap((block, blockIndex) =>
    block.map((shape, shapeIndex) => (
      <Block
        key={`${blockIndex}-${shapeIndex}`}  // Unique key combining indices
        id={shapeIndex}
        childCoord={childCoord}
        shapes={shape}
        zoomLevel={zoomLevel}
      />
    ))
  )

  // const block = blocks.map((block) => {
  //   console.log(block)
  //   console.log(block.assets)
  // })







  // const Connections = shapes.map((shape, index) => {

  //   if(index >= 1){
  //     return (<ParallelLine key={index} x1={shapes[index-1].x + 500} y1={shape.y} x2={shape.x + 500} y2={shape.y} />);
  //   }
  // });

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
              viewBox={`${0} ${0} ${viewBox.width} ${viewBox.height}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: `left top`,
                width: `${100}%`,
                height: `${100}%`,
                minWidth: `${viewBox.width}`,
                minHeight: `${viewBox.height}`,

                backgroundImage:
                  "conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0),conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0)",
                backgroundSize: `${zoomLevel * 50}px ${zoomLevel * 50}px, ${zoomLevel * 10
                  }px ${zoomLevel * 10}px`,
              }}
            >
              {/* <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"
               />
              <rect x="60" y="10" rx="10" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5" /> */}
              {row}
              {/* {Connections} */}
            </svg>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default PlayGround;