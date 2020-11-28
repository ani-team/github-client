/** @generated THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import * as Types from '../../models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type RepoStatQueryVariables = Types.Exact<{
  owner: Types.Scalars['String'];
  name: Types.Scalars['String'];
}>;


export type RepoStatQuery = { readonly repository?: Types.Maybe<{ readonly forks: { readonly totalCount: number }, readonly stargazers: { readonly totalCount: number }, readonly watchers: { readonly totalCount: number } }> };


export const RepoStatDocument = gql`
    query RepoStat($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    forks {
      totalCount
    }
    stargazers {
      totalCount
    }
    watchers {
      totalCount
    }
  }
}
    `;

/**
 * __useRepoStatQuery__
 *
 * To run a query within a React component, call `useRepoStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepoStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepoStatQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRepoStatQuery(baseOptions?: Apollo.QueryHookOptions<RepoStatQuery, RepoStatQueryVariables>) {
        return Apollo.useQuery<RepoStatQuery, RepoStatQueryVariables>(RepoStatDocument, baseOptions);
      }
export function useRepoStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepoStatQuery, RepoStatQueryVariables>) {
          return Apollo.useLazyQuery<RepoStatQuery, RepoStatQueryVariables>(RepoStatDocument, baseOptions);
        }
export type RepoStatQueryHookResult = ReturnType<typeof useRepoStatQuery>;
export type RepoStatLazyQueryHookResult = ReturnType<typeof useRepoStatLazyQuery>;
export type RepoStatQueryResult = Apollo.QueryResult<RepoStatQuery, RepoStatQueryVariables>;