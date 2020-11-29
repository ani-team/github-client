import { useCredentialsQuery, useStarRepoMutation, useUnstarRepoMutation } from "./queries.gen";

const useStarred = (
    id: string | undefined | null,
    viewerHasStarred: boolean | undefined,
    refetch: any,
) => {
    const [starRepo] = useStarRepoMutation();
    const [unstarRepo] = useUnstarRepoMutation();

    // FIXME: Потом надо бы брать из LocalStorage,а не запросом
    const { viewer } = useCredentialsQuery().data || {};

    const addStar = () => {
        if (!id) {
            console.log("add star error");
            return;
        }

        starRepo({
            variables: { id: id, clientMutationId: viewer?.id },
        });
        refetch();
    };

    const removeStar = () => {
        if (!id) {
            console.log("remove star error");
            return;
        }

        unstarRepo({
            variables: { id: id, clientMutationId: viewer?.id },
        });
        refetch();
    };

    const handler = viewerHasStarred ? removeStar : addStar;
    return handler;
};

export default useStarred;
