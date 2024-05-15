import {
    UseFormRegister,
    FieldValues,
    RegisterOptions,
    Path,
    Ref,
    MultipleFieldErrors,
    Message,
} from 'react-hook-form';

type FieldError = {
    type: string;
    ref?: Ref;
    types?: MultipleFieldErrors;
    message?: Message;
};

interface InputFieldProps<T extends FieldValues> {
    addWrapperClasses?: string[];
    type?: string;
    label?: string;
    id?: string;
    name: Path<T>;
    placeholder: string;
    register: UseFormRegister<T>;
    errors?: FieldError;
    validationRules?: RegisterOptions;
}

export default function InputField<T extends FieldValues>({
    addWrapperClasses,
    type,
    label,
    id,
    name,
    placeholder,
    register,
    errors,
    validationRules,
}: InputFieldProps<T>) {
    return (
        <div className={`input-wrapper ${addWrapperClasses ? addWrapperClasses.join(' ') : ''}`}>
            {label && (
                <label className="form-label" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className="form-input"
                placeholder={placeholder}
                spellCheck="false"
                id={id}
                {...register(name, validationRules)}
            />
            <span className="error-message">{!errors ? '' : !errors.ref ? '' : errors.message}</span>
        </div>
    );
}
InputField.defaultProps = {
    addWrapperClasses: '',
    type: 'text',
    label: null,
    id: null,
    validationRules: {},
    errors: undefined,
};
