import React, { MouseEventHandler, useEffect, useState } from 'react';
import Transformer from './components/Transformer';
import Relay from './components/Relay';
import Inverter from './components/Inverter';
import qwert from './jsonFiles/shapes.json'

// Define types for shape objects if needed
interface Shape {
  name: string;
  x?: number;
  y?: number;
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

  useEffect(()=>{
    console.log(shapes)
  },[shapes])

  return (
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
                x={shape.x || 0}
                y={shape.y || 0}
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
                x={shape.x || 0}
                y={shape.y || 0}
                newCoordOnMove={childCoord}
              />
            );
          case 'Inverter':
            return (
              <Inverter
              key={index}
              id={shape.id}
                x={shape.x || 0}
                y={shape.y || 0}
                newCoordOnMove={childCoord}
              />
            );
          default:
            return null;
        }
      })}
    </svg>
  );
}

export default App;


