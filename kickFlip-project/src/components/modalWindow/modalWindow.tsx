import { useEffect, useState } from 'react';
import './modalWindow.css';

interface ModalWindowProps {
    content: string | JSX.Element;
    closeModal: (isOpen: boolean) => void;
    open: boolean;
}

export default function ModalWindow({ content, closeModal, open }: ModalWindowProps) {
    const [isThisOpen, setIsThisOpen] = useState(false);
    useEffect(() => setIsThisOpen(open), [open]);

    return (
        <div className={`modal-overlay ${isThisOpen ? 'open' : ''}`}>
            <div className="content-wrapper">
                <button
                    className="close-btn"
                    aria-label="Close"
                    type="button"
                    onClick={() => {
                        closeModal(false);
                    }}
                >
                    &times;
                </button>
                {content}
            </div>
        </div>
    );
}
