import React from 'react';
import './breadCrumbs.css';

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
                    <a href={crumb.url} className="crumb-link">
                        {crumb.label}
                    </a>
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
