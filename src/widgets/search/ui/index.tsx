import React from "react";
import Results from "./results";
import Filters from "./filters";

// FIXME: split later by features with common cluster?

/**
 * Поиск по репозиториям, пользователям
 * @remark Для использования подфич, обертка <Search/> не нужна
 */
export const Search = ({ children }: PropsWithChildren) => <div className="search">{children}</div>;

Search.Results = Results;
Search.Filters = Filters;
