import React, { useState } from 'react'
import DownIcon from '../../assets/MainPageIcons/CaretDown.svg'
import EditIcon from '../../assets/MainPageIcons/EditIcon.svg'
import CopyIcons from '../../assets/MainPageIcons/CopyIcons.svg'
import DeleteIcon from '../../assets/MainPageIcons/DeleteIcon.svg'
import Minus from '../../assets/MainPageIcons/MinusCircle.svg'
import {Assets, Plant} from '../../models/Shape'

import './BlockCard.css'

interface BlockCardProps{
    name: string;
    elements: Assets[];

}

const BlockCard = ({name, elements}: BlockCardProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const changeExpanded = () => {
        setIsExpanded(prev => !prev);
    }

    return (
        <div className="card-container">
            <div className="header" onClick={changeExpanded}>
                <div className="name">
                    <img src={DownIcon} alt="down" />
                    {name}
                </div>
                <div className="options">
                    <img src={EditIcon} alt="" />
                    <img src={CopyIcons} alt="" />
                    <img src={DeleteIcon} alt="" />
                </div>
            </div>
            <div className={isExpanded? "ItemsList" : "collapsed"}>
                {elements.map((element) => {
                    return (<div className="listItem">
                        <div className="ItemName">
                            <p>{element.id} ({element.name})</p>
                        </div>
                        <div className="removeIcon">
                            <img src={Minus} alt="icon" />
                        </div>
                    </div>);
                })}
            </div>
        </div>
    )
}

export default BlockCard