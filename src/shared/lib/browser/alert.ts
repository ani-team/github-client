import { notification } from "antd";

/**
 * NOTE: Вынес в отдельный модуль для:
 * - упрощения API (более нормализированное и привычное)
 * - для стандартизации единого placement для всех алертов
 */
const generateOpener = (type: import("antd/lib/notification").IconType) => (
    message: string,
    description?: string,
) => {
    notification.open({ type, message, description, placement: "bottomRight" });
};

export const error = generateOpener("error");
export const success = generateOpener("success");
export const warn = generateOpener("warning");
export const info = generateOpener("info");
