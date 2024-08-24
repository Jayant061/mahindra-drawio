import { useState } from 'react';
import HomeIcon from '../../assets/HomePageIcons/Home.svg';
import Random from '../../assets/HomePageIcons/Random.svg';
import SettingIcon from '../../assets/HomePageIcons/Settings.svg';
import './Sidebar.css';

const Sidebar = () => {
    // Maintain the index of the selected element
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <div className="sidebarContainer">
            <div className="options">
                <div
                    className={selectedIndex === 0 ? "element element-1 selected" : "element element-1"}
                    onClick={() => handleClick(0)}
                    aria-label="Home"
                >
                    <img src={HomeIcon} alt="Home" />
                </div>
                <div
                    className={selectedIndex === 1 ? "element element-1 selected" : "element element-1"}
                    onClick={() => handleClick(1)}
                    aria-label="Random"
                >
                    <img src={Random} alt="Random" />
                </div>
                <div
                    className={selectedIndex === 2 ? "element element-1 selected" : "element element-1"}
                    onClick={() => handleClick(2)}
                    aria-label="Settings"
                >
                    <img src={SettingIcon} alt="Settings" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
