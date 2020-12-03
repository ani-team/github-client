import { BranchIdentity, RepoIdentity } from "models";
import { RepoBranchInfoQuery, useRepoDefaultBranchQuery } from "../queries.gen";

type Props = {
    repo: RepoIdentity;
};

/**
 * @hook Получение текущей ветки репозитория
 */
export const useBranch = (repo: Props["repo"]) => {
    const { data } = useRepoDefaultBranchQuery({
        variables: {
            name: repo.name,
            owner: repo.owner,
        },
    });
    const branch = repo.branch || data?.repository?.defaultBranchRef?.name || "master";
    return { branch };
};

/**
 * @hook Получение нужных полей по сфетченным данным по репозиторию
 */
export const useRepoDetails = (repoInfo: RepoBranchInfoQuery | undefined) => {
    const { repository } = repoInfo || {};
    const branches = (repository?.refs?.nodes || []).filter(
        (branch): branch is BranchIdentity => !!branch,
    );
    const files = Array.from(repository?.object?.entries ?? []).sort((a, b) =>
        b.type.localeCompare(a.type),
    );
    const target = repository?.ref?.target;
    const lastCommit =
        (target && {
            message: target.messageHeadline,
            login: target.author?.user?.login,
            avatarUrl: target.author?.user?.avatarUrl,
            name: target.author?.name,
            date: target.author?.date,
        }) ||
        undefined;

    // Приходится фетчить файл по двум вариантам наименования, т.к. GitHub не умеет в insensitive case =(
    const readme = repository?.contentLower?.text || repository?.contentUpper?.text || "";
    return {
        branches,
        files,
        lastCommit,
        readme,
    };
};

type useLocalUriProps = {
    /** Текст README файла */
    text: string;
    /** Флаг загрузки */
    loading: boolean;
    /**
     * Ссылка-идентификатор репозитория
     * @remark Для обработки локальных ссылок
     */
    repoUrl: string;
    /**
     * Текущая ветка
     * @remark Для обработки локальных ссылок
     */
    branch: string;
};

/**
 * @hook Обработка внутренних ссылок
 * @remark
 * - В README могут быть указаны ссылки на локальные ресурсы репозитория (images, files, anchors, ...)
 * - Поэтому, для корректной навигации и отображения, было решено предобрабатывать подобные ссылки
 */
export const useLocalUri = ({ repoUrl, branch }: useLocalUriProps) => {
    /**
     * Нормализация внутренних ссылок
     * @example
     * transformLocalUri("https://some-url/...")
     * // => "https://some-url/..."
     * transformLocalUri("#some-header")
     * // => "https://github.com/${repo}#some-header"
     * transformLocalUri("./SOMEFILE.md")
     * // => "https://github.com/${repo}/blobk/${branch}/SOMEFILE.md"
     * transformLocalUri("docs/ANOTHER.md")
     * // => "https://github.com/${repo}/blobk/${branch}/docs/ANOTHER.md"
     */
    const transformLinkUri = (uri: string) => {
        if (uri.startsWith("http")) return uri;
        if (uri.startsWith("#")) return `https://github.com/${repoUrl}${uri}`;
        // Если sibling-link - нормализуем
        const blobUrl = uri.replace("./", "");
        return `https://github.com/${repoUrl}/blob/${branch}/${blobUrl}`;
    };

    /**
     * Получение исходника локального изображения
     * FIXME: Работает только с markodwn-изображениями, потом переделать бы на общий случай
     * @example
     * transformImageUri("docs/search.png")
     * // => https://raw.githubusercontent.com/${repo}/${branch}/docs/search.png
     */
    const transformImageUri = (uri: string) => {
        if (uri.startsWith("http")) return uri;
        // Если sibling-link - нормализуем
        const blobUrl = uri.replace("./", "");
        return `https://raw.githubusercontent.com/${repoUrl}/${branch}/${blobUrl}`;
    };

    return { transformLinkUri, transformImageUri };
};
