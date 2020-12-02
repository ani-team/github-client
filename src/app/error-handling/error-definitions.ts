import { AppError } from "models";

/**
 * Обрабатываемые ошибки приложения
 */
export const ErrorDefinitions: Record<string, AppError> = {
    UNAUTHORIZED: {
        code: 401,
        message: "You shall not pass!",
        description: "Occurred problems with your credential. Re-sign in, please",
    },
    FORBIDDEN: {
        code: 403,
        message: "Yo, access Forbidden\nYou shouldn’t be here",
        description: "do smth hehe",
    },
    NOT_FOUND: {
        code: 404,
        message: "404!\nPage not found",
        description: "maybe your url is wrong",
    },
    INTERNAL_ERROR: {
        code: 500,
        message: "500 Server Error\nSomething’s wrong!",
        description: "we’re doing smth",
    },
};
