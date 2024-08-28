import { useState, useRef, EventHandler } from 'react';
import SearchIcon from '../../assets/HomePageIcons/Search.svg';
import DownloadIcon from '../../assets/HomePageIcons/DownloadIcon.svg';
import CaretDown from '../../assets/HomePageIcons/CaretDown.svg';
import DeleteIcon from '../../assets/HomePageIcons/DeleteIcon.svg';
import AddIcon from '../../assets/HomePageIcons/AddIcon.svg';
import JSON from '../../jsonFiles/SLDListing.json';
import Inverter from '../../../public/inverter.svg';
import SortIcon from '../../assets/HomePageIcons/SortIcons.svg';
import './SLDListingTable.css';
import CreateSLDModal from '../CreateSLDModal/CreateSLDModal';
import PreviewIcon from '../../assets/HomePageIcons/PreviewIcon.svg';
import EditIcon from '../../assets/HomePageIcons/EditIcon.svg';
import ThreeDotsIcon from '../../assets/HomePageIcons/ThreeDots.svg'
import CaretRight from '../../assets/HomePageIcons/CaretRight.svg'
import Checkbox from '@mui/material/Checkbox';

interface Listing {
    sldId: string;
    sldName: string;
    powerPlantId: string;
    createdBy: string;
    updatedBy: string;
    lastUpdated: string;
    status: string;
}

type SortType = 'default' | 'asc' | 'desc';

const SLDListingTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [listings, setListings] = useState<Listing[]>(JSON);
    const [defaultListing, setDefaultListing] = useState<Listing[]>(JSON);
    const [currentType, setCurrentType] = useState<SortType>('default');
    const [downloadDropDownState, setDownloadDropDownState] = useState<boolean>(false);
    const [downloadDropDownState2, setDownloadDropDownState2] = useState<boolean>(false);
    const [selectedRows, setSelectedRow] = useState<Listing[]>([]);

    const openModal = () => setIsModalOpen(prev => !prev);

    const sortingFunction = () => {
        let sortedListings = [...listings];
        if (currentType === 'default') {
            sortedListings.sort((a, b) => a.sldName.localeCompare(b.sldName));
            setListings(sortedListings);
            setCurrentType('asc');
        } else if (currentType === 'asc') {
            sortedListings.sort((a, b) => b.sldName.localeCompare(a.sldName));
            setListings(sortedListings);
            setCurrentType('desc');
        }
        else {
            setListings(defaultListing);
            setCurrentType('default');
        }
    };

    const openDownloadOptions = () => {
        setDownloadDropDownState(!downloadDropDownState);
    }

    const selectAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedRow(listings);
        }
        else {
            setSelectedRow([]);
        }
    }

    const selectOrDeselectARow = (e: React.ChangeEvent<HTMLInputElement>, listing: Listing) => {
        if (e.target.checked) {
            setSelectedRow([...selectedRows, listing])
        }
        else {
            setSelectedRow(selectedRows => selectedRows.filter((value) => value.sldId !== listing.sldId))
        }
    }

    return (
        <>
            <CreateSLDModal modalOpen={isModalOpen} onClose={openModal} />
            <div className="configures">
                <div className="addSLDButton">
                    <button onClick={openModal}>
                        <img src={AddIcon} alt="add" />
                        Add SLD
                    </button>
                </div>
                <div className="searchAndDelete">
                    <div className="searchDiv">
                        <input
                            placeholder="Search"
                            ref={searchInputRef}
                            id="searchval"
                        />
                        <img
                            src={SearchIcon}
                            alt="search"
                            onClick={() => setSearchValue(searchInputRef.current?.value || '')}
                        />
                    </div>
                    <div className="downloadDiv" onClick={openDownloadOptions}>
                        <img src={DownloadIcon} alt="download" />
                        <img src={CaretDown} alt="caret-down" />
                    </div>
                    {downloadDropDownState &&
                        <div className='downloadMenu'>
                            <div className="option" onClick={() => { setDownloadDropDownState2(!downloadDropDownState2) }}>
                                <img src={DownloadIcon} alt="download-icon" />
                                <p>Download</p>
                                <img src={CaretRight} alt="caret" />
                            </div>
                            {downloadDropDownState2 && <div className='downloadMenu2'>
                                <div className="option">
                                    <p>JPG</p>
                                </div>
                                <hr />
                                <div className="option">
                                    <p>PNG</p>
                                </div>
                                <hr />
                                <div className="option">
                                    <p>PDF</p>
                                </div>
                            </div>}
                            <hr />
                            <div className="option" style={{ color: 'red' }}>
                                <img src={DeleteIcon} alt="download-icon" />
                                <p>Delete</p>
                            </div>
                        </div>
                    }
                    <div className="deleteDiv">
                        <img src={DeleteIcon} alt="delete" />
                    </div>
                </div>
            </div>
            <div className="SLDtable">
                <table>
                    <thead>
                        <tr style={{ border: '1px solid green' }}>
                            <th>
                                <Checkbox color="success" sx={{ color: 'black' }} checked={selectedRows.length === listings.length} onChange={selectAllRows} />
                            </th>
                            <th>
                                <div className="title">
                                    Name
                                    <img
                                        src={SortIcon}
                                        alt="sort"
                                        onClick={sortingFunction}
                                    />
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
                        {listings
                            .filter(listing =>
                                listing.sldName.toLowerCase().includes(searchValue.toLowerCase())
                            )
                            .map(listing => (
                                <tr key={listing.sldId}>
                                    <td>
                                        <Checkbox color="success" sx={{ color: 'black' }} checked={selectedRows.includes(listing) ? true : false}
                                            onChange={(e) => selectOrDeselectARow(e, listing)} />

                                    </td>
                                    <td>
                                        <div className='name'>
                                            <img src={Inverter} alt="inverter" />
                                            <p>
                                                {listing.sldName}
                                            </p>
                                        </div>
                                    </td>
                                    <td>{listing.powerPlantId}</td>
                                    <td>{listing.createdBy}</td>
                                    <td>{listing.updatedBy}</td>
                                    <td>{listing.lastUpdated}</td>
                                    <td>{listing.status}</td>
                                    <td>
                                        <div className="icons">
                                            <img src={PreviewIcon} alt="preview" />
                                            <img src={EditIcon} alt="edit" />
                                            <img src={ThreeDotsIcon} alt="menu" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SLDListingTable;
