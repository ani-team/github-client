// Ему можно так импортить :D (он же прослойка)
export * from "./models.gen"; // eslint-disable-line no-restricted-imports

/**
 * Идентификационные данные для репозитория и его состояния
 * FIXME: DRY pages/repository RouteComponents generic
 */
export type RepoIdentity = {
    /** Владелец */
    owner: string;
    /** Название */
    name: string;
    /** Ветка */
    branch?: string;
};

/**
 * Ошибка приложения
 */
export type AppError = {
    /** Код ошибки */
    code: number;
    /** Сообщение */
    message: string;
    /** Описание */
    description: string;
};

/**
 * Идентификационные данные ветки
 */
export type BranchIdentity = {
    /** Имя */
    name: string;
    /** Префикс ветки */
    prefix: string;
};

/**
 * Объект, описывающий файл или директорию
 */
export type GitFile = { type: string; name: string };

/**
 * Основная информация о коммите
 */
export type GitCommit = {
    message: string;
    login?: string;
    avatarUrl?: string;
    name?: string | null;
    date: string;
};

/**
 * Вынужденная обертка для некоторых компонентов по данным с API
 * !!! FIXME: more strict types (TotallyNullable not help...) or fix on codegen level
 */
export type VeryMaybe<T> = import("./models.gen").Maybe<Partial<T>>;
