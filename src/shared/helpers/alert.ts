import { notification } from "antd";

/**
 * NOTE: Вынес в отдельный модуль для:
 * - упрощения API (более нормализированное и привычное)
 * - для стандартизации единого placement для всех алертов
 */
const placement = "bottomRight";

export const error = (message: string) => notification.error({ message, placement });
export const success = (message: string) => notification.success({ message, placement });
export const warn = (message: string) => notification.warn({ message, placement });
export const info = (message: string) => notification.info({ message, placement });
