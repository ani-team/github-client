import React from "react";
import Markdown from "react-markdown";
import { Skeleton } from "antd";
import CodeRenderer from "./code-renderer";
import "./index.scss";

type Props = {
    text: string;
    loading: boolean;
};

const RepoReadme = ({ text, loading }: Props) => {
    return (
        <div className="repo-readme mt-6">
            {loading && <Skeleton.Input active />}
            {!loading && (
                <Markdown className="p-6" allowDangerousHtml renderers={{ code: CodeRenderer }}>
                    {text}
                </Markdown>
            )}
        </div>
    );
};

export default RepoReadme;
