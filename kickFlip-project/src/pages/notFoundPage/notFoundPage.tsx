import { Link } from 'react-router-dom';
import './notFoundPage.css';

export default function NotFoundPage(): JSX.Element {
    return (
        <div className="notfound-wrapper">
            <h1 className="notfound-title">Sorry, we can{" ' "}t fint this page</h1>
            <p className="notfound-text">But we have many more things for you to explore.</p>
            <Link className="notfound-button" to="/">
                back to homepage
            </Link>
        </div>
    );
}
