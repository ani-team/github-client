import React from "react";
import Markdown from "react-markdown";
import SkeletonArea from "../skeleton-area";
import CodeRenderer from "./code-renderer";
import "./index.scss";

type Props = {
    text: string;
    loading: boolean;
};

const RepoReadme = ({ text, loading }: Props) => {
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
                    >
                        {text}
                    </Markdown>
                </>
            )}
        </div>
    );
};

export default RepoReadme;
