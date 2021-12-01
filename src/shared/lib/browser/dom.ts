/**
 * Временная реализация скроллинга к верху страницы
 * @remark Используется при пагинации
 * !!! FIXME: temp, resolve better later (by anchors / overflow / ref / scrollHandler / window patching / ...)
 * !!! FIXME: resolve on withAntd level? (with getParentContainer)
 */
export const scrollToTop = () => {
    document.querySelector(".ant-layout-content")?.scrollTo({ top: 0, behavior: "smooth" });
};
