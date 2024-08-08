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
    id:string
  }

const PlayGround = () => {

  const [shapes, setShapes] = useState<Shape[]>(JSON);

  const [childCoord, setChildCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const getData = (id:string,data:Shape):void=>{
    setShapes((prev)=>{
      return prev.map((item)=>{
        
        if(item.id === id)return data;
        return item
      })
    })
  }
  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
    setChildCoord({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
    <div className="app">
        <div className="Topbar">
          <Topbar />
        </div>
        <div className="container">

          <div className="leftbar">
            <Leftbar />
        </div>
    <div className="svg">
        <div className="menu">
          <Menu />
        </div>
    <svg  onMouseMove={handleMouseMove} >
      {/* Conditionally render components based on the shapes state */}
      {shapes.map((shape, index) => {
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
                getData = {getData}
              />
            );
          case 'Transformer':
            return (
              <Transformer
              key={index}
              id={shape.id}
                x={shape.x}
                y={shape.y}
                newCoordOnMove={childCoord}
              />
            );
          case 'Inverter':
            return (
              <Inverter
              key={index}
              id={shape.id}
                x={shape.x}
                y={shape.y}
                newCoordOnMove={childCoord}
              />
            );
            case "Breaker":
            return (
              <Breaker
              key={index}
              id={shape.id}
                x={shape.x}
                y={shape.y}
                newCoordOnMove={childCoord}
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
              />
            );
            case "Energy Meter":
            return (
              <EnergyMeter
              key={index}
              id={shape.id}
                x={shape.x}
                y={shape.y}
                radius={shape.radius || 30}
                newCoordOnMove={childCoord}
              />
            );
          default:
            return null;
        }
      })}
    </svg>
    </div>
    </div>
    </div>
    </>
  )
}

export default PlayGround