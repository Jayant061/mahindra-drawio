/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import "./CreateBlock.css"
import { Checkbox, FormControlLabel } from '@mui/material'
import sldData from "../../../jsonFiles/shapes2.json";

function CreateBlock() {
  const [showBlock,setShowBlock] = useState<boolean>(true)
  const [blockId,setBlockId] = useState("")
  const [assetIds,setAssetIds] = useState<{ assetId: string; name: string; Parameters: string[]; }[]>();
  const blockOptions = sldData.map(data=>{
    return(<option key={data.blockId} value={data.blockId}>{data.blockId}</option>)
  })
  useEffect(()=>{
    const block = sldData.filter(block=>block.blockId === blockId);
    setAssetIds(block[0]?.elements);
  },[blockId])
  console.log(assetIds)
  return (
    <>
    {showBlock && <div className="createBlock">
        <section className="blockHeading blockSubsection">
            <span>Create Block</span>
            <FontAwesomeIcon icon={faXmark} color='black' onClick={()=>{setShowBlock(false)}} style={{cursor:"pointer"}}/>
        </section>
        <section className='bockInput blockSubsection'>
          <div className="selectBlock">
          <label htmlFor="blockId">Block ID :</label>
          <select name="blockId" id="blockId" value={blockId} onChange={(e)=>{setBlockId(e.target.value)}}  style={blockId?{color:"#707070"}:{color:"#C9D2CB"}}>
            <option value="" disabled hidden>Select the Block ID</option>
            {blockOptions}
          </select>
          </div>
          <span>Block Details</span>
        </section>
          <section className='blockDetails blockSubsection'>
            {!blockId && <p id='emptyBlock'>Block components will be shown here</p>}
            {blockId && <table className="addBlockTable">
              <thead>
                <tr>
                  <th><FormControlLabel control={<Checkbox  />} label="Assetes Type" /></th>
                  <th>Asset ID</th>
                  <th>Parameters</th>
                </tr>
              </thead>
              <tbody>
                  {assetIds?.map(asset=>
                <tr key={asset.assetId}>
                  <td><FormControlLabel control={<Checkbox />} label={asset.name} /></td>
                  <td>{asset.assetId}</td>
                  <td>parameters</td>

                </tr>
              )}
              </tbody>
            </table>}
          </section>

          <section className='btn'>
          <button>Create</button>
          </section>
    </div>}
    </>
  )
}

export default CreateBlock