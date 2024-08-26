import { Link } from 'react-router-dom';
import { LinkData } from '../linkListData';
import '../linkLists.css';

interface LinkListProps {
    title: string;
    links: LinkData[];
}
export default function LinkList({ title, links }: LinkListProps): JSX.Element {
    return (
        <div className="link-list">
            <p className="link-list_title">{title}</p>
            <div className="link-list_container">
                {links.map((link) => (
                    <Link to={link.link} className="link-list_link" key={link.title}>
                        {link.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
