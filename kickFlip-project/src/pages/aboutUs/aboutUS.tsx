import './aboutUs.css';

import gallery1 from '../../images/galery-1.png';
import gallery2 from '../../images/galery-2.png';
import gallery3 from '../../images/galery-3.png';

import Pavel from '../../images/pavel.jpg';
import Sveta from '../../images/sveta.jpeg';
import Iuliia from '../../images/uliia.jpeg';

import moji1 from '../../images/moji-ok-hand.svg';
import moji2 from '../../images/moji-hand-with-flag.svg';
import moji3 from '../../images/moji-hand-with-magnifying-glass.svg';
import moji4 from '../../images/moji-hand-with-ring.svg';

import rsschool from '../../assets/icons/rs_school_js.svg';

import ColoborationItem from '@/components/coloborationItem/coloborationItem';
import AboutUsTeamMember from '@/components/aboutUsTeamMember/aboutUsTeamMember';

const ColoborationItems = [
    {
        coloborationImage: moji1,
        coloborationHeading: 'Quality first',
        coloborationText: 'Minimum bugs in the project',
    },
    {
        coloborationImage: moji2,
        coloborationHeading: 'High performance',
        coloborationText: 'Timely completion of tasks',
    },
    {
        coloborationImage: moji3,
        coloborationHeading: 'Result orientation',
        coloborationText: 'Completing tasks for 200%',
    },
    {
        coloborationImage: moji4,
        coloborationHeading: 'Faith in success',
        coloborationText: 'Confidence in the result',
    },
];

const TeamMembers = [
    {
        member: 'Iuliia Makarova',
        memberPhoto: Iuliia,
        role: 'Team lead',
        github: 'makarovaiuliia',
        githubLink: 'https://github.com/makarovaiuliia',
        description:
            "I'm a frontend web developer with a passion for the web, coding, and learning new things. My technical Skills: Proficient in CSS, SCSS, HTML, Vanilla JS, TypeScript with a growing expertise in React.js. I'm also familiar with tools like webpack, gulp, and various linters and formatters.",
        contributions: [
            'Repository and task board setup;',
            'Server-side implementation of Login and Registration pages;',
            'Error handling during login and registration;',
            'Display product list and category navigation;',
            'Interactive product cards;',
            'Main page and Footer implementation;',
        ],
    },
    {
        member: 'Svetlana Ilina',
        memberPhoto: Sveta,
        role: 'Developer',
        github: 'svetailina',
        githubLink: 'https://github.com/svetailina',
        description:
            "I've been studying Frontend for six months. But I realized, that I needed a more structured approach to learning. My goal is to get as much knowledge about front-end development as possible. I have completed several free courses and I want to continue to develop myself. I really enjoy learning new things.",
        contributions: [
            'Development environment configuration and scripts;',
            'Client-side Login and Registration pages implementation;',
            'Make product lis with all data;',
            'Display product information;',
            'Enlarged image modal with slider;',
            'Display basket items;',
        ],
    },
    {
        member: 'Pavel Kuvshinov',
        memberPhoto: Pavel,
        role: 'Developer',
        github: 'pavel-kuvshinov',
        githubLink: 'https://github.com/pavel-kuvshinov',
        description:
            'First of all, I want to gain new knowledge, skills and experience. I am sure they will be useful to me in the future. A good achievement will be successful completion of training at all stages and getting a new job. I am sure that I will succeed.',
        contributions: [
            'Commercetools project and api client setup;',
            'Navigation and Header implementation;',
            'Routing implementation;',
            'Display user profile information;',
            'Edit user profile information;',
            'About page implementation;',
        ],
    },
];

export default function AboutUsPage(): JSX.Element {
    return (
        <div className="aboutUS-wrapper">
            <section className="aboutUs-section">
                <div className="aboutUs-content">
                    <h2 className="aboutUs-title">
                        Kickflip shop by WebStore Warriors<span className="text-colored">.</span>{' '}
                    </h2>
                    <p className="section-content-text">
                        World reknowned as one of the best stockists of exclusive, stylish footwear and streetwear.
                        Welcome to Kickflip.
                    </p>
                    <p className="section-content-text">
                        This project uses technologies such as React, Redux, Typescript, Vite and etc.
                    </p>
                    <p className="section-content-text">
                        Kickflip e-commerce shop has been created by Webstore Warriors team specially for the{' '}
                        <a href="https://rs.school/" target="_blank" rel="noreferrer">
                            <img className="rsschool-icon" src={rsschool} alt="rsschool" />
                        </a>
                        .{' '}
                    </p>
                </div>
                <div className="aboutUs-gallery">
                    <img className="gallery-image-vertical" src={gallery1} alt="gallery1" />
                    <img className="gallery-image-horizontal" src={gallery2} alt="gallery2" />
                    <img className="gallery-image-vertical" src={gallery3} alt="gallery3" />
                </div>
            </section>
            <section className="aboutUs-teamMembers">
                <h2 className="aboutUs-title">
                    WebStore Warriors team<span className="text-colored">.</span>{' '}
                </h2>
                {TeamMembers.map((elem) => (
                    <AboutUsTeamMember
                        member={elem.member}
                        memberPhoto={elem.memberPhoto}
                        role={elem.role}
                        github={elem.github}
                        githubLink={elem.githubLink}
                        description={elem.description}
                        contributions={elem.contributions}
                        key={elem.member}
                    />
                ))}
            </section>
            <section className="aboutUs-collaboration">
                <div className="aboutUs-collaboration-wrapper">
                    <h2 className="aboutUs-title">
                        WebStore Warriors collaboration<span className="text-colored">.</span>{' '}
                    </h2>
                    <div className="collaboration-list">
                        {ColoborationItems.map((item) => (
                            <ColoborationItem
                                coloborationImage={item.coloborationImage}
                                coloborationHeading={item.coloborationHeading}
                                coloborationText={item.coloborationText}
                                key={item.coloborationImage}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
