import './confirmRemoving.css';

/* eslint-disable import/no-absolute-path */
import attention from '/attention.svg';
/* eslint-enable import/no-absolute-path */

interface ConfirmMessageProps {
    clickYes: () => void;
    clickNo: () => void;
}

export default function ConfirmRemovingMessage({ clickYes, clickNo }: ConfirmMessageProps) {
    return (
        <div className="confirm-wrapper">
            <img src={attention} className="confirm_attention" alt="attention" />

            <h1 className="confirm-title">
                Are you sure
                <span className="accent">?</span>
            </h1>
            <p>This action cannot be undone. All these beautiful kicks will be deleted from your cart.</p>
            <div className="confirm-btn-wrapper">
                <button type="button" className="confirm-button confirm-button--yes" onClick={clickNo}>
                    Cancel
                </button>
                <button type="button" className="confirm-button confirm-button--no" onClick={clickYes}>
                    Yes
                </button>
            </div>
        </div>
    );
}
