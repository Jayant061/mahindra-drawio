/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect,  useRef,  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CreateBlock.css";
import  Checkbox from "@mui/material/Checkbox";
import sldData from "../../../jsonFiles/shapes2.json";
import dorpDownImg from "../../../assets/dropdown.png";
import ParameterDropDown from "./ParameterDropDown";
interface createBLockParams{
  setShowBox:React.Dispatch<React.SetStateAction<string>>;
}
function CreateBlock({setShowBox}:createBLockParams) {
  const [showBlock, setShowBlock] = useState<boolean>(true);
  const [blockId, setBlockId] = useState("");
  const [asset, setAsset] =useState<{ assetId: string; name: string; Parameters: string[] }[]>();
  const [selectedAssets, setSelectedAsset] = useState<{ assetId: string; name: string; Parameters: string[] }[]>([]);
  const [selectedAssetMap,setSelectedAssetMap] = useState<Map<string,{ assetId: string; name: string; Parameters: string[] }>>(new Map())
  // const [parameters, setParameters] = useState<Map<string, string[]>>(new Map());
  const [showParams, setShowParams] = useState<string>("");
  const blockOptions = sldData.map((data) => {
    return (
      <option key={data.blockId} value={data.blockId}>
        {data.blockId}
      </option>
    );
  });
  useEffect(() => {
    const block = sldData.filter((block) => block.blockId === blockId);
    setAsset(block[0]?.elements);
    setSelectedAsset([]);
    setSelectedAssetMap(prev=>{prev.clear(); return prev});
  }, [blockId]);
  useEffect(()=>{
    console.log(selectedAssetMap)
  },[Array.from(selectedAssetMap.entries())]);
  function isAssetAdded(id: string) {
    return selectedAssets?.some((asset) => asset.assetId === id);
  }

  function handleChangeAll() {
    if (asset?.length === selectedAssets.length) {
      setSelectedAsset([]);
      setSelectedAssetMap(prev=>{prev.clear(); return prev});
    } else {
      setSelectedAsset(asset||[]);
      setSelectedAssetMap(selectedAssetMap=>{asset?.forEach(el=>{selectedAssetMap.set(el.assetId,el)}); return selectedAssetMap});
      
    }
  }

  function filterAsset(asset: {
    assetId: string;
    name: string;
    Parameters: string[];
  }) {
    isAssetAdded(asset.assetId)
      ? setSelectedAsset(
          selectedAssets.filter((el) => {
            return el.assetId !== asset.assetId;
          })
        ) 
      : setSelectedAsset((prev) => [...prev, asset]);

      selectedAssetMap.get(asset.assetId)?.assetId?setSelectedAssetMap(prev=>{prev.delete(asset.assetId);return prev}):setSelectedAssetMap(prev=>{prev.set(asset.assetId,asset);return prev})

  }

  function handleParams(id: string) {
    setShowParams((prev) => (prev === id ? "" : id));
  }

  return (
    <>
      {showBlock && (
        <div
          className="createBlock"
          onClick={() => {
            showParams && setShowParams("");
          }}
        >
          <section className="blockHeading blockSubsection" >
            <span>Create Block</span>
            <FontAwesomeIcon
              icon={faXmark}
              color="black"
              onClick={() => {
                setShowBlock(false);
                setShowBox("");
              }}
              style={{ cursor: "pointer" }}
            />
          </section>
          <section className="bockInput blockSubsection">
            <div className="selectBlock">
              <label htmlFor="blockId">Block ID :</label>
              <select
                name="blockId"
                id="blockId"
                value={blockId}
                onChange={(e) => {
                  setBlockId(e.target.value);
                }}
                style={blockId ? { color: "#707070" } : { color: "#C9D2CB" }}
              >
                <option value="" disabled hidden>
                  Select the Block ID
                </option>
                {blockOptions}
              </select>
            </div>
            <span>Block Details</span>
          </section>
          <section className="blockDetails blockSubsection">
            {!blockId && (
              <p id="emptyBlock">Block components will be shown here</p>
            )}
            {blockId && (
              <table className="addBlockTable">
                <thead>
                  <tr>
                    <th>
            
                          <Checkbox
                          color="success"
                            checked={asset?.length === selectedAssets.length}
                            onChange={handleChangeAll}
                            id="selectAllAsset"
                          />
                          <label htmlFor="selectAllAsset">Select All</label>
                    </th>
                    <th>Asset ID</th>
                    <th>Parameters</th>
                  </tr>
                </thead>
                <tbody>
                  {asset?.map((asset) => (
                    <tr key={asset.assetId}>
                      <td>
                  
                      <Checkbox color="success" checked={isAssetAdded(asset.assetId)} onChange={() => {filterAsset(asset)}} id={asset.assetId}/>
                      <label htmlFor={asset.assetId}>{asset.name}</label>
              
                      </td>
                      <td>{blockId + "-" + asset.assetId}</td>
                      <td
                        className="assetParameter"
                        onClick={(e) => {
                          handleParams(asset.assetId);
                          e.stopPropagation();
                        }}
                      >
                        <span>paramters</span>{" "}
                        <img
                          src={dorpDownImg}
                          alt="dorpDownImg"
                          style={
                            showParams === asset.assetId
                              ? {
                                  width: "2rem",
                                  transform: "rotate(180deg)",
                                  transition: "0.2s ease-in",
                                }
                              : { width: "2rem" }
                          }
                        />
                        {showParams === asset.assetId && (
                          
                          <ParameterDropDown
                            key={asset.assetId}
                            assetId={showParams}
                            actualParamters={asset.Parameters}
                            selectParameters={setSelectedAssetMap}
                            parameters={selectedAssetMap}
                            
                          />
                          
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section className="btn">
            <button>Create</button>
          </section>
        </div>
      )}
    </>
  );
}

export default CreateBlock;
