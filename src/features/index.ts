// Импортим отдельно, т.к. фича экспортит из себя много подмодулей
import * as Auth from "./auth";

// FIXME: Нормализовать экспорты к единому виду

export * from "./repo-explorer";
export { default as RepoDetails } from "./repo-details";
export { default as UserInfo } from "./user-info";
export { default as RepoList } from "./repo-list";
export { default as RepoStat } from "./repo-stat";
export { default as Search } from "./search";
export { default as Origin } from "./origin";
export { default as HeroSheet } from "./hero-sheet";
export { Auth };
