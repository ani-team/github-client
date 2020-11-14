import React from "react";
import HomeHero from "features/home-hero";
import "./index.scss";

/**
 * @page Home
 */
const HomePage = () => {
    return (
        <div className="page page-home">
            <HomeHero />
        </div>
    );
};

export default HomePage;
