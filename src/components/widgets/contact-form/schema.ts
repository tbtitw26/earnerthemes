import * as Yup from "yup";

export async function sendContactRequest(data: {
    name: string;
    secondName: string;
    email: string;
    phone: string;
    message?: string;
}) {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to send contact request");
    return res.json();
}

const countDigits = (value?: string) => (value || "").replace(/\D/g, "").length;

export const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("First name is required"),
    secondName: Yup.string().trim().required("Second name is required"),
    email: Yup.string().trim().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .required("Phone number is required")
        // Customers type numbers with "+", spaces, dashes and brackets — only the digits matter.
        .matches(/^[+()\d\s-]+$/, "Only numbers, spaces and + ( ) - are allowed")
        .test("min-digits", "Minimum 5 digits", (value) => countDigits(value) >= 5)
        .test("max-digits", "Maximum 15 digits", (value) => countDigits(value) <= 15),
    message: Yup.string(),
    acceptPolicy: Yup.boolean().oneOf([true], "Please accept the Privacy Policy"),
});

export const initialValues = {
    name: "",
    secondName: "",
    email: "",
    phone: "",
    message: "",
    acceptPolicy: false,
};
