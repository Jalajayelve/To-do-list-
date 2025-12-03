export const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
        day : 'numeric',
        month: 'long',
        year: 'numeric',
    });
}