// import { ReactElement } from "react";
// // import { Shape } from "../../models/Shape";
// import Connector from "../../shapes/Connector";
// import { Assets } from "../../models/Shape";

// export const renderLines = (shapes:Assets[], x:number, y:number,gap:number) => {
//   const lines: ReactElement[] = []; 
//   const connector: ReactElement[] = [];
//   for (let i = 0; i < shapes.length; i++) {
//     switch (shapes[i].type) {
//       case "Inverter":
//         connector.push(
//           <g key={`connector${i}`}>
//             <line
//               x1={x + 100 + 11*20+10-50}
//               y1={y + gap*(i+1)}
//               x2={x + 500}
//               y2={y + gap*(i+1)}
//               stroke="black"
//               strokeWidth="1"
//             />
//             <Connector id={`connector${i}`} x={x + 500} y={y + gap*(i+1)} />
//           </g>
//         );
//         break;
//         case "Relay":
//           connector.push(
//             <g key={`connector${i}`}>
//               <line
//                 x1={x + 100 + 11 * (20) + 10}
//                 y1={y+ gap* (i + 1)}
//                 x2={x + 500}
//                 y2={y+ gap * (i + 1)}
//                 stroke="black"
//                 strokeWidth="1"
//               />
//               <Connector id={`connector${i}`} x={x + 500} y={y+ gap * (i + 1)} />
//             </g>
//           );
//           break;
//           case "EnergyMeter":
//           connector.push(
//             <g key={`connector${i}`}>
//               <line
//                 x1={x + 330}
//                 y1={y+ gap * (i + 1)}
//                 x2={x + 500}
//                 y2={y+ gap * (i + 1)}
//                 stroke="black"
//                 strokeWidth="1"
//               />
//               <Connector id={`connector${i}`} x={x + 500} y={y+ gap* (i + 1)} />
//             </g>
//           );
//           break;
//       case "Annuciator":
//         connector.push(
//           <g key={`connector${i}`}>
//             <line
//               x1={x + 230}
//               y1={y}
//               x2={x + 500}
//               y2={y}
//               stroke="black"
//               strokeWidth="1"
//             />
//             <Connector id={`connector${i}`} x={x + 500} y={y} />
//           </g>
//         );
//         break;
//     }
//   }
//   lines.push(
//     <line
//       key={`line${0}`}
//       x1={x + 500}
//       y1={y}
//       x2={x + 500}
//       y2={(y + (shapes.length * gap)+50)}
//       stroke="black"
//       strokeWidth="1"
//     />
//   );
//   const connectors = {
//     lines,
//     connector,
//   };
//   return connectors;
// };
interface LineProps{
  x1:number,
  y1:number,
  x2:number,
  y2:number
}
export default function Lines({x1,y1,x2,y2}:LineProps){
  return(
    <>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="black"
      strokeWidth="1"
    />
    </>
  )
}
