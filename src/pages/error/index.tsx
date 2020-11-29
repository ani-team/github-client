import React from "react";
import { useAuthFlow } from "features/auth";
import HomeHero from "features/home-hero";
import { AppError } from "models";

type Props = { error: AppError };

export default function ErrorPage({ error }: Props) {
    const { authorize } = useAuthFlow();

    const action =
        error.code === 401
            ? {
                  text: "Authorize",
                  to: () => {
                      authorize();
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
