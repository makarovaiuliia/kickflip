import './aboutUs.css';

import gallery1 from '../../images/gallery-1.png';
import gallery2 from '../../images/gallery-2.png';
import gallery3 from '../../images/gallery-3.png';

import Pavel from '../../images/pavel.jpg';
import Sveta from '../../images/sveta.jpeg';
import Iuliia from '../../images/iuliia.jpeg';

import icon1 from '../../images/icon-ok-hand.png';
import icon2 from '../../images/icon-hand-with-flag.png';
import icon3 from '../../images/icon-hand-with-magnifying-glass.png';
import icon4 from '../../images/icon-hand-with-ring.png';

import rsschool from '../../assets/icons/rs_school_js.svg';

import CollaborationItem from '@/components/collaborationItem/collaborationItem';
import AboutUsTeamMember from '@/components/aboutUsTeamMember/aboutUsTeamMember';

const CollaborationItems = [
    {
        collaborationImage: icon1,
        collaborationHeading: 'Quality first',
        collaborationText: 'Minimum bugs in the project',
    },
    {
        collaborationImage: icon2,
        collaborationHeading: 'High performance',
        collaborationText: 'Timely completion of tasks',
    },
    {
        collaborationImage: icon3,
        collaborationHeading: 'Result orientation',
        collaborationText: 'Completing tasks for 200%',
    },
    {
        collaborationImage: icon4,
        collaborationHeading: 'Faith in success',
        collaborationText: 'Confidence in the result',
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
            'Shopping cart integration;',
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
            'Modify product quantity;',
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
            'CommerceTools project and api client setup;',
            'Navigation and Header implementation;',
            'Routing implementation;',
            'Display user profile information;',
            'Edit user profile information;',
            'About page implementation;',
            'Detailed product page implementation;',
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
                        World renowned as one of the best stockists of exclusive, stylish footwear and streetwear.
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
                        {CollaborationItems.map((item) => (
                            <CollaborationItem
                                collaborationImage={item.collaborationImage}
                                collaborationHeading={item.collaborationHeading}
                                collaborationText={item.collaborationText}
                                key={item.collaborationImage}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
