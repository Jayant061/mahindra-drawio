import { useState } from 'react';
import MenuElement from '../Menu-Element/MenuElement';

import './Menu.css';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const obj = [{
    "id": "k1",
    "name": "Transformer",
    "imgPath": "transformer.svg"
  },
  {
    "id": "k2",
    "name": "Inverter",
    "imgPath": "inverter.svg"
  }];

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
            {obj.map((element) => (
              <MenuElement id={element.id} imgPath={element.imgPath} name={element.name} />
            ))}
        </ul>
        </div>
      )}
    </>
  );
};

export default Menu;
