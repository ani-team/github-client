/** @generated THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import * as Types from '../../shared/api/models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type RepoDetailsQueryVariables = Types.Exact<{
  owner: Types.Scalars['String'];
  name: Types.Scalars['String'];
}>;


export type RepoDetailsQuery = { readonly repository?: Types.Maybe<{ readonly id: string, readonly name: string, readonly description?: Types.Maybe<string>, readonly homepageUrl?: Types.Maybe<any>, readonly languages?: Types.Maybe<{ readonly totalCount: number, readonly nodes?: Types.Maybe<ReadonlyArray<Types.Maybe<{ readonly id: string, readonly name: string, readonly color?: Types.Maybe<string> }>>> }>, readonly collaborators?: Types.Maybe<{ readonly nodes?: Types.Maybe<ReadonlyArray<Types.Maybe<{ readonly id: string, readonly name?: Types.Maybe<string>, readonly login: string, readonly avatarUrl: any }>>> }> }> };


export const RepoDetailsDocument = gql`
    query RepoDetails($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    id
    name
    description
    languages(first: 6, orderBy: {field: SIZE, direction: DESC}) {
      nodes {
        id
        name
        color
      }
      totalCount
    }
    collaborators(first: 10) {
      nodes {
        id
        name
        login
        avatarUrl(size: 36)
      }
    }
    homepageUrl
  }
}
    `;

/**
 * __useRepoDetailsQuery__
 *
 * To run a query within a React component, call `useRepoDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepoDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepoDetailsQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRepoDetailsQuery(baseOptions?: Apollo.QueryHookOptions<RepoDetailsQuery, RepoDetailsQueryVariables>) {
        return Apollo.useQuery<RepoDetailsQuery, RepoDetailsQueryVariables>(RepoDetailsDocument, baseOptions);
      }
export function useRepoDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepoDetailsQuery, RepoDetailsQueryVariables>) {
          return Apollo.useLazyQuery<RepoDetailsQuery, RepoDetailsQueryVariables>(RepoDetailsDocument, baseOptions);
        }
export type RepoDetailsQueryHookResult = ReturnType<typeof useRepoDetailsQuery>;
export type RepoDetailsLazyQueryHookResult = ReturnType<typeof useRepoDetailsLazyQuery>;
export type RepoDetailsQueryResult = Apollo.QueryResult<RepoDetailsQuery, RepoDetailsQueryVariables>;