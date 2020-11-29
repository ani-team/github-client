import React from "react";
import { Auth } from "features";
import HomeHero from "features/home-hero";
import { AppError } from "models";

type Props = { error: AppError };

export default function ErrorPage({ error }: Props) {
    const { logout } = Auth.useAuth();

    const action =
        error.code === 401
            ? {
                  text: "Authorize",
                  to: logout,
              }
            : undefined;

    return (
        <HomeHero
            title={error.message}
            description={error.description}
            useSadHero
            action={action}
        />
    );
}
