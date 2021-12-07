import { useState, useCallback } from "react";
import { Repository } from "shared/api";
import { useRepoSearchQuery } from "./api";

export const useInput = () => {
    const [query, setQuery] = useState("");
    const handleChange = useCallback((event) => {
        setQuery(event.target.value);
    }, []);

    return { query, handleChange };
};

export const useQuery = (searchQuery: string) => {
    const variables = { query: searchQuery };
    const response = useRepoSearchQuery({ variables });
    const repositories = response.data?.search.nodes as Repository[];
    return { repositories, response, variables };
};
