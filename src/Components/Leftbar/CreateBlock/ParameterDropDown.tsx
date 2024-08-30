import React, { useEffect, useRef, useState } from "react";
import "./CreateBlock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@mui/material/Checkbox";
interface parameterProps {
  actualParamters: string[];
  selectParameters: React.Dispatch<React.SetStateAction<Map<string, {
    assetId: string;
    name: string;
    Parameters: string[];
}>>>
  parameters:Map<string, {
    assetId: string;
    name: string;
    Parameters: string[];
}>;
  assetId: string;
}
function ParameterDropDown({
  assetId,
  actualParamters,
  selectParameters,
  parameters,
}: parameterProps) {
  const [query, setQuery] = useState<string>("");
  const [selectedParam, setSelectedParam] = useState<string[]>([]);
  const [paramBoxPos, setParamBoxPos] = useState({
    top: "80%",
    left: "0.5rem",
    transform: "",
  });
  const parameterRef = useRef<HTMLElement>(null);
  function isParamSelected(param: string) {
    return selectedParam.some((p) => p === param);
  }
  function handleChange(param: string) {
    isParamSelected(param)
      ? setSelectedParam((prev) => prev.filter((p) => p !== param))
      : setSelectedParam((prev) => [...prev, param]);
  }
  useEffect(() => {
    const currentAsset = parameters.get(assetId)
    currentAsset && selectParameters(parameters.set(assetId, {...currentAsset,Parameters:selectedParam}));
  }, [selectedParam]);

  useEffect(() => {
    const dropDownRect = parameterRef.current?.getBoundingClientRect();
    if (!dropDownRect) return;
    if (dropDownRect.bottom > window.innerHeight) {
      setParamBoxPos({
        transform: "translate(0, -100%)",
        top: "20%",
        left: "0.5rem",
      });
    } else {
      setParamBoxPos({ top: "80%", left: "0.5rem", transform: "" });
    }
  }, []);

  return (
    <>
      <section
        className="selectParameters"
        id={assetId}
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={parameterRef}
        style={paramBoxPos}
      >
        <div className="searchBar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search"
          />
        </div>
        <div className="options">
          <div className="option selectAll">
            <Checkbox
              color="success"
              checked={actualParamters.length === selectedParam.length}
              onChange={() => {
                actualParamters.length === selectedParam.length
                  ? setSelectedParam([])
                  : setSelectedParam(actualParamters);
              }}
              id="selectAll"
            />
            <label htmlFor="selectAll">Select All</label>
          </div>
          {actualParamters.map((param) => {
            return (
              <div className="option" key={param}>
                <Checkbox
                  checked={isParamSelected(param)}
                  onChange={() => {
                    handleChange(param);
                  }}
                  id={param}
                  color="success"
                />
                <label htmlFor={param}>{param}</label>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default ParameterDropDown;
