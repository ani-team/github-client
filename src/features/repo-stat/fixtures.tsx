import React from "react";
import { ForkOutlined, EyeOutlined, StarOutlined } from "@ant-design/icons";

const THOUSAND = 1000;
const MILLION = 1000000;

/**
 * @example
 * prettyValue(931) // 931
 * prettyValue(103256) // 103.2K
 * prettyValue(1023256) // 1.0M
 */
export const prettyValue = (amount: number | undefined) => {
    if (!amount) return "";
    if (amount < THOUSAND) return `${amount}`;
    if (amount < MILLION) return `${(amount / THOUSAND).toFixed(1)}K`;
    return `${(amount / MILLION).toFixed(1)}K`;
};

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
