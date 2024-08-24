import { ReactElement } from "react";
// import { Shape } from "../../models/Shape";
import Connector from "../../shapes/Connector";

export const renderLines = (shapes: string[], x: number, y: number, gap: number) => {
  const lines: ReactElement[] = [];
  const connector: ReactElement[] = [];
  for (let i = 0; i < shapes.length; i++) {
    switch (shapes[i]) {
      case "Inverter":
        connector.push(
          <g key={`connector${i}`}>
            <line
              x1={x + 100 + 11 * 20 + 10 - 50}
              y1={y + gap * (i + 1)}
              x2={x + 500}
              y2={y + gap * (i + 1)}
              stroke="black"
              strokeWidth="1"
            />
            <Connector id={`connector${i}`} x={x + 500} y={y + gap * (i + 1)} />
          </g>
        );
        break;
      // case "Transformer":
      //   connector.push(
      //     <g key={`connector${i}`}>
      //       <line
      //         x1={x + 250}
      //         y1={y +gap*(i+1)+   35}
      //         x2={x + 500}
      //         y2={y +gap*(i+1)+   35}
      //         stroke="black"
      //         strokeWidth="1"
      //       />
      //       <Connector
      //         id={`connector${i}`}
      //         x={x + 500}
      //         y={y +gap*(i+1)+   35}
      //       />
      //     </g>
      //   );
      //   break;
      case "Relay":
        connector.push(
          <g key={`connector${i}`}>
            <line
              x1={x + 100 + 11 * (20) + 10}
              y1={y + gap * (i + 1)}
              x2={x + 500}
              y2={y + gap * (i + 1)}
              stroke="black"
              strokeWidth="1"
            />
            <Connector id={`connector${i}`} x={x + 500} y={y + gap * (i + 1)} />
          </g>
        );
        break;
      case "EnergyMeter":
        connector.push(
          <g key={`connector${i}`}>
            <line
              x1={x + 330}
              y1={y + gap * (i + 1)}
              x2={x + 500}
              y2={y + gap * (i + 1)}
              stroke="black"
              strokeWidth="1"
            />
            <Connector id={`connector${i}`} x={x + 500} y={y + gap * (i + 1)} />
          </g>
        );
        break;
      case "Annuciator":
        connector.push(
          <g key={`connector${i}`}>
            <line
              x1={x + 230}
              y1={y + gap * (i + 1)}
              x2={x + 500}
              y2={y + gap * (i + 1)}
              stroke="black"
              strokeWidth="1"
            />
            <Connector id={`connector${i}`} x={x + 500} y={y + gap * (i + 1)} />
          </g>
        );
        break;
    }
  }
  lines.push(
    <line
      key={`line${0}`}
      x1={x + 500}
      y1={y}
      x2={x + 500}
      y2={(y + (shapes.length * gap) + 50)}
      stroke="black"
      strokeWidth="1"
    />
  );
  const connectors = {
    lines,
    connector,
  };
  return connectors;
};
