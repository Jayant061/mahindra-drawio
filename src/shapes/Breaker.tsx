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
        console.log(rect,coord);
        setOffset({x:e.clientX-rect.x,y:e.clientY-rect.y})
        isClicked.current = true;
      }
      const handleMouseUp = ()=>{
        isClicked.current = false;
      }


      useEffect(()=>{
        if(isClicked.current){
            setCoord({x:newCoordOnMove.x-offset.x-2,y:newCoordOnMove.y-offset.y-5.6})
        }

      },[newCoordOnMove,offset])
  return (
    <g transform={`translate(${coord.x} ${coord.y})`} ref={elementRef}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    id={id}
    >
      <path
        d={`M ${25* scale} ${214 *scale} L ${25 *scale} ${14 *scale}`}
        fill="none"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
      <ellipse
        cx={25 * scale}
        cy={74 * scale}
        rx={10 * scale}
        ry={10 * scale}
        fill="#80ff00"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        pointerEvents="all"
      />
      <ellipse
        cx={25 * scale}
        cy={154 * scale}
        rx={10 * scale}
        ry={10 * scale}
        fill="#80ff00"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        pointerEvents="all"
      />
      <path
        d={`M ${25 * scale} ${184 * scale} L ${45 * scale} ${164 * scale}`}
        fill="none"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
      <path
        d={`M ${25 * scale} ${184 * scale} L ${5 * scale} ${164 * scale}`}
        fill="none"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
      <path
        d={`M ${25 * scale} ${44 * scale} L ${5 * scale} ${64 * scale}`}
        fill="none"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
      <path
        d={`M ${25 * scale} ${44 * scale} L ${45 * scale} ${64 * scale}`}
        fill="none"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
      <path
        d={`M ${25 * scale} ${16 * scale} L ${5 * scale} ${36 * scale}`}
        fill="none"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
      <path
        d={`M ${25 * scale} ${16 * scale} L ${45 * scale} ${36 * scale}`}
        fill="none"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
      <path
        d={`M ${25 * scale} ${211 * scale} L ${45 * scale} ${191 * scale}`}
        fill="none"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
      <path
        d={`M ${25 * scale} ${211 * scale} L ${5 * scale} ${191 * scale}`}
        fill="none"
        stroke="#66ff66"
        strokeWidth={7 * scale}
        strokeMiterlimit="10"
        pointerEvents="stroke"
      />
    </g>
  )
}

export default Breaker