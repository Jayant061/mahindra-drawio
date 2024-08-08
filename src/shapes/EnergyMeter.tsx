import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
 
interface EnergyMeterProps {
//   uniqueId: string;
//   value: string;
  x: number;
  y: number;
  id: string,
radius:number,
newCoordOnMove:{x:number,y:number}


}
 
const EnergyMeter: FC<EnergyMeterProps> = ({  x, y, id, radius, newCoordOnMove  }) => {
  const elementRef = useRef<SVGGElement>(null);
  const [coord,setCoord] = useState({x:x,y:y})
  const[offset,setOffset] = useState({x:0,y:0});
  // const [transform,setTransform] = useState(`translate(${coord.x} ${coord.y})`);
  const isClicked = useRef<boolean>(false);
  
  const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
      isClicked.current = true;
    //   const rect = elementRef.current?.getBoundingClientRect();
    //   console.log(rect)
      // console.log(id)
      setOffset({x:e.clientX-coord.x,y:e.clientY-coord.y});
      // onMouseDown()
  }
  const handleMouseUp = ()=>{
      isClicked.current = false;
      // console.log(coord.x, coord.y)
  }
  function setcoordinate(x:number,y:number){
      setCoord({x,y});
  }


  useEffect(()=>{

      if(isClicked.current){
          setcoordinate(newCoordOnMove.x-offset.x,newCoordOnMove.y-offset.y);
          console.log(coord)
        // setTransform(`translate(${newCoordOnMove.x-offset.x} ${newCoordOnMove.y-offset.y})`)
      }

  },[newCoordOnMove])
 

  return (
    <g
      ref={elementRef}
      fill="transparent"
      stroke="green"
      strokeWidth="0.5"
      id={`EM${id}`}
      transform={`translate(${coord.x} ${coord.y})`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <circle cx={coord.x} cy={coord.y} radius={radius} id={`EM${id}`}/>
      {/* <text x="50%" y="50%" text-anchor="middle" fill="green" font-size="16px" font-family="Arial" dy=".3em">14W</text> */}
    </g>
  );
};
 
export default EnergyMeter;
 
 