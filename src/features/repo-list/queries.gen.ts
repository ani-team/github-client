/** @generated THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import * as Types from '../../models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type ReposQueryVariables = Types.Exact<{
  login: Types.Scalars['String'];
  ownerAffiliations?: Types.Maybe<ReadonlyArray<Types.Maybe<Types.RepositoryAffiliation>>>;
}>;


export type ReposQuery = { readonly user?: Types.Maybe<{ readonly id: string, readonly repositories: { readonly nodes?: Types.Maybe<ReadonlyArray<Types.Maybe<{ readonly id: string, readonly name: string, readonly updatedAt: any, readonly viewerHasStarred: boolean, readonly url: any, readonly primaryLanguage?: Types.Maybe<{ readonly color?: Types.Maybe<string>, readonly name: string }> }>>> } }> };


export const ReposDocument = gql`
    query Repos($login: String!, $ownerAffiliations: [RepositoryAffiliation]) {
  user(login: $login) {
    id
    repositories(ownerAffiliations: $ownerAffiliations, first: 50, orderBy: {field: PUSHED_AT, direction: DESC}) {
      nodes {
        id
        name
        primaryLanguage {
          color
          name
        }
        updatedAt
        viewerHasStarred
        url
      }
    }
  }
}
    `;

/**
 * __useReposQuery__
 *
 * To run a query within a React component, call `useReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReposQuery({
 *   variables: {
 *      login: // value for 'login'
 *      ownerAffiliations: // value for 'ownerAffiliations'
 *   },
 * });
 */
export function useReposQuery(baseOptions?: Apollo.QueryHookOptions<ReposQuery, ReposQueryVariables>) {
        return Apollo.useQuery<ReposQuery, ReposQueryVariables>(ReposDocument, baseOptions);
      }
export function useReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReposQuery, ReposQueryVariables>) {
          return Apollo.useLazyQuery<ReposQuery, ReposQueryVariables>(ReposDocument, baseOptions);
        }
export type ReposQueryHookResult = ReturnType<typeof useReposQuery>;
export type ReposLazyQueryHookResult = ReturnType<typeof useReposLazyQuery>;
export type ReposQueryResult = Apollo.QueryResult<ReposQuery, ReposQueryVariables>;