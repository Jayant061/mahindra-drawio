import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './CreateComponent.css'

const CreateComponent = () => {
    const [showComponent,setShowComponent] = useState<boolean>(true)

  return (
    <>
    {showComponent && <div className="createComponent">
        <section className="componentHeading componentSubsection">
            <span>Create Component</span>
            <FontAwesomeIcon icon={faXmark} color='black' onClick={()=>{setShowComponent(false)}}/>
        </section>
        <section className='componentInput componentSubsection'>
          <div className="selectComponent">
          <label htmlFor="componentId">Component ID :</label>
          <select name="componentId" id="componentId">
            <option value="">Select the Block ID</option>
            <option value="Block 123">Block 123</option>
          </select>
          </div>
          <span>Block Details</span>
        </section>
          {/* <section className='blockDetails blockSubsection'>
            {isBlockEmpty && <p id='emptyBlock'>Block components will be shown here</p>}
          </section> */}
    </div>}
    </>
  )
}

export default CreateComponent