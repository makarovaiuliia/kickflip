import './categories.css';
import CategoryMain, { ICategoryMainData } from './categoryMain/categoryMain';

export default function Categories({ categories }: { categories: ICategoryMainData[] }): JSX.Element {
    return (
        <section className="section section-categories">
            <div className="content categories-main">
                <div className="section_text-container">
                    <h3 className="section_subtitle">Get fresh today</h3>
                    <h2 className="section_title">What’s on the menu?</h2>
                </div>

                <ul className="section_list categories-main_list">
                    {categories.map((category) => (
                        <CategoryMain categoryData={category} key={category.title} />
                    ))}
                </ul>
            </div>
        </section>
    );
}
