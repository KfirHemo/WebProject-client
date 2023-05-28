import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ConfirmModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    confirmationText: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
    show,
    onHide,
    onConfirm,
    confirmationText,
}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Action</Modal.Title>
            </Modal.Header>
            <Modal.Body>{confirmationText}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
