import React from "react";
import { RepoCard } from "entities/repo";
import { Card } from "shared/ui";
import { useOrgPinnedQuery } from "./api";
import "./styles.scss";

type Props = {
    orgname: string;
};
export const OrgPinned = ({ orgname }: Props) => {
    const { data, loading } = useOrgPinnedQuery({ variables: { login: orgname } });
    const pinnedItems = data?.organization?.pinnedItems.nodes;

    if (!loading && !pinnedItems?.length) {
        return null;
    }

    return (
        <div className="org-pinned">
            <h2>Pinned</h2>
            <OrgPinnedContent orgname={orgname} />
        </div>
    );
};

const OrgPinnedContent = ({ orgname }: Props) => {
    const { data, loading } = useOrgPinnedQuery({ variables: { login: orgname } });
    const pinnedItems = data?.organization?.pinnedItems.nodes;

    if (loading) {
        return <Card.SkeletonGroup amount={3} />;
    }
    return (
        <div className="org-pinned-content flex justify-between">
            {pinnedItems?.map((repo) => (
                // @ts-ignore
                <RepoCard key={repo?.id} data={repo} loading={loading} />
            ))}
        </div>
    );
};
