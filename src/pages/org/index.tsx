import React from "react";
import { Col, Row } from "antd";
import { RouteComponentProps } from "react-router";
import { RepoDetails } from "widgets/repo-details";
import { RepoExplorer } from "widgets/repo-explorer";
import { RepoActions } from "features/repo-actions";
import { RepoBreadcrumbs } from "entities/repo";
import { SkeletonArea } from "shared/ui";
import { dom } from "shared/lib/browser";
import "./index.scss";

type Props = RouteComponentProps<{
    /** @routeParam Логин организации */
    orgname: string;
}>;

/** Стили */
const COL_MAIN = 17;
const COL_SIDEBAR = 6;
const ROW_GUTTER = [24, 16] as [number, number];

const OrganizationPage = (props: Props) => {
    const { orgname } = props.match.params;
    dom.useTitle(`Organization · ${orgname}`);

    return (
        <div className="page page-org">
            <Row className="mt-2" gutter={ROW_GUTTER}>
                <Col span={COL_MAIN}>
                    <SkeletonArea />
                </Col>
                <Col span={COL_SIDEBAR}>
                    <SkeletonArea />
                </Col>
            </Row>
            <Row className="page-org__main mt-2" gutter={ROW_GUTTER}>
                <Col span={COL_MAIN}>
                    <SkeletonArea />
                </Col>
                <Col span={COL_SIDEBAR}>
                    <SkeletonArea />
                </Col>
            </Row>
        </div>
    );
};

export default OrganizationPage;
