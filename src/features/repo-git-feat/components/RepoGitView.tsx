import React from "react";
import { List } from "antd";
import { useRepositoryGitInfoQuery } from "../query.gen";
import "./index.scss";
import FileIcon from "../assets/file.svg";
import FolderIcon from "../assets/folder.svg";

RepoGitView.propTypes = {};

function RepoGitView() {
    const { data, loading } = useRepositoryGitInfoQuery({
        variables: { owner: "vuejs", name: "vue" },
    });
    console.log(data);
    const files = Array.from(data?.repository?.object?.entries ?? []).sort((a, b) =>
        b.type.localeCompare(a.type),
    );

    return (
        <div className="repo-git-view">
            <List
                bordered
                loading={loading}
                dataSource={files}
                renderItem={(item) => (
                    <List.Item className="repo-git-view--item">
                        <div>
                            <img alt="type" src={item.type === "tree" ? FolderIcon : FileIcon} />
                            <span>{item.name}</span>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default RepoGitView;
