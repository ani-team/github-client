import React from "react";
import DetailsCard from "../details-card";

// TODO: customize props
function RepoDetails(props: any) {
    return (
        <div className="flex flex-col">
            <DetailsCard title="Repo name">something</DetailsCard>
            <DetailsCard className="mt-4" title="Collaborators">
                nothing
            </DetailsCard>
        </div>
    );
}

export default RepoDetails;
