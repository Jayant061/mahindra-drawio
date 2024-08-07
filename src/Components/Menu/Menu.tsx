import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <button className='buttonStyle' onClick={openMenu}>
        Menu
      </button>
      {menuOpen && (
        <div className='menuContent'>
          <div className="heading">
            <h3>List</h3>
            <button className='closeButton' onClick={closeMenu}>x</button>
          </div>
          <hr />
          <ul>
            <div className="component-element">
            <div className="image">
                <img src="transformer.svg" alt="zxc" />
              </div>
              <div className="name">Transformer</div>
            </div>
            <div className="component-element">
              <div className="image">
                <img src="inverter.svg" alt="zxc" />
              </div>
              <div className="name">Inverter</div>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default Menu;
