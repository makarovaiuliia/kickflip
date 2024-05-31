import React from 'react';
import './breadCrumbs.css';
import { Link } from 'react-router-dom';

export type CrumbType = {
    label: string;
    url: string;
};

export type BreadcrumbsProps = {
    crumbs: CrumbType[];
};

function BreadCrumbs({ crumbs }: BreadcrumbsProps): JSX.Element {
    const renderCrumb = (crumb: CrumbType) => (
        <React.Fragment key={crumb.label}>
            {crumb.url ? (
                <li className="crumb-section">
                    <Link to={crumb.url} className="crumb-link">
                        {crumb.label}
                    </Link>
                    <span className="crumb-separator" />
                </li>
            ) : (
                <li className="crumb-current">{crumb.label}</li>
            )}
        </React.Fragment>
    );
    return <ul className="breadcrumbs">{crumbs.length && crumbs.map(renderCrumb)}</ul>;
}

export default BreadCrumbs;
