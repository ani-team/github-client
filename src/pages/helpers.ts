import { useEffect } from "react";

/**
 * @hook Задать title странице
 */
export const useTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};
