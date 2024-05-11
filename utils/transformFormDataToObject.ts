export default <T extends object>(form: HTMLFormElement) => {
    const formData = new FormData(form).entries();
    const rawObject = Object.fromEntries(formData) as T;
    return rawObject
}