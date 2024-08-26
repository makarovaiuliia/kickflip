type Props = {
    member: string;
    memberPhoto: string;
    role: string;
    github: string;
    githubLink: string;
    description: string;
    contributions: string[];
};

export default function AboutUsTeamMember(props: Props): JSX.Element {
    const { member, memberPhoto, role, github, githubLink, description, contributions } = props;

    return (
        <div className="aboutUs-teamMember">
            <img className="teamMember-image" src={memberPhoto} alt="member" />
            <div className="teamMember-content">
                <h3 className="teamMember-title">{member}</h3>
                <h4 className="teamMember-subtitle">
                    {role} -{' '}
                    <a className="teamMember-subtitle-link" href={githubLink} target="_blank" rel="noreferrer">
                        {github}
                    </a>
                </h4>
                <p className="teamMember-text">{description}</p>
                <p className="teamMember-text">
                    Contribution to the project:{' '}
                    <ul className="teamMember-list">
                        {contributions.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </p>
            </div>
        </div>
    );
}
