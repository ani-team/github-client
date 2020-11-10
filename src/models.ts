export * from "./models.gen";

export type RepoIdentity = {
    owner: string;
    name: string;
    branch?: string;
};
