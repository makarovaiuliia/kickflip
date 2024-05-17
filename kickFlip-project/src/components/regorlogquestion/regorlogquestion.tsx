import { Link } from 'react-router-dom';
import { RegOrLogQuestionDataItemType } from '@/types/types';
import './regorlogquestion.css';

export default function RegOrLogQuestion({ question, button, link }: RegOrLogQuestionDataItemType) {
    return (
        <div className="regorlog-question">
            <p className="regorlog-question-text">
                {question}{' '}
                <Link className="regorlog-question-link" to={link}>
                    {' '}
                    {button}
                </Link>
            </p>
        </div>
    );
}
