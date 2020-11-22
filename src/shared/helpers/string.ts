export const capitalize = (term: string | null | undefined) => {
    if (!term) return "";
    return term.charAt(0).toUpperCase() + term.slice(1);
};
