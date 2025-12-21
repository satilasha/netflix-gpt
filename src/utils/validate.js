export const validateSignIn = (email, password, name) => {


    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(password);
    const nameRegex = /^[a-zA-Z][a-zA-Z' .-]*[a-zA-Z]$/.test(name);

    if (name != "not_required" && !nameRegex) {
        return { valid: false, message: "Invalid name format." };
    }

    if (!emailRegex) {
        return { valid: false, message: "Invalid email format." };
    }

    if (password.length < 6 || !passwordRegex) {
        return { valid: false, message: "Invalid Password" };
    }

    return { valid: true };
};