import Accordion from '../accordion/accordion';
import './filterComponent.css';

interface FilterComponentProps {
    filterOptions: { title: string; options: string[] }[];
}

function FilterComponent({ filterOptions }: FilterComponentProps): JSX.Element {
    return (
        <ul className="filter">
            {filterOptions.map((option) => (
                <Accordion title={option.title} options={option.options} key={option.title} />
            ))}
        </ul>
    );
}

export default FilterComponent;
