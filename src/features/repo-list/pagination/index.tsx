import React from "react";
import { SimplePagination } from "shared/components";
import { dom } from "shared/helpers";
import { RepositoriesDetailsFragment } from "../queries.gen";
import { useFilters, PAGE_SIZE } from "../hooks";

type Props = Partial<RepositoriesDetailsFragment> & {
    /** Обработчик пагинации */
    handlePaginationClick: ReturnType<typeof useFilters>["handlePaginationClick"];
};

/**
 * Пагинация списка репозиториев
 */
const RepoListPagination = (props: Props) => {
    const { pageInfo, totalCount = 0, handlePaginationClick } = props;

    return (
        <div className="repo-list__pagination my-6">
            {totalCount > PAGE_SIZE && pageInfo && (
                <SimplePagination
                    onPrev={() => {
                        handlePaginationClick({ before: pageInfo.startCursor });
                        dom.scrollToTop();
                    }}
                    onNext={() => {
                        handlePaginationClick({ after: pageInfo.endCursor });
                        dom.scrollToTop();
                    }}
                    hasNextPage={pageInfo.hasNextPage}
                    hasPrevPage={pageInfo.hasPreviousPage}
                    center
                />
            )}
        </div>
    );
};

export default RepoListPagination;
