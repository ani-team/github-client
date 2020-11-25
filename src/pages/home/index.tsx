import React from "react";
import { useHistory } from "react-router";
import HomeHero from "features/home-hero";

/**
 * @page Home
 */
const HomePage = () => {
    const history = useHistory();
    return (
        <div className="page page-background">
            {/* FIXME: specify link from Auth.feature */}
            <HomeHero
                title="Github in minimalistic design. Built for developers."
                description="Welcome to our GithubClient!"
                action={{ text: "START NOW", to: () => history.push("/auth") }}
            />
        </div>
    );
};

export default HomePage;
