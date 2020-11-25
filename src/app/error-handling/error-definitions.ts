import { AppError } from "models";

export const ErrorDefinitions: Record<string, AppError> = {
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
