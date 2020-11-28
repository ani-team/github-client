import React from "react";
import Markdown from "react-markdown";
import CodeRenderer from "./code-renderer";
import "./index.scss";

type Props = {
    text: string;
};

const RepoReadme = ({ text }: Props) => {
    return (
        <div className="repo-readme p-6 mt-6">
            <Markdown allowDangerousHtml renderers={{ code: CodeRenderer }}>
                {text}
            </Markdown>
        </div>
    );
};

export default RepoReadme;
