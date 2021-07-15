export function isValid(value) {
    const nameRegex = /^[a-zA-Z0-9\s\-]*$/g;
    return nameRegex.test(value);
}