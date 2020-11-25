import React from "react";
import { useHistory } from "react-router";
import HomeHero from "../../features/home-hero";
import { AppError } from "../../models";

type Props = { error: AppError };

export default function ErrorPage({ error }: Props) {
    const history = useHistory();

    return (
        <div className="page page-background">
            <HomeHero
                title={error.message}
                description={error.description}
                useSadHero
                action={{
                    text: "Back",
                    to: () => (history.length > 1 ? history.goBack() : history.push("/")),
                }}
            />
        </div>
    );
}
