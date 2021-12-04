import React from "react";
import { useHistory } from "react-router";
import { HeroSheet } from "shared/ui";
import { dom } from "shared/lib/browser";

/**
 * @page Home
 */
const HomePage = () => {
    dom.useTitle("Github Client - Welcome!");
    const history = useHistory();
    /* FIXME: specify link from Auth.feature */

    return (
        <HeroSheet
            title="Github in minimalistic design. Built for developers."
            description="Welcome to our GithubClient!"
            action={{ text: "START NOW", to: () => history.push("/auth") }}
        />
    );
};

export default HomePage;
