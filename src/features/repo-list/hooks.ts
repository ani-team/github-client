import {
    useCredentialsQuery,
    useStarRepoMutation,
    useUnstarRepoMutation,
    ReposDocument,
} from "./queries.gen";

const useStarred = (variables: any) => {
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
            refetchQueries: [{ query: ReposDocument, variables }],
        });
    };

    return {
        handleStarring,
    };
};

export default useStarred;
