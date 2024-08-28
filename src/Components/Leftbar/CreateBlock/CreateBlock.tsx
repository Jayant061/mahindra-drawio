/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import "./CreateBlock.css"
import { Checkbox, FormControlLabel } from '@mui/material'
import sldData from "../../../jsonFiles/shapes2.json";
import dorpDownImg from "../../../assets/dropdown.png";
import { width } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import ParameterDropDown from './ParameterDropDown'

function CreateBlock() {
  const [showBlock,setShowBlock] = useState<boolean>(true)
  const [blockId,setBlockId] = useState("")
  const [asset,setAsset] = useState<{ assetId: string; name: string; Parameters: string[] }[]>();
  const [parameters, setParameters] = useState<Map<string, string[]>>(new Map());
  const [selectedAssets,setSelectedAsset] = useState<{ assetId: string; name: string; Parameters: string[] }[]>([])
  const [showParams,setShowParams] = useState<string>("");
  const blockOptions = sldData.map(data=>{
    return(<option key={data.blockId} value={data.blockId}>{data.blockId}</option>)
  })
  useEffect(()=>{
    const block = sldData.filter(block=>block.blockId === blockId);
    setAsset(block[0]?.elements);
    setSelectedAsset([])
  },[blockId])
  function isAssetAdded(id:string){
    return selectedAssets?.some(asset=>asset.assetId===id);
  }
  function handleChangeAll(){
    if(asset?.length === selectedAssets.length){
      setSelectedAsset([])
    }else{
      setSelectedAsset(asset!);
    }
  }
  function filterAsset(asset:{ assetId: string; name: string; Parameters: string[] }){
    isAssetAdded(asset.assetId)?
    setSelectedAsset(selectedAssets.filter(el=>{return el.assetId !== asset.assetId})):
    setSelectedAsset(prev=>[...prev,asset]);
  }
  function handleParams(id:string){
    setShowParams(prevParam=>{return prevParam===id?"":id});
  }
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
                  <th><FormControlLabel control={<Checkbox  checked={asset?.length === selectedAssets.length} onChange={handleChangeAll}/>} label="Assets Type" /></th>
                  <th>Asset ID</th>
                  <th>Parameters</th>
                </tr>
              </thead>
              <tbody>
                  {asset?.map(asset=>
                <tr key={asset.assetId}>
                  <td><FormControlLabel control={<Checkbox checked={isAssetAdded(asset.assetId)}/>} label={asset.name} onChange={()=>{filterAsset(asset)}}  /></td>
                  <td>{blockId + "-" + asset.assetId}</td>
                  <td className='assetParameter' onClick={()=>{handleParams(asset.assetId)}}><span>paramters</span> <img src={dorpDownImg} alt="dorpDownImg" style={{width:"2rem"}} />
                    {showParams===asset.assetId && <ParameterDropDown key={asset.assetId} assetId={showParams} actualParamters={asset.Parameters} selectParameters={setParameters}/>}
                    </td>
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