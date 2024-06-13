import './confirmRemoving.css';

interface ConfirmMessageProps {
    clickYes: () => void;
    clickNo: () => void;
}

export default function ConfirmRemovingMessage({ clickYes, clickNo }: ConfirmMessageProps) {
    return (
        <div className="confirm-wrapper">
            <h1 className="confirtm-title">
                Are you sure
                <span className="accent">?</span>
            </h1>

            <div className="confirm-btn-wrapper">
                <button type="button" className="confirm-button confirm-button--yes" onClick={clickYes}>
                    Yes
                </button>
                <button type="button" className="confirm-button confirm-button--no" onClick={clickNo}>
                    No
                </button>
            </div>
        </div>
    );
}
