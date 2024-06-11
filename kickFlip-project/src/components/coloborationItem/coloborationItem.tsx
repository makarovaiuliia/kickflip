type Props = {
    coloborationImage: string;
    coloborationHeading: string;
    coloborationText: string;
};

export default function ColoborationItem(props: Props): JSX.Element {
    const { coloborationImage, coloborationHeading, coloborationText } = props;

    return (
        <figure className="collaboration-item">
            <img className="collaboration-image" src={coloborationImage} alt={coloborationImage} />
            <figcaption>
                <h5 className="collaboration-heading">{coloborationHeading}</h5>
                <p className="collaboration-text">{coloborationText}</p>
            </figcaption>
        </figure>
    );
}
