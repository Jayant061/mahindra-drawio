import { Assets } from "../../models/Shape";
import EnergyMeter from "../../shapes/EnergyMeter";
import Annuciator from "../../shapes/Annuciator";
import Breaker from "../../shapes/Breaker";
import Inverter from "../../shapes/Inverter";
import Transformer from "../../shapes/Transformer";
import Relay from "../../shapes/Relay";
import Connector from "../../shapes/Connector";
import React from "react";

export const renderShapes = (elements:Assets[],rect:DOMRect|undefined,elementStartX:number,mainLineDistance:number) => {
    const radius = 20;
    const gap = 30;
    const transformerLength = 120;
    const rectLength = 50
    const breakerLength = 70;
    let distanceFromTop = gap;
    if(!rect)return;
    const shapes = elements.map((element, index) => {
      const elementCount = elements.length;
      switch (element.name) {
        case "Relay":
          return (
            <React.Fragment key={element.id}>
              <Relay
                key={element.id}
                id={element.id}
                x={elementStartX}
                y={distanceFromTop}
                radius={radius}
              />
              <Connector
                id="connector1"
                key={"connector"+element.id}
                x1={elementStartX}
                y1={distanceFromTop}
                x={elementStartX + mainLineDistance}
                y={distanceFromTop}
              />
              {distanceFromTop +=(index  !==  elementCount-1)?(gap+2*radius):0}
            </React.Fragment>
          );
        case "Transformer":
          return (
            <React.Fragment key={element.id}>
            <Transformer
              key={element.id}
              id={element.id}
              x={elementStartX + mainLineDistance}
              y={distanceFromTop}
              
              />
            {distanceFromTop += (index  !==  elementCount-1)?(gap+transformerLength):0}
              </React.Fragment>
          );
        case "Inverter":
          return (
            <React.Fragment key={element.id}>
            <Inverter
              key={element.id}
              id={element.id}
              x={elementStartX + mainLineDistance}
              y={distanceFromTop}
              />
              {distanceFromTop +=(index  !==  elementCount-1)?(gap+rectLength):0}
              </React.Fragment>
          );
        case "Breaker":
          return (
            <React.Fragment key={element.id}>
            <Breaker
              key={element.id}
              id={element.id}
              x={elementStartX + mainLineDistance}
              y={distanceFromTop}
              />
              {distanceFromTop += (index  !==  elementCount-1)?(gap+breakerLength):0}
              </React.Fragment>
          );
        case "Annuciator":
          return (
            <React.Fragment key={element.id}>
              <Annuciator
                key={element.id}
                id={element.id}
                x={elementStartX}
                y={distanceFromTop}
              />
              <Connector
                id="connector1"
                key={"connector"+element.id}
                x1={elementStartX}
                y1={distanceFromTop}
                x={elementStartX + mainLineDistance}
                y={distanceFromTop}
              />
              {distanceFromTop += (index  !==  elementCount-1)?(gap+rectLength):0}
            </React.Fragment>
          );
        case "EnergyMeter":
          return (
            <React.Fragment key={element.id}>
              <EnergyMeter
                
                id={element.id + "realy" + index}
                x={elementStartX}
                y={distanceFromTop}
                radius={radius}
              />
              <Connector
                id="connector1"
                key={"connector"+element.id}
                x1={elementStartX}
                y1={distanceFromTop}
                x={elementStartX + mainLineDistance}
                y={distanceFromTop}
              />
              {distanceFromTop +=(index  !==  elementCount-1)?(gap+2*radius):0}
            </React.Fragment>
          );
        default:
          return null;
      }
    });
    return {shapes,distanceFromTop}
  };