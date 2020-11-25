/**
 * Временная реализация скроллинга к верху страницы
 * @remark Используется при пагинации
 * !!! FIXME: temp, resolve better later (by anchors / overflow / ref / scrollHandler / window patching / ...)
 */
export const scrollToTop = () => {
    document.querySelector(".gc-app")?.scrollTo({ top: 0, behavior: "smooth" });
};
