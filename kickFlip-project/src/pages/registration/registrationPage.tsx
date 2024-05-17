import RegistrationForm from '@/components/form/registrationForm/regForm';
import RegOrLogQuestion from '@/components/regorlogquestion/regorlogquestion';
import RegOrLogQuestionData from '@/data/regorlogquestion-data';
import './regPage.css';

export default function RegistrationPage() {
    return (
        <>
            <div className="reg-page-wrapper ">
                <h1 className="form-title">Registration</h1>
                <RegistrationForm />
            </div>
            <RegOrLogQuestion
                question={RegOrLogQuestionData[1].question}
                button={RegOrLogQuestionData[1].button}
                link={RegOrLogQuestionData[1].link}
            />
        </>
    );
}
