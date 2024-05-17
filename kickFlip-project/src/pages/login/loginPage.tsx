import LoginForm from '@/components/form/LoginForm/loginForm';
import RegOrLogQuestion from '@/components/regorlogquestion/regorlogquestion';
import RegOrLogQuestionData from '@/data/regorlogquestion-data';
// import { RegOrLogQuestionDataItemType } from '@/types/types';
import './loginPage.css';

export default function LoginPage() {
    return (
        <>
            <LoginForm />
            <RegOrLogQuestion
                question={RegOrLogQuestionData[0].question}
                button={RegOrLogQuestionData[0].button}
                link={RegOrLogQuestionData[0].link}
            />
        </>
    );
}
