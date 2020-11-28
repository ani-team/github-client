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
                <Markdown className="p-6" allowDangerousHtml renderers={{ code: CodeRenderer }}>
                    {text}
                </Markdown>
            )}
        </div>
    );
};

export default RepoReadme;
