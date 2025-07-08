const Validator = {
    isEmailValid: (email) => {
        const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRule.test(email);
    },
    validateEmail: (email) => {
        if (!email) return { isValid: false, message: 'Email is required' };

        if (!Validator.isEmailValid(email)) return { isValid: false, message: 'Valid email required' }

        return { isValid: true, message: '' }
    }
};

export default Validator;