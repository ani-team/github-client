import React from "react";
import HomeHero from "features/home-hero";
import { useTitle } from "../helpers";
import "./index.scss";

/**
 * @page Home
 */
const HomePage = () => {
    useTitle("Github Client - Welcome!");

    return (
        <div className="page page-home">
            <HomeHero />
        </div>
    );
};

export default HomePage;
