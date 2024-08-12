import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { Shape } from '../models/Shape'
type BreakerProps = {
x:number,
y:number
newCoordOnMove:{x:number,y:number}
id:string
zoomLevel:number
getData:(id:string,data:Shape)=>void
  name:string

}
function Breaker(props:BreakerProps) {
  const height=140;
  const arrowOffset = 20
  const stroke = "green"
    const {id,x,y,newCoordOnMove,zoomLevel,getData,name} = props
    // const scale=0.4
    const elementRef = useRef<SVGGElement>(null);
    const[offset,setOffset] = useState({x:0,y:0});
    const[coord,setCoord] = useState({x:x,y:y});
    const isClicked = useRef<boolean>(false);

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
        getData(id,{id,name,x:coord.x,y:coord.y});
      }

  return (
  <g 
  // transform={`translate(${coord.x} ${coord.y}) scale(${scale})`} 
  // transform={`scale(${scale})`}
  ref={elementRef}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
    strokeWidth={3}
    fill={stroke}
 id={id}
>
   <line x1={coord.x} y1={coord.y} x2={coord.x} y2={coord.y+height} stroke={stroke} />

   {/* top left arrow */}
   <line x1={coord.x} y1={coord.y} x2={coord.x-arrowOffset} y2={coord.y+arrowOffset} stroke={stroke} />

    {/* top right arrow */}
   <line x1={coord.x} y1={coord.y} x2={coord.x+arrowOffset} y2={coord.y+arrowOffset} stroke={stroke} />

   {/* top 2 left arrow */}
   <line x1={coord.x} y1={coord.y+arrowOffset} x2={coord.x-arrowOffset} y2={coord.y+2*arrowOffset} stroke={stroke} />
   {/* top left arrow */}
   <line x1={coord.x} y1={coord.y+arrowOffset} x2={coord.x+arrowOffset} y2={coord.y+2*arrowOffset} stroke={stroke} />
   {/* top left arrow */}
   <line x1={coord.x} y1={coord.y+height-arrowOffset} x2={coord.x+arrowOffset} y2={coord.y+height-2*arrowOffset} stroke={stroke} />
   {/* bottom right arrow */}
   <line x1={coord.x} y1={coord.y+height} x2={coord.x+arrowOffset} y2={coord.y+height-arrowOffset} stroke={stroke} />
   {/* bottom 2 left arrow */}
   <line x1={coord.x} y1={coord.y+height-arrowOffset} x2={coord.x-arrowOffset} y2={coord.y+height-2*arrowOffset} stroke={stroke} />
   {/* bottom left arrow */}
   <line x1={coord.x} y1={coord.y+height} x2={coord.x-arrowOffset} y2={coord.y+height-arrowOffset} stroke={stroke} />
   {/* top circle */}
   <circle cx={coord.x} cy={coord.y+2*arrowOffset} r={5}/>
   {/* bottom circle */}
   <circle cx={coord.x} cy={coord.y+height-2*arrowOffset} r={5}/>
</g>

  )
}

export default Breaker