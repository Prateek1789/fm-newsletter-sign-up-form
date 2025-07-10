import { useState, useEffect } from "react";
import Validator from '../utils/validator'

const useEmailValidation = (email, subAttempt, delay = 1000) => {
    const [validationState, setValidationState] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (subAttempt && !email) {
            setValidationState('invalid');
            setErrorMessage('Email is required');
            return;
        }

        if (!email) {
            setValidationState('idle');
            setErrorMessage('');
            return;
        }
    
        setValidationState('pending');
        setErrorMessage('');
    
        const timer = setTimeout(() => {
            const validationCheck = Validator.validateEmail(email);
            setValidationState(validationCheck.isValid ? 'valid' : 'invalid');
            setErrorMessage(validationCheck.message);
        }, delay);
    
        return () => clearTimeout(timer);
    }, [ email, subAttempt ]);

   return { validationState, errorMessage } 
}  

export default useEmailValidation;