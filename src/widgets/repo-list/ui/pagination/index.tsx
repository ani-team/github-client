import React from "react";
import { SimplePagination } from "shared/components";
import { RepositoriesDetailsFragment } from "../../queries.gen";
import { useFilters, PAGE_SIZE } from "../../model";

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
                    onPrev={() => handlePaginationClick({ before: pageInfo.startCursor })}
                    onNext={() => handlePaginationClick({ after: pageInfo.endCursor })}
                    hasNextPage={pageInfo.hasNextPage}
                    hasPrevPage={pageInfo.hasPreviousPage}
                    center
                />
            )}
        </div>
    );
};

export default RepoListPagination;
