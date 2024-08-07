import { MouseEventHandler, useEffect, useRef, useState } from 'react'
type BreakerProps = {
x:number,
y:number
newCoordOnMove:{x:number,y:number}
id:string

}
function Breaker(props:BreakerProps) {
    const {id,x,y,newCoordOnMove} = props
    const scale = 0.4
    const elementRef = useRef<SVGGElement>(null);
    const[offset,setOffset] = useState({x:0,y:0});
    const[coord,setCoord] = useState({x:x,y:y});
    const isClicked = useRef<boolean>(false);

    const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
        const rect = elementRef.current?.getBoundingClientRect();
        if(!rect) return;
        // console.log(rect,coord);
        setOffset({x:e.clientX-coord.x,y:e.clientY-coord.y})
        isClicked.current = true;
      }
      const handleMouseUp = ()=>{
        isClicked.current = false;
      }

  
      useEffect(()=>{
        if(isClicked.current){
            setCoord({x:newCoordOnMove.x-offset.x,y:newCoordOnMove.y-offset.y})
        }

      },[newCoordOnMove,offset])
  return (
  <g transform={`translate(${coord.x} ${coord.y}) scale(${scale})`} 
  ref={elementRef}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
  id={id}
>
  <path
    d={`M ${25 + x} ${214 + y} L ${25 + x} ${14 + y}`}
    fill="none"
    stroke="#66ff66"
    strokeWidth={7}
    strokeMiterlimit="10"
    pointerEvents="stroke"
  />
  <ellipse
    cx={25 + x}
    cy={74 + y}
    rx={10}
    ry={10}
    fill="#80ff00"
    stroke="#66ff66"
    strokeWidth={7}
    pointerEvents="all"
  />
  <ellipse
    cx={25 + x}
    cy={154 + y}
    rx={10}
    ry={10}
    fill="#80ff00"
    stroke="#66ff66"
    strokeWidth={7}
    pointerEvents="all"
  />
  <path
    d={`M ${25 + x} ${184 + y} L ${45 + x} ${164 + y}`}
    fill="none"
    stroke="#66ff66"
    strokeWidth={7}
    strokeMiterlimit="10"
    pointerEvents="stroke"
  />
  <path
    d={`M ${25 + x} ${184 + y} L ${5 + x} ${164 + y}`}
    fill="none"
    stroke="#66ff66"
    strokeWidth={7}
    strokeMiterlimit="10"
    pointerEvents="stroke"
  />
  <path
    d={`M ${25 + x} ${44 + y} L ${5 + x} ${64 + y}`}
    fill="none"
    stroke="#66ff66"
    strokeWidth={7}
    strokeMiterlimit="10"
    pointerEvents="stroke"
  />
  <path
    d={`M ${25 + x} ${44 + y} L ${45 + x} ${64 + y}`}
    fill="none"
    stroke="#66ff66"
    strokeWidth={7}
    strokeMiterlimit="10"
    pointerEvents="stroke"
  />
  <path
    d={`M ${25 + x} ${16 + y} L ${5 + x} ${36 + y}`}
    fill="none"
    stroke="#66ff66"
    strokeWidth={7}
    strokeMiterlimit="10"
    pointerEvents="stroke"
  />
  <path
    d={`M ${25 + x} ${16 + y} L ${45 + x} ${36 + y}`}
    fill="none"
    stroke="#66ff66"
    strokeWidth={7}
    strokeMiterlimit="10"
    pointerEvents="stroke"
  />
  <path
    d={`M ${25 + x} ${211 + y} L ${45 + x} ${191 + y}`}
    fill="none"
    stroke="#66ff66"
    strokeWidth={7}
    strokeMiterlimit="10"
    pointerEvents="stroke"
  />
  <path
    d={`M ${25 + x} ${211 + y} L ${5 + x} ${191 + y}`}
    fill="none"
    stroke="#66ff66"
    strokeWidth={7}
    strokeMiterlimit="10"
    pointerEvents="stroke"
  />
</g>

  )
}

export default Breaker