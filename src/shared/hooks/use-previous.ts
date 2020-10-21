import { useRef, useEffect } from "react";

/**
 * @hook Хранение предыдущего значения
 */
function usePrevious<T = any>(value: T): T | undefined {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious;
