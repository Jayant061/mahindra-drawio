import React, { FC } from 'react';
import CloseBtnIcon from '../../assets/HomePageIcons/CloseBtn.svg';
import './CreateSLDModal.css';

interface ModalProps {
    modalOpen: boolean;
    onClose: () => void; // Add an onClose prop to handle closing the modal
}

const CreateSLDModal: FC<ModalProps> = ({ modalOpen, onClose }): JSX.Element => {
    if (!modalOpen) return null; // Return null if modal is not open

    return (
        <div className="modal-Background">
            <div className="dailogBox">
                <div className="heading">
                    <h3>Create SLD</h3>
                    <img
                        src={CloseBtnIcon}
                        alt="Close"
                        onClick={onClose} // Use onClose prop to handle close action
                        style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
                    />
                </div>
                <div className="nameInput">
                    <label htmlFor="PowerPlantName">
                        Please Name the diagram before building
                    </label>
                    <input
                        type="text"
                        id="PowerPlantName"
                        name="PowerPlantName"
                        placeholder='Enter the name'
                    />
                </div>
                <div className="IdInput">
                    <label htmlFor="SLDList">
                        Select the Power Plant ID
                    </label>
                    <select
                        name="SLDList"
                        id="SLDList"
                    >
                        <option value="">Select</option>
                        <option >SLD Name</option>
                        <option >SLD Name</option>
                        <option >SLD Name</option>
                        <option >SLD Name</option>
                        <option >SLD Name</option>
                        <option >SLD Name</option>
                    </select>
                </div>
                <div className="createBtn">
                    <button>Create</button>
                </div>
            </div>
        </div>
    );
}

export default CreateSLDModal;
