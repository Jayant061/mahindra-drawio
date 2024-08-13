import { ReactElement } from "react";
import { Shape } from "../../models/Shape";
import Connector from "../../shapes/Connector";

    export const renderLines = (shapes:Shape[]) => {
        const lines: ReactElement[] = [];
        const connector: ReactElement[] = [];
        let maxX = shapes[0].x; let maxY = shapes[0].y; let minX = shapes[0].x; let minY = shapes[0].y
        for (let i = 0; i < shapes.length; i++) {
    
          if (shapes[i].x > maxX) maxX = shapes[i].x
          if (shapes[i].y > maxY) maxY = shapes[i].y;
          if (shapes[i].x < minX) minX = shapes[i].x;
          if (shapes[i].y < minY) minY = shapes[i].y;
        }
        for (let i = 0; i < shapes.length; i++) {
          switch (shapes[i].name) {
            case "Inverter":
              connector.push(
                <g key={`connector${i}`}>
                  <line
    
                    x1={shapes[i].x + 50}
                    y1={shapes[i].y}
                    x2={maxX + 500}
                    y2={shapes[i].y}
                    stroke="black"
                    strokeWidth="1"
                  />
                  <Connector id={`connector${i}`} x={maxX + 500} y={shapes[i].y}  />
                </g>
              )
              break;
            case "Transformer":
              connector.push(
                <g key={`connector${i}`}>
                  <line
    
                    x1={shapes[i].x + 150}
                    y1={shapes[i].y + 35}
                    x2={maxX + 500}
                    y2={shapes[i].y + 35}
                    stroke="black"
                    strokeWidth="1"
                  />
                  <Connector id={`connector${i}`} x={maxX + 500} y={shapes[i].y + 35}  />
                </g>
              )
              break;
            case "Relay":
              connector.push(
                <g key={`connector${i}`}>
                  <line
    
                    x1={shapes[i].x + 11 * (shapes[i].radius || 0) + 10}
                    y1={shapes[i].y}
                    x2={maxX + 500}
                    y2={shapes[i].y}
                    stroke="black"
                    strokeWidth="1"
                  />
                  <Connector id={`connector${i}`} x={maxX + 500} y={shapes[i].y}  />
                </g>
              )
              break;
            case "Annuciator":
              connector.push(
                <g key={`connector${i}`}>
                  <line
    
                    x1={shapes[i].x + 50}
                    y1={shapes[i].y}
                    x2={maxX + 500}
                    y2={shapes[i].y}
                    stroke="black"
                    strokeWidth="1"
                  />
                  <Connector id={`connector${i}`} x={maxX + 500} y={shapes[i].y}  />
                </g>
              )
              break;
          }
        }
        lines.push(
    
          <line
            key={`line${0}`}
            x1={maxX + 500}
            y1={minY - 50}
            x2={maxX + 500}
            y2={maxY + 50}
            stroke="black"
            strokeWidth="1"
          />
    
    
        )
        const connectors = {
          lines, connector
        }
        return connectors;
      };

