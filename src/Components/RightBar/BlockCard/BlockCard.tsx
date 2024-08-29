import React, { useState } from 'react';
import { SLD, Assets } from '../../../models/Shape';
import DropDownIcon from '../../../assets/MainPageIcons/DropDownLine.svg';
import './BlockCard.css';

interface BlockCardProps {
    name: string;
    element: Assets;
}

const BlockCard = ({ name, element }: BlockCardProps) => {
    const [isDown, setIsDown] = useState(false);
    const [color, setColor] = useState(true);

    const toggleDropDown = () => {
        setIsDown(prev => !prev);
    };

    const dot = {
        height: "1rem",
        width: "1rem",
        backgroundColor: color ? "#17B51D" : "#C7413A", 
        borderRadius: "50%",
        display: "inline-block",
        border: "2px solid #707070CC"
    };

    return (
        <div className="blockCardDiv">
            <div className="componentName">
                {element.name}
                <div 
                    className={!isDown ? "buttonDiv" : "buttonDiv toggleBtn"}
                    onClick={toggleDropDown}
                >
                    <img src={DropDownIcon} alt="down" />
                </div>
            </div>
            <div className="blockName">
                {name}
            </div>
            <div className={isDown ? "showstatusList" : "hidestatusList"}>
                <div className="status">
                    <p>asdf</p>
                    <span 
                        style={dot} 
                        onClick={() => setColor(prev => !prev)}
                    />
                </div>
                <div className="status">
                    <p>asdf</p>
                    <span 
                        style={dot} 
                        onClick={() => setColor(prev => !prev)}
                    />
                </div>
                <div className="status">
                    <p>asdf</p>
                    <span 
                        style={dot} 
                        onClick={() => setColor(prev => !prev)}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlockCard;
