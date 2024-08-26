import React, { useRef, useState } from 'react'
import SearchIcon from '../../assets/HomePageIcons/Search.svg'
import DownloadIcon from '../../assets/HomePageIcons/DownloadIcon.svg'
import CaretDown from '../../assets/HomePageIcons/CaretDown.svg'
import DeleteIcon from '../../assets/HomePageIcons/DeleteIcon.svg'
import AddIcon from '../../assets/HomePageIcons/AddIcon.svg'
import JSON from '../../jsonFiles/SLDListing.json'
import Inverter from '../../../public/inverter.svg'
import SortIcon from '../../assets/HomePageIcons/SortIcons.svg'
import './SLDListingTable.css'
import CreateSLDModal from '../CreateSLDModal/CreateSLDModal'

interface Listing {
    sldId: string;
    sldName: string;
    powerPlantId: string;
    createdBy: string;
    updatedBy: string;
    lastUpdated: string;
    status: string
}

const SLDListingTable = () => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(String);
    const SearchInputRef = useRef<HTMLInputElement>();
    const [listings, setlistings] = useState<Listing[]>(JSON)

    const openModal = () => {
        setisModalOpen(prev => !prev)
    }

    return (
        <>
            <CreateSLDModal modalOpen={isModalOpen} onClose={openModal} />
            <div className="configures">
                <div className="addSLDButton">
                    <button
                        onClick={openModal}
                    >
                        <img src={AddIcon} alt="add" />
                        Add SLD</button>
                </div>
                <div className="searchAndDelete">
                    <div className="searchDiv">
                        <input placeholder="Search"
                        ref={SearchInputRef}
                        id="searchval"
                             />
                        <img src={SearchIcon} alt="search"
                        onClick={() => setSearchValue(SearchInputRef.current?.value)}
                        />
                    </div>
                    <div className="downloadDiv">
                        <img src={DownloadIcon} alt="download" />
                        <img src={CaretDown} alt="caret-down" />
                    </div>
                    <div className="deleteDiv">
                        <img src={DeleteIcon} alt="delete" />
                    </div>
                </div>
            </div>
            <div className="SLDtable">
                <table>
                    <thead>
                        <tr style={{ border: "1px solid green" }}>
                            <th><input type="checkbox" name="" id="" /></th>
                            <th>
                                <div className="title">
                                    Name
                                    <img src={SortIcon} alt="sort" />
                                </div>
                            </th>
                            <th>Power Plant</th>
                            <th>Created By</th>
                            <th>Updated By</th>
                            <th>Last Updated</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listings
                                .map((listing) => {
                                    if (listing.sldName.toLowerCase().includes(searchValue.toLowerCase()))
                                        return (<tr key={listing.sldId}>
                                            <td><input type="checkbox" name="" id="" /></td>
                                            <td>
                                                <div className='name'>
                                                    <img src={Inverter} alt="inverter" />
                                                    {listing.sldName}
                                                </div>
                                            </td>
                                            <td>
                                                {listing.powerPlantId}
                                            </td>
                                            <td>
                                                {listing.createdBy}

                                            </td>
                                            <td>
                                                {listing.updatedBy}

                                            </td>
                                            <td>
                                                {listing.lastUpdated}

                                            </td>
                                            <td>
                                                {listing.status}

                                            </td>
                                            <td></td>
                                        </tr>)
                                })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SLDListingTable