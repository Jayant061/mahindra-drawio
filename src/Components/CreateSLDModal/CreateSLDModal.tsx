import React, { FC } from 'react';
import CloseBtnIcon from '../../assets/HomePageIcons/CloseBtn.svg';
import { useNavigate } from 'react-router-dom';

import './CreateSLDModal.css';

interface ModalProps {
    modalOpen: boolean;
    onClose: () => void;
}

const CreateSLDModal: FC<ModalProps> = ({ modalOpen, onClose }): JSX.Element => {
    if (!modalOpen) return null;
    const navigate = useNavigate();

    const NavigateToPlayground = () => {
        navigate("/playground");
    }

    return (
        <div className="modal-Background">
            <div className="dailogBox">
                <div className="heading">
                    <h3>Create SLD</h3>
                    <img
                        src={CloseBtnIcon}
                        alt="Close"
                        onClick={onClose}
                        style={{ cursor: 'pointer' }}
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
                    <button onClick={NavigateToPlayground}>Create</button>
                </div>
            </div>
        </div>
    );
}

export default CreateSLDModal;
