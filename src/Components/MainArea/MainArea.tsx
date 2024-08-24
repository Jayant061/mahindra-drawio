import React from 'react'
import Heading from '../Heading/Heading'
import Configuration from '../Configuration-Div/Configuration'
import Table from '../../Components/SLDListingTable/SLDListingTable'

const MainArea = () => {
    return (
        <>
            <div className="mainAreaContainer">
                <div className="heading">
                    <Heading />
                </div>
                {/* <div className="Configuration">
                    <Configuration />
                </div> */}
                <div className='tableArea'>
                    <Table />
                </div>
            </div>
        </>
    )
}

export default MainArea