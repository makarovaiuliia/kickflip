import { Link } from 'react-router-dom';
import './notfoundPage.css';

export default function NotFoundPage(): JSX.Element {
    return (
        <div className="notfound-wrapper">
            <h1 className="notfound-title">Sorry, we can&apos;t find that page</h1>
            <p className="notfound-text">But we still have lots for you to discover ~</p>
            <Link className="notfound-button" to="/">
                back to homepage
            </Link>
        </div>
    );
}
