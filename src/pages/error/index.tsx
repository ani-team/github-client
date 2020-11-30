import React from "react";
// !!! FIXME: это плохо(
// eslint-disable-next-line import/order
import { ErrorDefinitions } from "app/error-handling";
import { Auth } from "features";
import HomeHero from "features/home-hero";
import { AppError } from "models";

type Props = { error: AppError };

export default function ErrorPage({ error }: Props) {
    const { logout } = Auth.useAuth();

    const action =
        error.code === ErrorDefinitions.UNAUTHORIZED.code
            ? {
                  text: "Authorize",
                  to: () => {
                      logout();
                      window.location.href = "/auth";
                  },
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
