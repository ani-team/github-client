import React from "react";
import { ErrorDefinitions } from "app/error-handling";
import { Auth, HeroSheet } from "features";
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
        <HeroSheet
            title={error.message}
            description={error.description}
            useSadHero
            action={action}
        />
    );
}
