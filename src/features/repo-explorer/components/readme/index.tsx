import React from "react";
import Markdown from "react-markdown";
import SkeletonArea from "../skeleton-area";
import CodeRenderer from "./code-renderer";
import "./index.scss";

type Props = {
    text: string;
    loading: boolean;
    /**
     * @remark Для обработки локальных ссылок
     */
    repoUrl: string;
    /**
     * @remark Для обработки локальных ссылок
     */
    branch: string;
};

const renderers = {
    code: CodeRenderer,
};

const RepoReadme = (props: Props) => {
    const { text, loading, repoUrl, branch } = props;
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
    const transformLocalUri = (uri: string) => {
        if (uri.startsWith("http")) return uri;
        if (uri.startsWith("#")) return `https://github.com/${repoUrl}${uri}`;
        // Если sibling-link - нормализуем
        const blobUrl = uri.replace("./", "");
        return `https://github.com/${repoUrl}/blob/${branch}/${blobUrl}`;
    };

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
                        renderers={renderers}
                        transformLinkUri={transformLocalUri}
                    >
                        {text}
                    </Markdown>
                </>
            )}
        </div>
    );
};

export default RepoReadme;
