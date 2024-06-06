import './footer.css';
import LinkLists from './linkLists/linkLists';
import MailingList from './mailingList/mailingList';

/* eslint-disable import/no-absolute-path */
import youtube from '/youtube.svg';
import insta from '/insta.svg';
import tiktok from '/tiktok.svg';
/* eslint-enable import/no-absolute-path */

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
                    <div className="socials_icons">
                        <a href="https://www.instagram.com/" className="socials_link">
                            <img src={insta} alt="Insta icon" />
                        </a>
                        <a href="https://www.tiktok.com/">
                            <img src={tiktok} alt="Tiktok icon" className="socials_link" />
                        </a>
                        <a href="https://www.youtube.com/">
                            <img src={youtube} alt="YouTube icon" className="socials_link" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
