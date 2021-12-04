/**
 * Сделать первую букву строки заглавной
 */
export const capitalize = (term: string | null | undefined) => {
    if (!term) return "";
    return term.charAt(0).toUpperCase() + term.slice(1);
};

const THOUSAND = 1000;
const MILLION = 1000000;

/**
 * @example
 * prettyNumeric(931) // 931
 * prettyNumeric(103256) // 103.2K
 * prettyNumeric(1023256) // 1.0M
 */
export const prettyNumeric = (amount: number | undefined): string => {
    if (!amount) return "";
    if (amount < THOUSAND) return `${amount}`;
    if (amount < MILLION) return `${(amount / THOUSAND).toFixed(1)}K`;
    return `${(amount / MILLION).toFixed(1)}M`;
};
