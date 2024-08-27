import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './CreateComponent.css'
import DropDownIcon from '../../../assets/MainPageIcons/DropDownCaretLine.svg'

const CreateComponent = () => {
  const [showComponent, setShowComponent] = useState<boolean>(true);
  const [d1open, setd1open] = useState<boolean>(false);
  const [d2open, setd2open] = useState<boolean>(false);
  const [d3open, setd3open] = useState<boolean>(false);

  return (
    <>
      {showComponent && <div className="createComponent">
        <section className="componentHeading componentSubsection">
          <span>Create Component</span>
          <FontAwesomeIcon icon={faXmark} color='black' onClick={() => { setShowComponent(false) }} />
        </section>
        <section className='componentInput'>
          <div className="selectComponent">
            <div className="heading">
              <h5>Component Details</h5>
            </div>
            <div className="componentTable">
              <table className="addComponentTable">
                <thead>
                  <tr>
                    {/* <th><FormControlLabel control={<Checkbox />} label="Assetes Type" /></th> */}
                    <th>
                      <div className="theading">
                        Asset Type
                      </div>
                    </th>
                    <th>
                      <div className="theading">
                        Asset ID
                      </div>
                    </th>
                    <th>
                      <div className="theading">
                        Parameters
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="manualSelect">
                        <p>Select Asset</p>
                        <img src={DropDownIcon} alt="drop"
                          onClick={()=>setd1open(!d1open)}
                        />
                      </div>
                      {
                        d1open && <div className="searchDd">

                        </div>
                      }
                    </td>
                    <td>
                      <div className="manualSelect">
                        <p>Select Asset</p>
                        <img src={DropDownIcon} alt="drop" 
                        onClick={()=>setd2open(!d2open)}/>
                      </div>
                      {
                        d2open && <div className="searchDd">
                          <input type="text" />
                          
                        </div>
                      }
                    </td>
                    <td>
                      <div className="manualSelect">
                        <p>Select Asset</p>
                        <img src={DropDownIcon} alt="drop" 
                        onClick={()=>setd3open(!d3open)}/>
                      </div>
                      {
                        d3open && <div className="searchDd">
                          
                        </div>
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <div className="addBtn">
          <button>Add</button>
        </div>
      </div>}
    </>
  )
}

export default CreateComponent