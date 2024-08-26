import './removeBtn.css';
// eslint-disable-next-line import/no-absolute-path
import trash from '/trash.svg';

interface RemoveAllItemsBtnProps {
    onclick: () => void;
}

export default function RemoveAllItemsBtn({ onclick }: RemoveAllItemsBtnProps) {
    return (
        <button type="button" aria-label="delete-all-item" className="remove-all-btn" onClick={onclick}>
            <img src={trash} alt="" /> Remove all
        </button>
    );
}
