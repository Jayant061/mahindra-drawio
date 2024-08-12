import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Shape } from '../models/Shape';
 
interface AnnuciatorProps {
//   uniqueId: string;
//   value: string;
  x: number;
  y: number;
  id: string,
newCoordOnMove:{x:number,y:number},
zoomLevel:number
getData:(id:string,data:Shape)=>void
  name:string


}
 
const Annuciator: FC<AnnuciatorProps> = ({  x, y, id, newCoordOnMove, zoomLevel,getData,name  }) => {
  const elementRef = useRef<SVGGElement>(null);
  const [coord,setCoord] = useState({x:x,y:y})
  const[offset,setOffset] = useState({x:0,y:0});
  // const [transform,setTransform] = useState(`translate(${coord.x} ${coord.y})`);
  const isClicked = useRef<boolean>(false);
  const width = 100;
  const height = width / 2;
  
  useEffect(()=>{
    if(isClicked.current){
      setCoord(
        {x:(newCoordOnMove.x-offset.x)/zoomLevel,
          y:(newCoordOnMove.y-offset.y)/zoomLevel
        });
  }
  },[newCoordOnMove,offset])
  
  const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
    // console.log(rect,radius,coord);
    setOffset({x:(e.clientX-coord.x*zoomLevel),y:(e.clientY-coord.y*zoomLevel)})
    isClicked.current = true
    // console.log(id)
  }
  
  const handleMouseUp = ()=>{
      isClicked.current = false;
      // console.log(coord.x, coord.y)
      getData(id,{id,name,x:coord.x,y:coord.y})
  }
 
 
  return (
    <g
      ref={elementRef}
      fill="transparent"
      stroke="green"
      strokeWidth="0.5"
      id={`Annuciator${id}`}
      transform={`translate(${coord.x} ${coord.y})`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <rect width={width} height={height} x={0} y={0} id={`InverterReactangle1`} />
      <text
        id={`InvertedText1`}
        x={0.5 * width}
        y={0.55 * height}
        width={width - 2}
        fontFamily='sans-serif'
        stroke='none'
        fill='green'
        fontSize={20}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        14W
      </text>
    </g>
  );
};
 
export default Annuciator;
 
 