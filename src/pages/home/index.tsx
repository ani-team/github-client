import React from "react";
import { useHistory } from "react-router";
import HomeHero from "features/home-hero";

/**
 * @page Home
 */
const HomePage = () => {
    const history = useHistory();
    /* FIXME: specify link from Auth.feature */
    return (
        <HomeHero
            title="Github in minimalistic design. Built for developers."
            description="Welcome to our GithubClient!"
            action={{ text: "START NOW", to: () => history.push("/auth") }}
        />
    );
};

export default HomePage;
