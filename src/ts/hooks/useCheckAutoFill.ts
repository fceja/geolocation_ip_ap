import { useEffect, useState, useCallback } from "react";

/* check if form data was auto filled on page load */
const useCheckAutoFill = () => {
    const [autoEmail, setAutoEmail] = useState('');
    const [autoPassword, setAutoPassword] = useState('');

    const checkAutofill = useCallback(() => {
        console.log('checking')
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
        const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;

        if (emailInput && emailInput.value) {
            setAutoEmail(emailInput.value);
        }

        if (passwordInput && passwordInput.value) {
            setAutoPassword(passwordInput.value);
        }
    }, []);

    useEffect(() => {
        checkAutofill();

        // autofill on focus
        document.addEventListener('focus', checkAutofill, true);

        // cleanup
        return () => {
            document.removeEventListener('focus', checkAutofill, true);
        };
    }, [checkAutofill]);

    return { autoEmail, autoPassword };
}

export default useCheckAutoFill;
