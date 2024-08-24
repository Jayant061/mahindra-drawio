import React, { FC } from 'react'


import './CreateSLDModal.css'

interface ModalProps {
    modalOpen: boolean;
}

const CreateSLDModal: FC<ModalProps> = (props): JSX.Element => {
    return (
        <div className="modal-Background">
            <div className="dailogBox">
                Hello
            </div>
        </div>
    )
}

export default CreateSLDModal