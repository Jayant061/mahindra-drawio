import React from 'react'
import './Configuration.css'
import { TextField } from '@mui/material'

const Configuration = () => {
    return (
        <>
            <div className="configDiv">
                <div className="new-btn">
                    <button className='newSLD'>
                        + New SLD
                    </button>
                </div>
                <div className="searchDiv">
                    <div className="searchBar">
                        <TextField id="outlined-search" label="Search field" type="search" />
                    </div>
                    <div className="deleteBtn">
                        <button>
                            <img src="" alt="" />
                        </button>
                    </div>
                    <div className="dowloadBtn">
                        <button>
                            <img src="" alt="" />
                        </button>
                    </div>
                </div>
                <div className="tableDiv">
                    
                </div>
            </div>
        </>
    )
}

export default Configuration