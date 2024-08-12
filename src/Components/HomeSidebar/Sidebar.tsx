import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <>
            <div className="sidebarContainer">
                <div className="options">
                    <div className="element element-1">
                    <FontAwesomeIcon icon={faHouse} />
                    </div>
                    <div className="element element-2">
                    <FontAwesomeIcon icon={faHouse} />
                    </div>
                    <div className="element element-3">
                    <FontAwesomeIcon icon={faHouse} />
                    </div>
                    <div className="element element-4">
                    <FontAwesomeIcon icon={faHouse} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar

