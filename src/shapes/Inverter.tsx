import { FC, useRef, } from 'react';
// import { Shape } from '../models/Shape';
 
interface InverterProps {
//   uniqueId: string;
//   value: string;
  x: number;
  y: number;
  id: string,
// newCoordOnMove:{x:number,y:number}
// className:string
// zoomLevel:number,
// getData:(id:string,data:Shape)=>void
//   name:string

}
 
const Inverter: FC<InverterProps> = ({  x,y, id}) => {
  const elementRef = useRef<SVGGElement>(null);
  // const [coord,setCoord] = useState({x:x,y:y})
  // const[offset,setOffset] = useState({x:0,y:0});
  // const [transform,setTransform] = useState(`translate(${coord.x} ${coord.y})`);
  // const isClicked = useRef<boolean>(false);
  const width = 100;
  const height = width / 2;
  const smallRectWidth = 8;
  const smallRectHeight = 5
  
  // useEffect(()=>{
  //   if(isClicked.current){
  //     setCoord(
  //       {x:(newCoordOnMove.x-offset.x)/zoomLevel,
  //         y:(newCoordOnMove.y-offset.y)/zoomLevel
  //       });
  // }
  // },[newCoordOnMove,offset])
  
  // const handleMouseDown:MouseEventHandler<SVGGElement> = (e)=>{
  //   // console.log(rect,radius,coord);
  //   setOffset({x:(e.clientX-coord.x*zoomLevel),y:(e.clientY-coord.y*zoomLevel)})
  //   isClicked.current = true
  //   // console.log(id)
  // }


  // const handleMouseUp = ()=>{
  //     isClicked.current = false;
  //     // console.log(coord.x, coord.y)
  //     getData(id,{id,name,x:coord.x,y:coord.y})
  // }

  // const [color,setColor] = useSta("")
 
  return (
    <g
      ref={elementRef}
      fill="white"
      stroke="green"
      strokeWidth="0.5"
      id={`Inverter${id}`}
      onMouseDown={(e)=>{e.preventDefault(); e.stopPropagation()}}
      onClick={()=>{console.log(id)}}
    >
      <rect width={width} height={height} x={x-(width/2)} y={y} id={`InverterReactangle1`} />
      <rect width={smallRectWidth} height={smallRectHeight} x={x-(smallRectWidth/2)} y={y-smallRectHeight} id={`InverterReactangle2`} fill='green' />
      <text
        id={`InverterText1`}
        x={x}
        y={y+0.5*height}
        width={width - 2}
        fontFamily='sans-serif'
        stroke='none'
        fill='green'
        fontSize={10}
        textAnchor="middle"
        dominantBaseline="middle"
      >LT Pannel
      </text>
    </g>
  );
};
 
export default Inverter;
 
 