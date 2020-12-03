import React from "react";
import { Skeleton } from "antd";
import SortSelect from "./sort-select";
import "./index.scss";

type Props = {
    loading: boolean;
    queryClean: string;
    count: number;
};

/**
 * Тулбар результатов поиска
 */
const ResultsToolbar = ({ loading, queryClean, count }: Props) => {
    return (
        <h2 className="search-results__toolbar flex">
            <span className="search-results__label flex-grow">
                {loading && (
                    <Skeleton
                        className="search-results__label-placeholder"
                        paragraph={false}
                        active
                    />
                )}
                {!loading && (
                    <>
                        {count} results by <b>{queryClean}</b>:
                    </>
                )}
            </span>
            <SortSelect className="search-results__sort-select ml-4" />
        </h2>
    );
};

export default ResultsToolbar;
