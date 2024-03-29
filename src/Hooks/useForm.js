import { useState } from "react";



export const useForm = (initialForm, validationsForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
    
        const { name, value }= e.target;

        setForm({
            ...form,
            [name]: value
        });
    };
    
    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validationsForm(form));
    };

    const handleSubmit = (e) => {};

    return {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    }
};