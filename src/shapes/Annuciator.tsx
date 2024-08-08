import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
 
interface AnnuciatorProps {
//   uniqueId: string;
//   value: string;
  x: number;
  y: number;
  id: string,
newCoordOnMove:{x:number,y:number}


}
 
const Annuciator: FC<AnnuciatorProps> = ({  x, y, id, newCoordOnMove  }) => {
  const elementRef = useRef<SVGGElement>(null);
  const [coord,setCoord] = useState({x:x,y:y})
  const[offset,setOffset] = useState({x:0,y:0});
  // const [transform,setTransform] = useState(`translate(${coord.x} ${coord.y})`);
  const isClicked = useRef<boolean>(false);
  const width = 100;
  const height = width / 2;
  
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
 
 