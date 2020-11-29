import { notification } from "antd";
import * as Queries from "./queries.gen";

const useStarred = (variables?: Queries.ReposQueryVariables) => {
    // FIXME: simplify?
    const [addStar] = Queries.useAddStarMutation();
    const [removeStar] = Queries.useRemoveStarMutation();

    const handleStarring = (id?: string | null, viewerHasStarred?: boolean) => {
        if (!id) {
            notification.error({
                message: "Starring error",
                description: "Failed to star/unstar repo",
            });
            return;
        }

        const starAction = viewerHasStarred ? removeStar : addStar;
        starAction({
            variables: { starrableId: id },
            refetchQueries: [{ variables, query: Queries.ReposDocument }],
        });
    };

    return {
        handleStarring,
    };
};

export default useStarred;
