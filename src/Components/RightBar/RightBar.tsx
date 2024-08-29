import React, { useState } from 'react'
import SearchIcon from '../../assets/HomePageIcons/Search.svg'

import './RightBar.css'

import json from '../../jsonFiles/shapes3.json'
import BlockCard from './BlockCard/BlockCard'


const RightBar = () => {
  const [isParamterNav, setIsParameterNav] = useState<boolean>(true);
  return (
    <div className="rightBarContainer">
      <div className="navPanel">
        <div className={isParamterNav ? 'panelElement selected' : 'panelElement'}
          onClick={() => { setIsParameterNav(true) }}
        >
          <p>Parameters</p>
        </div>
        <div className={isParamterNav ? 'panelElement' : 'panelElement selected '}
          onClick={() => { setIsParameterNav(false) }}
        >
          <p>Notification</p>
        </div>
      </div>
      <hr />
      <div className="navDiv">
        {
          isParamterNav &&
          <div className="ParameterDiv">
            <div className="searchBar">
              <input type="text" placeholder='Search' />
              <img src={SearchIcon} alt="search" />
            </div>
            <div className="selectDiv">
              <select>
                <option value="0">Block Id:</option>
                <option value="1">Audi</option>
                <option value="2">BMW</option>
                <option value="3">Citroen</option>
                <option value="4">Ford</option>
                <option value="5">Honda</option>
                <option value="6">Jaguar</option>
                <option value="7">Land Rover</option>
                <option value="8">Mercedes</option>
                <option value="9">Mini</option>
                <option value="10">Nissan</option>
                <option value="11">Toyota</option>
                <option value="12">Volvo</option>
              </select>
              <select>
                <option value="0">Component</option>
                <option value="1">Audi</option>
                <option value="2">BMW</option>
                <option value="3">Citroen</option>
                <option value="4">Ford</option>
                <option value="5">Honda</option>
                <option value="6">Jaguar</option>
                <option value="7">Land Rover</option>
                <option value="8">Mercedes</option>
                <option value="9">Mini</option>
                <option value="10">Nissan</option>
                <option value="11">Toyota</option>
                <option value="12">Volvo</option>
              </select>
            </div>
            <div className="assetList">
              {json.blocks.map((block) => {
                return <>
                {
                  block.elements.map((element) => {
                    return <BlockCard name={block.name} element={element}/>
                  })
                }
                </>
              })}
            </div>
          </div>
        }
        {
          !isParamterNav &&
          <div className="NotifDiv">

          </div>
        }
      </div>
    </div>
  )
}

export default RightBar