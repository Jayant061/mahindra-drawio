import React, { FC, useState } from 'react'
import "./MenuElement.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

interface MenuElementProps {
    id: string,
    name: string,
    imgPath: string
}

const MenuElement: FC<MenuElementProps> = (props): JSX.Element => {

    const [buttonClicked, setButtonClicked] = useState<boolean>(false);

    const toggleElementMenu = () => {
        setButtonClicked(prev => !prev);
        console.log(props.name)
    }

    const imgList = [
        {
            "imgLink": "transformer.svg",
        },
        {
            "imgLink": "transformer.svg",
        },
        {
            "imgLink": "transformer.svg",
        },
        {
            "imgLink": "transformer.svg",
        },
    ]

    return (
        <>
            <li key={props.id}>
                <div className="component-element">
                    <div className="image">
                        <img src={props.imgPath} alt={props.name} />
                    </div>
                    <div className="dropDownButton" onClick={toggleElementMenu}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="name">
                        {props.name}
                    </div>
                    {buttonClicked && (
                        <div className="images">
                            {imgList.map((image) => (
                                <img src={image.imgLink} alt="abc" />
                            ))}
                        </div>
                    )}
                </div>
            </li>
        </>
    );
}

export default MenuElement;