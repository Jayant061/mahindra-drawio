/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import "./CreateBlock.css"

function CreateBlock() {
  const [showBlock,setShowBlock] = useState<boolean>(true)
  const isBlockEmpty = true;
  return (
    <>
    {showBlock && <div className="createBlock">
        <section className="blockHeading blockSubsection">
            <span>Create Block</span>
            <FontAwesomeIcon icon={faXmark} color='black' onClick={()=>{setShowBlock(false)}}/>
        </section>
        <section className='bockInput blockSubsection'>
          <div className="selectBlock">
          <label htmlFor="blockId">Block ID :</label>
          <select name="blockId" id="blockId">
            <option value="">Select the Block ID</option>
            <option value="Block 123">Block 123</option>
          </select>
          </div>
          <span>Block Details</span>
        </section>
          <section className='blockDetails blockSubsection'>
            {isBlockEmpty && <p id='emptyBlock'>Block components will be shown here</p>}
          </section>
    </div>}
    </>
  )
}

export default CreateBlock