import { useRef} from "react"

interface transformerProps{
    id:string,
    x:number,//left coord
    y:number,// top coord

}

export default function Transformer({x,y,id,}:transformerProps){

    const elementRef = useRef<SVGGElement>(null);
    
    return(
  <g ref={elementRef}
    id={id}
    transform={`translate(${-150} ${-35})`}
    onMouseDown={(e)=>{e.preventDefault(); e.stopPropagation()}}
    className="transformer"
    >
      {/* leftmost point = 100+x, 127.5+y rightmost point = 195+x */}
    <ellipse cx={127.5 + x} cy={127.5 + y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <ellipse cx={167.5 + x} cy={127.5 + y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <ellipse cx={150.5 + x} cy={92.5 + y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
    <path d={`M ${115 + x} ${117 + y} L ${135 + x} ${127 + y} L ${115 + x} ${137 + y} Z`} fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" transform={`rotate(-90, ${125 + x}, ${127 + y})`} pointerEvents="all"/>
    <path d={`M ${143 + x} ${83 + y} L ${150 + x} ${90 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${150 + x} ${90 + y} L ${157 + x} ${83 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${150 + x} ${90 + y} L ${150 + x} ${100 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${163 + x} ${123 + y} L ${170 + x} ${130 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + x} ${130 + y} L ${177 + x} ${123 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    <path d={`M ${170 + x} ${130 + y} L ${170 + x} ${140 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
    {/* top cord = 150+x, 35+y  */}
    <path d={`M ${150 + x} ${65 + y} L ${150 + x} ${35 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
    {/* bottom right = ${55 + x} ${150 + y} */}
    <path d={`M ${170 + x} ${185 + y} L ${170 + x} ${155 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
      {/* bototm left = ${14 + x } ${150 + y}*/}
    <path d={`M ${129 + x} ${185 + y} L ${129 + x} ${155 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
  </g>
//   >
//     {/* leftmost point = 100 + x, 127.5 + y rightmost point = 195 + x */}
// <ellipse cx={-22.5 + x} cy={92.5 + y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
// <ellipse cx={17.5 + x} cy={92.5 + y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
// <ellipse cx={0.5 + x} cy={57.5 + y} rx={27.5} ry={27.5} fillOpacity="0.25" fill="rgb(255, 255, 255)" stroke="black" pointerEvents="all"/>
// <path d={`M ${-35 + x} ${82 + y} L ${-15 + x} ${92 + y} L ${-35 + x} ${102 + y} Z`} fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" transform={`rotate(-90, ${-25 + x}, ${92 + y})`} pointerEvents="all"/>
// <path d={`M ${-7 + x} ${48 + y} L {0 + x} ${55 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
// <path d={`M {0 + x} ${55 + y} L {7 + x} ${48 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
// <path d={`M {0 + x} ${55 + y} L {0 + x} ${65 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
// <path d={`M {13 + x} ${88 + y} L {20 + x} ${95 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
// <path d={`M {20 + x} ${95 + y} L {27 + x} ${88 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
// <path d={`M {20 + x} ${95 + y} L {20 + x} ${105 + y}`} fill="none" stroke="green" strokeMiterlimit="10" pointerEvents="stroke"/>
// {/* top cord = 150 + x, 35 + y  */}
// <path d={`M {0 + x} ${30 + y} L {0 + x} {0 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
// {/* bottom right = ${55 + x} ${150 + y} */}
// <path d={`M {20 + x} ${150 + y} L {20 + x} ${120 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>
// {/* bottom left = ${14 + x} ${150 + y} */}
// <path d={`M {-21 + x} ${150 + y} L {-21 + x} ${120 + y}`} fill="none" stroke="rgb(0, 0, 0)" strokeMiterlimit="10" pointerEvents="stroke"/>

//   </g>
    )
}