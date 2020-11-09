import React from "react";
import "./index.scss";

type Props = {
    name: string;
};

const Tab = (props: Props) => {
    return (
        <>
            <button className="tab">{props.name}</button>
        </>
    );
};

export default Tab;
