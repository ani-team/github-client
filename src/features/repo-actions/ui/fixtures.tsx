import React from "react";
import { ForkOutlined, EyeOutlined, StarOutlined } from "@ant-design/icons";

export type StatName = "watchers" | "stargazers" | "forks";

export const stats = [
    {
        name: "watchers",
        link: "watchers",
        icon: <EyeOutlined />,
    },
    {
        name: "stargazers",
        link: "stargazers",
        icon: <StarOutlined />,
    },
    {
        name: "forks",
        link: "network/members",
        icon: <ForkOutlined />,
    },
];
