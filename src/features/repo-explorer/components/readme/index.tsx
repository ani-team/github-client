import React from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { useLocalUri } from "../hooks";
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
 * README репозитория
 * TODO: Плохо обрабатываются сочетания markdown и html - возможно позже надо завезти отдельный htmlParser
 * @see https://github.com/remarkjs/react-markdown
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
                        /**
                         * Github Flavored Markdown
                         * @see https://github.com/remarkjs/react-markdown#use
                         */
                        plugins={[gfm]}
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
