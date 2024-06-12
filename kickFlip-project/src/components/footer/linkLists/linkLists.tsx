import LinkList from './linkList/linkList';
import { catalog, company, discount } from './linkListData';
import './linkLists.css';

export default function LinkLists(): JSX.Element {
    return (
        <div className="link-lists">
            <LinkList title="Shop for kicks" links={catalog} />
            <LinkList title="Discounts" links={discount} />
            <LinkList title="Our company" links={company} />
        </div>
    );
}
