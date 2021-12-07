import React from "react";
import cn from "classnames";
import { RepoCard } from "entities/repo";
import { Card } from "shared/ui";
import { useOrgPinnedQuery } from "./api";
import { useVisibility } from "./model";
import "./styles.scss";

type Props = {
    orgname: string;
    className?: string;
};
export const OrgPinned = ({ orgname, className }: Props) => {
    const isVisible = useVisibility(orgname);
    if (!isVisible) return null;

    return (
        <div className={cn("org-pinned", className)}>
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
        <div className="org-pinned-content flex">
            {pinnedItems?.map((repo) => (
                // @ts-ignore
                <RepoCard key={repo?.id} data={repo} loading={loading} />
            ))}
        </div>
    );
};
