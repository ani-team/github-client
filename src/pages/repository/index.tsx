import React from "react";
import { Col, Row } from "antd";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { RepoDetails } from "widgets/repo-details";
import { RepoExplorer } from "widgets/repo-explorer";
import { RepoActions } from "features/repo-actions";
import { RepoIdentity } from "shared/api";
import { dom } from "shared/lib/browser";
import "./index.scss";

type Props = RouteComponentProps<{
    /** @routeParam Логин пользователя */
    username: string;
    /** @routeParam Имя репозитория */
    repository: string;
    /** @routeParam Текущая ветка */
    branch?: string;
}>;

/** Стили */
const COL_MAIN = 17;
const COL_SIDEBAR = 6;
const ROW_GUTTER = [24, 16] as [number, number];

/**
 * @page Страница репозитория
 */
const RepositoryPage = (props: Props) => {
    const { username, repository, branch } = props.match.params;
    const identity: RepoIdentity = {
        owner: username,
        name: repository,

        branch: branch ? branch.replace(/^tree\//, "") : undefined,
    };

    dom.useTitle(`Repository · ${username}/${repository}`);

    return (
        <div className="page page-repo">
            <Row className="mt-2" gutter={ROW_GUTTER}>
                <Col span={COL_MAIN}>
                    <h2 className="m-0">
                        <Link to={`/${identity.owner}`} className="owner">
                            {identity.owner}
                        </Link>
                        <span>{" / "}</span>
                        <Link to={`/${identity.owner}/${identity.name}`}>{identity.name}</Link>
                    </h2>
                </Col>
                <Col span={COL_SIDEBAR}>
                    <RepoActions repo={identity} />
                </Col>
            </Row>
            <Row className="page-repo__main mt-2" gutter={ROW_GUTTER}>
                <Col span={COL_MAIN}>
                    <RepoExplorer repo={identity} />
                </Col>
                <Col span={COL_SIDEBAR}>
                    <RepoDetails repo={identity} />
                </Col>
            </Row>
        </div>
    );
};

export default RepositoryPage;
