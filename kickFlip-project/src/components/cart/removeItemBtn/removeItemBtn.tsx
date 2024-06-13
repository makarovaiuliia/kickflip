import './removeItemBtn.css';

interface RemoveItemBtnProps {
    onclick: () => void;
}

export default function RemoveItemBtn({ onclick }: RemoveItemBtnProps) {
    return (
        <button type="button" aria-label="delete-item" className="remove-btn" onClick={onclick}>
            Remove from cart
        </button>
    );
}
