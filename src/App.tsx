import { MouseEventHandler, useState } from "react";
import Transformer from "./shapes/Transformer";
import Relay from "./shapes/Relay";
import Inverter from "./shapes/Inverter";
import qwert from "./jsonFiles/shapes.json";
import Breaker from "./shapes/Breaker";
import "./App.css"
import Topbar from "./components/topbar/Topbar";
import Leftbar from "./components/leftSidebar/Leftbar";
import Menu from './Components/Menu/Menu.tsx';
import './App.css'

interface Shape {
  name: string;
  x: number;
  y: number;
  radius?: number;
  id:string
}

function App() {
  // Define the initial state with types for shapes
  const [shapes, setShapes] = useState<Shape[]>(qwert);

  // State to track the coordinates of the mouse
  const [childCoord, setChildCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const getData = (id:string,data:Shape):void=>{
    setShapes((prev)=>{
      return prev.map((item)=>{
        
        if(item.id === id)return data;
        return item
      })
    })
  }
  // Handler for mouse move event
  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (e) => {
    setChildCoord({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
    <div className="app">
      <div className="menu"></div>
    <svg width="100vw" height="100vh" onMouseMove={handleMouseMove}>
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
          default:
            return null;
        }
      })}
    </svg>
    </div>
    </>
  );
}

export default App;
