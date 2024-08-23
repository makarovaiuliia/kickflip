import './button.css';

type Props = {
    text: string;
    className: string;
};

export default function Button(props: Props) {
    const { text, className } = props;

    return (
        <button className={className} type="button">
            {text}
        </button>
    );
}
