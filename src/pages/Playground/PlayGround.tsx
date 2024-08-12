import { MouseEventHandler, ReactElement, useEffect, useRef, useState } from "react";
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
import Connector from "../../shapes/Connector.tsx";

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
    const lines:ReactElement[] = [];
    const connector:ReactElement[]=[];
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
            <g key={`connector${i}`}>
            <line
            
            x1={shapes[i].x + 50}
            y1={shapes[i].y}
            x2={maxX+500}
            y2={shapes[i].y}
            stroke="black"
            strokeWidth="1"
            />
            <Connector id={`connector${i}`} x={maxX+500} y={shapes[i].y} zoomLevel={zoomLevel}/>
            </g>
          )
          break;
          case "Transformer":
            connector.push(
              <g key={`connector${i}`}>
              <line
            
            x1={shapes[i].x + 150}
            y1={shapes[i].y+35}
            x2={maxX+500}
            y2={shapes[i].y +35}
            stroke="black"
            strokeWidth="1"
            />
            <Connector id={`connector${i}`} x={maxX+500} y={shapes[i].y+35} zoomLevel={zoomLevel}/>
            </g>
            )
            break;
            case "Relay":
            connector.push(
              <g key={`connector${i}`}>
              <line
            
            x1={shapes[i].x + 11*(shapes[i].radius||0)+10}
            y1={shapes[i].y}
            x2={maxX+500}
            y2={shapes[i].y}
            stroke="black"
            strokeWidth="1"
            />
            <Connector id={`connector${i}`} x={maxX+500} y={shapes[i].y} zoomLevel={zoomLevel}/>
            </g>
            )
            break;
            case "Annuciator":
            connector.push(
              <g  key={`connector${i}`}>
              <line
          
            x1={shapes[i].x + 50}
            y1={shapes[i].y}
            x2={maxX+500}
            y2={shapes[i].y}
            stroke="black"
            strokeWidth="1"
            />
            <Connector id={`connector${i}`} x={maxX+500} y={shapes[i].y} zoomLevel={zoomLevel}/>
            </g>
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
  const svgGrpRef = useRef<SVGGElement>(null)
  const [blockRect,setBlockRect] = useState(<rect/>)
  useEffect(()=>{
    const GrpEL = svgGrpRef.current?.ownerSVGElement;
    const rect = svgGrpRef.current?.getBBox()

    if(!rect || !GrpEL)return;
    console.log(rect)
    setBlockRect(<rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill="transparent" stroke="blue"
      style={{cursor:"auto"}}  strokeDasharray="5,5"
    />)
  },[childCoord
  ])
  // const isBlockDrag = useRef<boolean>(false);
  // const handleMouseDown: = ()
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
              // onMouseDown={}
              key={"block1"}
              style={{border:"2px solid gray"}}
              ref={svgGrpRef}
              >
                {blockRect}
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
