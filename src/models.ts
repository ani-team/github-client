export * from "./models.gen";

export type RepoIdentity = {
    owner: string;
    name: string;
    branch?: string;
};

export type AppError = {
    code: number;
    message: string;
    description: string;
};
