import React from 'react'
import Heading from '../Heading/Heading'
import Configuration from '../Configuration-Div/Configuration'

const MainArea = () => {
    return (
        <>
            <div className="mainAreaContainer">
                <div className="heading">
                    <Heading />
                </div>
                <div className="Configuration">
                    <Configuration />
                </div>
            </div>
        </>
    )
}

export default MainArea