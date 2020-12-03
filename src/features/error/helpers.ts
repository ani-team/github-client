import { ServerError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { AppError } from "models";
import { Definitions } from "./definitions";

/**
 * Проверка: является ли ошибка GitHub Error
 */
const isGithubError = (error: any): error is { type: string } => {
    return typeof error.type === "string";
};

/**
 * Проверка: является ли ошибка серверной
 */
const isServerError = (error: any): error is ServerError => {
    return typeof error.statusCode === "number";
};

/**
 * Соответствие полученной ошибки с прописанными и обрабатываемыми на уровне приложения
 * @see ErrorDefinitions
 */
export function mapError(error?: GraphQLError | Error | ServerError): AppError | null {
    if (!error) return null;
    if (isGithubError(error)) {
        // FIXME: handle 403 and 500 errors as well w/o side effects
        if (error.type === "NOT_FOUND") {
            return Definitions[error.type];
        }
    }
    if (isServerError(error)) {
        if (error.statusCode === 401) return Definitions.UNAUTHORIZED;
    }
    if (error instanceof TypeError && error.message === "Failed to fetch") {
        return Definitions.NETWORK_ERROR;
    }
    // TODO: handle other errors and whatever can be broken
    return null;
}
