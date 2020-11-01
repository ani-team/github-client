/**
 * Модуль инициализации env-переменных
 * @remark Если не найдено значение хоть одной переменной,
 * Приложение сразу выбросит ошибку, при инициализации модуля
 * @module
 */

/**
 * Получение env-переменной
 * @throwable
 */
const getEnvVar = (key: string) => {
    if (process.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }
    return process.env[key] || "";
};

/** API entrypoint */
export const API_URL = getEnvVar("REACT_APP_API_URL");
/** OAuth GitHub (id) */
export const CLIENT_ID = getEnvVar("REACT_APP_CLIENT_ID");
/** OAuth GitHub (secret) */
export const CLIENT_SECRET = getEnvVar("REACT_APP_CLIENT_SECRET");

/** Режим запуска программы */
export const NODE_ENV = getEnvVar("NODE_ENV");
/** Режим разработки */
export const isDevEnv = NODE_ENV === "development";
/** Режим продакшена */
export const isProdEnv = NODE_ENV === "production";
