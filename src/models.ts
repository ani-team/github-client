export * from "./models.gen";

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
