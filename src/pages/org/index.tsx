import React from "react";
import { Col, Row } from "antd";
import { RouteComponentProps } from "react-router";
import { OrgPinned, orgPinnedModel } from "widgets/org-pinned";
import { OrgPopular, orgPopularModel } from "widgets/org-popular";
import { OrgRepoList } from "widgets/org-repo-list";
import { OrgDetails } from "widgets/org-details";
// import { SkeletonArea } from "shared/ui";
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
    const isPinnedVisible = orgPinnedModel.useVisibility(orgname);
    const isPopularVisible = orgPopularModel.useVisibility(orgname);

    const showPlace = isPinnedVisible ? "pinned" : isPopularVisible ? "popular" : "";

    return (
        <div className="page page-org">
            <Row className="mt-2" gutter={ROW_GUTTER}>
                <Col span={COL_MAIN}>
                    {showPlace === "popular" && <OrgPopular orgname={orgname} />}
                    {showPlace === "pinned" && <OrgPinned orgname={orgname} className="mt-6" />}
                    <OrgRepoList orgname={orgname} className="mt-6" />
                </Col>
                <Col span={COL_SIDEBAR}>
                    <OrgDetails orgname={orgname} />
                </Col>
            </Row>
            {/* <Row className="page-org__main mt-2" gutter={ROW_GUTTER}>
                <Col span={COL_MAIN}></Col>
                <Col span={COL_SIDEBAR}>
                    <SkeletonArea />
                </Col>
            </Row> */}
        </div>
    );
};

export default OrganizationPage;
