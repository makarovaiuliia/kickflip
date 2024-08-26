import './footer.css';
import LinkLists from './linkLists/linkLists';
import MailingList from './mailingList/mailingList';
import socialsData from './socialsData';

export default function Footer(): JSX.Element {
    return (
        <footer className="footer">
            <div className="footer-wrapper">
                <div className="footer_main-container">
                    <MailingList />
                    <LinkLists />
                </div>
                <div className="footer_links-container">
                    <p>RS school project | 2024</p>
                    <ul className="socials_icons">
                        {socialsData.map((socialData) => (
                            <li className="socials_link" key={socialData.title}>
                                <a href={socialData.link}>
                                    <img src={socialData.image} alt={socialData.title} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
