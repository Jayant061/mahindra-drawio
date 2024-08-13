import React from 'react'
import { Shape } from '../../models/Shape';
import EnergyMeter from '../../shapes/EnergyMeter';
import Annuciator from '../../shapes/Annuciator';
import Breaker from '../../shapes/Breaker';
import Inverter from '../../shapes/Inverter';
import Transformer from '../../shapes/Transformer';
import Relay from '../../shapes/Relay';
import { renderLines } from '../Lines/Lines';
interface blockProps{
  shapes:Shape[]
}
function Block({shapes}:blockProps) {
  const lines = renderLines(shapes);
  const renderShapes = () => {
    return shapes.map((shape, index) => {
      switch (shape.name) {
        case 'Relay':
          return (
            <Relay
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              radius={shape.radius || 30}
            />
          );
        case 'Transformer':
          return (
            <Transformer
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}
            />
          );
        case 'Inverter':
          return (
            <Inverter
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}
            />
          );
        case "Breaker":
          return (
            <Breaker
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}

            />
          );
        case "Annuciator":
          return (
            <Annuciator
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}

            />
          );
        case "EnergyMeter":
          return (
            <EnergyMeter
              key={index}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              radius={shape.radius || 30}

            />
          );
        default:
          return null;
        }
    });
  };

  return (
    <g>
      {renderShapes()}
      {lines.connector}
      {lines.lines}
      {}
    </g>
  )
}

export default Block