import { useCredentialsQuery, useStarRepoMutation, useUnstarRepoMutation } from "./queries.gen";

const useStarred = (refetch: any) => {
    const [starRepo] = useStarRepoMutation();
    const [unstarRepo] = useUnstarRepoMutation();

    // FIXME: Потом надо бы брать из LocalStorage,а не запросом
    const { viewer } = useCredentialsQuery().data || {};

    const handleStarring = (id?: string | null, viewerHasStarred?: boolean) => {
        if (!id) {
            console.error("[useStarred] repo id not provied");
            return;
        }

        const starAction = viewerHasStarred ? unstarRepo : starRepo;
        starAction({
            variables: { id, clientMutationId: viewer?.id },
        });
        refetch();
    };

    return {
        handleStarring,
    };
};

export default useStarred;
