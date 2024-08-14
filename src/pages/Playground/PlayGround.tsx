import { MouseEventHandler, useEffect, useRef, useState } from "react";
import JSON from "../../jsonFiles/shapes.json";
import Topbar from "../../Components/Topbar/Topbar.tsx";
import Leftbar from "../../Components/Leftbar/Leftbar.tsx";
import Menu from '../../Components/Menu/Menu.tsx';
import './Playground.css'
import d3ToPng from 'd3-svg-to-png';
import Block from "../../Components/Block/Block.tsx";

interface Shape {
  name: string;
  x: number;
  y: number;
  radius?: number;
  id: string;
}

const PlayGround = () => {
  const [shapes, setShapes] = useState<Shape[]>(JSON);
  const [childCoord, setChildCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const svgGrpRef = useRef<SVGGElement>(null)
  const [blockRect, setBlockRect] = useState(<rect />)
  const isBlockDrag = useRef<boolean>(false);
  const [blockCoords, setBlockCoords] = useState({ x: 0, y: 0 })
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [prevTransform, setPrevTransform] = useState({ x: 0, y: 0 });
  const [viewBoxCoordinates, setviewBoxCoordinates] = useState({ x: 1000, y: 1000 });

  // const [verticalLineCoords,setVerticalLineCoords] = useState({maxX:0,minY:0,maxY:0});

  useEffect(() => {
    const GrpEL = svgGrpRef.current?.ownerSVGElement;
    const rect = svgGrpRef.current?.getBBox()
    if (!rect || !GrpEL) return;
    setBlockRect(<rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill="transparent" stroke={isBlockDrag.current ? "blue" : "transparent"}
      style={{ cursor: "auto" }} strokeDasharray="5,5"
    />)
    if (isBlockDrag.current) {
      setTransform({ x: (childCoord.x - blockCoords.x + prevTransform.x * zoomLevel) / zoomLevel, y: (childCoord.y - blockCoords.y + prevTransform.y * zoomLevel) / zoomLevel })
    }
  }, [childCoord, isBlockDrag]);



  const handleZoomIn = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel * 1.2);
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel / 1.2);
  };


  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
    setChildCoord({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const GrpEL = svgGrpRef.current?.ownerSVGElement;
    const rect = svgGrpRef.current?.getBBox()

    if (!rect || !GrpEL) return;
    // console.log(rect)
    setBlockRect(<rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill="transparent" stroke="blue"
      style={{ cursor: "auto" }} strokeDasharray="5,5"
    />)
  }, [childCoord])

  //Downloading Image
  const captureSVG = async () => {
    try {
      const svgSelector = 'svg';
      const fileName = 'canvas_image';
      const fileData = await d3ToPng(svgSelector, fileName, {
        scale: 3,
        format: 'png',
        quality: 1,
        download: false,
        ignore: '.ignored',
        background: 'white'
      });

      const downloadLink = document.createElement('a');
      downloadLink.href = fileData;
      downloadLink.download = `${fileName}.png`;  // Specify the file extension
      downloadLink.click();
    } catch (error) {
      console.error('Error capturing SVG:', error);
    }
  };



  const handleMouseDown: MouseEventHandler = (e) => {
    isBlockDrag.current = true;
    setBlockCoords({ x: e.clientX, y: e.clientY });
  }

  const handleMouseUp = () => {
    isBlockDrag.current = false;
    setPrevTransform(transform);
  }
  
  const handleMouseLeave: MouseEventHandler = (e) => {
       isBlockDrag.current = false;
  }


  return (
    <>
      <div className="playground">
        <Topbar captureSVG={captureSVG} />
        <div className="container">
          <div className="leftbar">
            <Leftbar />
          </div>
          <div className="svg"
            // style={{ backgroundSize: `${zoomLevel * 50}px ${zoomLevel * 50}px, ${zoomLevel * 10}px ${zoomLevel * 10}px` }}>
            >
              <div className="menu">
              <Menu />
              <button onClick={handleZoomIn}>zIn</button>
              <button onClick={handleZoomOut}>ZOut</button>
            </div>
            {/* <div                 className="SVG_Canvas"> */}
              <svg
                viewBox={`0 0 ${viewBoxCoordinates.x} ${viewBoxCoordinates.y}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `left top`,
                  width: `${100 * zoomLevel}%`,
                  height: `${100 * zoomLevel}%`,
                  minWidth:"200%",
                  minHeight:"200%",
                  backgroundImage:"conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0),conic-gradient(at calc(100% - 1px) calc(100% - 1px), var(--line-color-1) 270deg, #0000 0)",
                  backgroundSize: `${zoomLevel * 50}px ${zoomLevel * 50}px, ${zoomLevel * 10}px ${zoomLevel * 10}px`
                }}
              >
                <g
                  transform={`translate(${transform.x} ${transform.y})`}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  key={"block1"}
                  style={isBlockDrag.current ? { border: "2px solid gray" } : {}}
                  ref={svgGrpRef}
                >
                  {blockRect}
                  
                  <Block shapes={shapes}/>
                </g>
              </svg>
            </div>

          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default PlayGround;
