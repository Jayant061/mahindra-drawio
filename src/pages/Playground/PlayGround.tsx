import { MouseEventHandler, useState } from "react";
import Transformer from "../../shapes/Transformer.tsx";
import Relay from "../../shapes/Relay.tsx";
import Inverter from "../../shapes/Inverter.tsx";
import JSON from "../../jsonFiles/shapes.json";
import Breaker from "../../shapes/Breaker.tsx";
import Topbar from "../../Components/Topbar/Topbar.tsx";
import Leftbar from "../../Components/LeftSidebar/Leftbar.tsx";
import Menu from '../../Components/Menu/Menu.tsx';
import './Playground.css'
import Annuciator from "../../shapes/Annuciator.tsx";
import EnergyMeter from "../../shapes/EnergyMeter.tsx";

interface Shape {
    name: string;
    x: number;
    y: number;
    radius?: number;
    id: string;
}

const PlayGround = () => {
  const [shapes, setShapes] = useState<Shape[]>(JSON);
  // const svgGrpRef = useRef<SVGGElement>()
  // const svgRef = useRef<SVGElement>()
  const [width, setWidth] = useState(100);
  const [childCoord, setChildCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel * 1.2);
    setWidth(prev => 1.2 * prev);
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoomLevel => prevZoomLevel / 1.2);
    setWidth(prev => prev / 1.2);
  };

  const getData = (id: string, data: Shape): void => {
    setShapes((prev) => {
      return prev.map((item) => {
        if (item.id === id) return data;
        return item;
      });
    });
  };

  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
    setChildCoord({ x: e.clientX, y: e.clientY });
  };
  // const [parentCoordinate,setParentCoordinate] = useState({left:0, top:0, right:0, bottom:0})
  // const [originalSvgGrpWidth,setOriginalSvgGrpWidth] = useState(0)
  // useEffect(()=>{
  //   if(!svgRef.current || !svgGrpRef.current)return;
  // setParentCoordinate({left:svgRef.current?.getBoundingClientRect().left, top:svgRef.current?.getBoundingClientRect().top,right: svgRef.current?.getBoundingClientRect().right,bottom:svgRef.current?.getBoundingClientRect().bottom});
  //   setOriginalSvgGrpWidth(svgGrpRef.current?.getBoundingClientRect().width)
  // },[])
  // useEffect(()=>{
  //   // console.log(svgRef.current?.getBoundingClientRect(),svgGrpRef.current?.getBoundingClientRect())
  //   const svgRect = svgRef.current?.getBoundingClientRect();
  //   const svgGrpRect = svgGrpRef.current?.getBoundingClientRect();
  //   // if(!svgGrpRect || !svgRect)return;

  //   if(svgGrpRect.left < svgRect.left || svgGrpRect.top < svgRect.top || svgGrpRect.right > svgRect.right || svgGrpRect.bottom > svgRect.bottom){
  //       setWidth(prev=>2*prev);
  //   }
  //   else if(svgGrpRect.left > svgRect.left || svgGrpRect.top > svgRect.top || svgGrpRect.right < svgRect.right || svgGrpRect.bottom <svgRect.bottom){
  //     setWidth(originalSvgGrpWidth)
  //     console.log(originalSvgGrpWidth)
  //   }
  // },[svgGrpRef.current?.getBoundingClientRect().x,svgGrpRef.current?.getBoundingClientRect().y])

  const renderShapes = () => {
    return shapes.map((shape, index) => {
      switch (shape.name) {
        case 'Relay':
          return (
            <Relay
              key={index}
              name={shape.name}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              radius={shape.radius || 30}
              newCoordOnMove={childCoord}
              getData={getData}
              zoomLevel={zoomLevel}
              className="Relay"
            />
          );
        case 'Transformer':
          return (
            <Transformer
              key={index}
              name={shape.name}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              newCoordOnMove={childCoord}
              zoomLevel={zoomLevel}
              getData={getData}
            />
          );
        case 'Inverter':
          return (
            <Inverter
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              name={shape.name}
              newCoordOnMove={childCoord}
              className='Inverter'
              zoomLevel={zoomLevel}
              getData={getData}
            />
          );
        case "Breaker":
          return (
            <Breaker
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              name={shape.name}
              newCoordOnMove={childCoord}
              zoomLevel={zoomLevel}
              getData={getData}

            />
          );
        case "Annuciator":
          return (
            <Annuciator
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              newCoordOnMove={childCoord}
              zoomLevel={zoomLevel}
              getData={getData}
              name={shape.name}

            />
          );
        case "EnergyMeter":
          return (
            <EnergyMeter
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              radius={shape.radius || 30}
              newCoordOnMove={childCoord}
              zoomLevel={zoomLevel}
              getData={getData}
              name={shape.name}

            />
          );
        default:
          return null;
      }
    });
  };

  const renderLines = () => {
    const lines = [];
    const connector=[];
    let maxX = shapes[0].x;let maxY =shapes[0].y;let minX = shapes[0].x; let minY=shapes[0].y
    for (let i = 0; i < shapes.length; i++) {
      // const shape1 = shapes[i];
      // const shape2 = shapes[i + 1];

        if(shapes[i].x > maxX)maxX = shapes[i].x
        if(shapes[i].y>maxY)maxY=shapes[i].y;
        if(shapes[i].x<minX)minX=shapes[i].x;
        if(shapes[i].y<minY)minY=shapes[i].y;
    }
    for (let i = 0; i < shapes.length; i++) {
      switch(shapes[i].name){
        case "Inverter":
          connector.push(
            <line
            key={`connector${i}`}
            x1={shapes[i].x + 50}
            y1={shapes[i].y}
            x2={maxX+500}
            y2={shapes[i].y}
            stroke="black"
            strokeWidth="1"
            />
          )
          break;
          case "Transformer":
            connector.push(
              <line
            key={`connector${i}`}
            x1={shapes[i].x + 150}
            y1={shapes[i].y+35}
            x2={maxX+500}
            y2={shapes[i].y +35}
            stroke="black"
            strokeWidth="1"
            />
            )
            break;
            case "Relay":
            connector.push(
              <line
            key={`connector${i}`}
            x1={shapes[i].x + 11*(shapes[i].radius||0)+10}
            y1={shapes[i].y}
            x2={maxX+500}
            y2={shapes[i].y}
            stroke="black"
            strokeWidth="1"
            />
            )
            break;
            case "Annuciator":
            connector.push(
              <line
           key={`connector${i}`}
            x1={shapes[i].x + 50}
            y1={shapes[i].y}
            x2={maxX+500}
            y2={shapes[i].y}
            stroke="black"
            strokeWidth="1"
            />
            )
            break;
      }
    }
    lines.push(
      
      <line
        key={`line${0}`}
        x1={maxX+500}
        y1={minY-50}
        x2={maxX + 500}
        y2={maxY+50}
        stroke="black"
        strokeWidth="1"
        />
      
    )
    const connectors = {
      lines,connector
    }
    return connectors;
  };

  return (
    <>
      <div className="playground">
        <Topbar />
        <div className="container">
          <div className="leftbar">
            <Leftbar />
          </div>
          <div className="svg" style={width !== 100 ?{ overflow: "auto" }:{}}>
            <div className="menu">
              <Menu />
              <button onClick={handleZoomIn}>zIn</button>
              <button onClick={handleZoomOut}>ZOut</button>
            </div>
            <svg
            // ref={svgRef}
              onMouseMove={handleMouseMove}
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: `left top`,
                backgroundSize: `${zoomLevel * 50}px ${zoomLevel * 50}px, ${zoomLevel * 10}px ${zoomLevel * 10}px`,
                width: `${width}%`,
                height: `${width}%`
              }}
            >
              <g 
              // ref={svgGrpRef}
              >
              {renderShapes()}
              {renderLines().lines}
              {renderLines().connector}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayGround;
