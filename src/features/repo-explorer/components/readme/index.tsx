import React from "react";
import Markdown from "react-markdown";
import SkeletonArea from "../skeleton-area";
import CodeRenderer from "./code-renderer";
import "./index.scss";

type Props = {
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
 */
const useLocalUri = ({ repoUrl, branch }: Props) => {
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

/**
 * README репозитория
 * TODO: Плохо обрабатываются сочетания markdown и html - возможно позже надо завезти отдельный htmlParser
 */
const RepoReadme = (props: Props) => {
    const { text, loading } = props;
    const uriTransformers = useLocalUri(props);

    return (
        <div className="repo-readme mt-6">
            {loading && <SkeletonArea />}
            {text && (
                <>
                    {/* TODO: add link */}
                    <h2 className="repo-readme__title p-4 m-0">README.md</h2>
                    <Markdown
                        className="repo-readme__markdown p-8 pt-4"
                        allowDangerousHtml
                        renderers={{ code: CodeRenderer }}
                        {...uriTransformers}
                    >
                        {text}
                    </Markdown>
                </>
            )}
        </div>
    );
};

export default RepoReadme;
