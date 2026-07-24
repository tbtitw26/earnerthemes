import { AlertColor } from "@mui/material/Alert";
import { isAllowedCountryValue } from "@/utils/countries";

export const signUpInitialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    country: "",
    postCode: "",
    password: "",
    confirmPassword: "",
    terms: false,
};

type SignUpErrors = Partial<Record<keyof typeof signUpInitialValues, string>>;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/** Minimum age required to hold an account, matching clause 5 of the Terms and Conditions. */
export const MINIMUM_AGE = 18;

function calculateAge(dateOfBirth: string): number {
    const birth = new Date(dateOfBirth);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
        age -= 1;
    }
    return age;
}

export const signUpValidation = (values: typeof signUpInitialValues) => {
    const errors: SignUpErrors = {};
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const email = values.email.trim();
    const phoneNumber = values.phoneNumber.trim();
    const street = values.street.trim();
    const city = values.city.trim();
    const country = values.country.trim();
    const postCode = values.postCode.trim();
    const password = values.password;
    const confirmPassword = values.confirmPassword;

    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required";
    } else if (!DATE_REGEX.test(values.dateOfBirth) || Number.isNaN(Date.parse(values.dateOfBirth))) {
        errors.dateOfBirth = "Enter a valid date";
    } else if (calculateAge(values.dateOfBirth) < MINIMUM_AGE) {
        // The Terms require capacity to enter a binding contract, so the age gate is enforced here too.
        errors.dateOfBirth = `You must be at least ${MINIMUM_AGE} years old to create an account`;
    }
    if (!email) {
        errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = "Enter a valid email address";
    }
    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!street) errors.street = "Street is required";
    if (!city) errors.city = "City is required";
    if (!country) {
        errors.country = "Country is required";
    } else if (!isAllowedCountryValue(country)) {
        errors.country = "Select a supported country";
    }
    if (!postCode) errors.postCode = "Post code is required";
    if (!password) {
        errors.password = "Password is required";
    }
    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords must match";
    }

    if (!values.terms) {
        errors.terms = "You must agree to the Terms and Conditions";
    }

    return errors;
};

export const signUpOnSubmit = async (
    values: typeof signUpInitialValues,
    { setSubmitting }: { setSubmitting: (v: boolean) => void },
    showAlert: (msg: string, desc?: string, severity?: AlertColor) => void,
    router: { replace: (url: string) => void; refresh: () => void }
) => {
    try {
        const payload = {
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            dateOfBirth: values.dateOfBirth,
            email: values.email.trim(),
            phoneNumber: values.phoneNumber.trim(),
            street: values.street.trim(),
            city: values.city.trim(),
            country: values.country.trim(),
            postCode: values.postCode.trim(),
            password: values.password,
            confirmPassword: values.confirmPassword,
        };

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data?.user) {
            showAlert("Registration successful", "", "success");
            router.replace("/");
            router.refresh();
        } else {
            showAlert(data?.message || "Registration failed", "", "error");
        }
    } catch (e: any) {
        showAlert(e?.message || "Network error", "", "error");
    } finally {
        setSubmitting(false);
    }
};
