import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
    language: string;
    value: string;
};

const CodeRenderer = ({ language, value }: Props) => {
    return (
        <SyntaxHighlighter style={theme} language={language}>
            {value}
        </SyntaxHighlighter>
    );
};

export default CodeRenderer;
