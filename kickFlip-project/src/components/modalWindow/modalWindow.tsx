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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeModal]);

    const handleOverlayClick = () => {
        closeModal(false);
    };

    const handleContentClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className={`modal-overlay ${isThisOpen ? 'open' : ''}`}
            onClick={handleOverlayClick}
            onKeyDown={handleOverlayClick}
            role="button"
            tabIndex={0}
        >
            <div
                className="content-wrapper"
                onClick={handleContentClick}
                onKeyDown={handleContentClick}
                role="button"
                tabIndex={0}
            >
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
