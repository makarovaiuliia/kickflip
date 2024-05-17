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

type OptionProps = {
    key: string;
    value: string | boolean;
};

type Option = {
    value: string;
    text: string;
    props?: OptionProps[];
};

interface FormFieldProps<T extends FieldValues> {
    fieldTag?: string;
    selectOptions?: Option[];
    addWrapperClasses?: string[];
    type?: string;
    label?: string;
    id?: string;
    name: Path<T>;
    placeholder?: string;
    register: UseFormRegister<T>;
    errors?: FieldError;
    validationRules?: RegisterOptions;
}

export default function FormField<T extends FieldValues>({
    fieldTag,
    addWrapperClasses,
    selectOptions,
    type,
    label,
    id,
    name,
    placeholder,
    register,
    errors,
    validationRules,
}: FormFieldProps<T>) {
    const options = selectOptions?.map((option) => (
        <option key={option.value} value={option.value}>
            {option.text}
        </option>
    ));

    return (
        <div className={`input-wrapper ${addWrapperClasses ? addWrapperClasses.join(' ') : ''}`}>
            {label && (
                <label className="form-label" htmlFor={id}>
                    {label}
                </label>
            )}
            {fieldTag === 'input' && (
                <input
                    type={type}
                    className="form-input"
                    placeholder={placeholder}
                    spellCheck="false"
                    id={id}
                    {...register(name, validationRules)}
                />
            )}
            {fieldTag === 'select' && (
                <select className="form-input" id={id} {...register(name, validationRules)}>
                    {options}
                </select>
            )}
            <span className="error-message">{!errors ? '' : !errors.ref ? '' : errors.message}</span>
        </div>
    );
}

FormField.defaultProps = {
    addWrapperClasses: '',
    type: 'text',
    label: null,
    id: null,
    validationRules: {},
    errors: undefined,
    fieldTag: 'input',
    selectOptions: [],
    placeholder: '',
};