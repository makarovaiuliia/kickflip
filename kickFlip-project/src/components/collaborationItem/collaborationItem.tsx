type Props = {
    collaborationImage: string;
    collaborationHeading: string;
    collaborationText: string;
};

export default function CollaborationItem(props: Props): JSX.Element {
    const { collaborationImage, collaborationHeading, collaborationText } = props;

    return (
        <figure className="collaboration-item">
            <img className="collaboration-image" src={collaborationImage} alt={collaborationImage} />
            <figcaption>
                <h5 className="collaboration-heading">{collaborationHeading}</h5>
                <p className="collaboration-text">{collaborationText}</p>
            </figcaption>
        </figure>
    );
}
