/** @generated THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. */
import * as Types from '../../models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type RepositoriesDetailsFragment = { readonly totalCount: number, readonly pageInfo: { readonly endCursor?: Types.Maybe<string>, readonly startCursor?: Types.Maybe<string>, readonly hasNextPage: boolean, readonly hasPreviousPage: boolean }, readonly nodes?: Types.Maybe<ReadonlyArray<Types.Maybe<{ readonly id: string, readonly name: string, readonly updatedAt: any, readonly viewerHasStarred: boolean, readonly primaryLanguage?: Types.Maybe<{ readonly color?: Types.Maybe<string>, readonly name: string }>, readonly owner: { readonly login: string } | { readonly login: string } }>>> };

export type ReposQueryVariables = Types.Exact<{
  login: Types.Scalars['String'];
  ownerAffiliations?: Types.Maybe<ReadonlyArray<Types.Maybe<Types.RepositoryAffiliation>>>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type ReposQuery = { readonly user?: Types.Maybe<{ readonly id: string, readonly repositories: RepositoriesDetailsFragment }> };

export type AddStarMutationVariables = Types.Exact<{
  starrableId: Types.Scalars['ID'];
}>;


export type AddStarMutation = { readonly addStar?: Types.Maybe<{ readonly starrable?: Types.Maybe<{ readonly id: string } | { readonly id: string } | { readonly id: string }> }> };

export type RemoveStarMutationVariables = Types.Exact<{
  starrableId: Types.Scalars['ID'];
}>;


export type RemoveStarMutation = { readonly removeStar?: Types.Maybe<{ readonly starrable?: Types.Maybe<{ readonly id: string } | { readonly id: string } | { readonly id: string }> }> };

export const RepositoriesDetailsFragmentDoc = gql`
    fragment RepositoriesDetails on RepositoryConnection {
  pageInfo {
    endCursor
    startCursor
    hasNextPage
    hasPreviousPage
  }
  totalCount
  nodes {
    id
    name
    primaryLanguage {
      color
      name
    }
    owner {
      login
    }
    updatedAt
    viewerHasStarred
  }
}
    `;
export const ReposDocument = gql`
    query Repos($login: String!, $ownerAffiliations: [RepositoryAffiliation], $after: String, $before: String, $first: Int, $last: Int) {
  user(login: $login) {
    id
    repositories(ownerAffiliations: $ownerAffiliations, orderBy: {field: PUSHED_AT, direction: DESC}, after: $after, before: $before, first: $first, last: $last) {
      ...RepositoriesDetails
    }
  }
}
    ${RepositoriesDetailsFragmentDoc}`;

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
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
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
export const AddStarDocument = gql`
    mutation AddStar($starrableId: ID!) {
  addStar(input: {starrableId: $starrableId}) {
    starrable {
      id
    }
  }
}
    `;
export type AddStarMutationFn = Apollo.MutationFunction<AddStarMutation, AddStarMutationVariables>;

/**
 * __useAddStarMutation__
 *
 * To run a mutation, you first call `useAddStarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStarMutation, { data, loading, error }] = useAddStarMutation({
 *   variables: {
 *      starrableId: // value for 'starrableId'
 *   },
 * });
 */
export function useAddStarMutation(baseOptions?: Apollo.MutationHookOptions<AddStarMutation, AddStarMutationVariables>) {
        return Apollo.useMutation<AddStarMutation, AddStarMutationVariables>(AddStarDocument, baseOptions);
      }
export type AddStarMutationHookResult = ReturnType<typeof useAddStarMutation>;
export type AddStarMutationResult = Apollo.MutationResult<AddStarMutation>;
export type AddStarMutationOptions = Apollo.BaseMutationOptions<AddStarMutation, AddStarMutationVariables>;
export const RemoveStarDocument = gql`
    mutation RemoveStar($starrableId: ID!) {
  removeStar(input: {starrableId: $starrableId}) {
    starrable {
      id
    }
  }
}
    `;
export type RemoveStarMutationFn = Apollo.MutationFunction<RemoveStarMutation, RemoveStarMutationVariables>;

/**
 * __useRemoveStarMutation__
 *
 * To run a mutation, you first call `useRemoveStarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStarMutation, { data, loading, error }] = useRemoveStarMutation({
 *   variables: {
 *      starrableId: // value for 'starrableId'
 *   },
 * });
 */
export function useRemoveStarMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStarMutation, RemoveStarMutationVariables>) {
        return Apollo.useMutation<RemoveStarMutation, RemoveStarMutationVariables>(RemoveStarDocument, baseOptions);
      }
export type RemoveStarMutationHookResult = ReturnType<typeof useRemoveStarMutation>;
export type RemoveStarMutationResult = Apollo.MutationResult<RemoveStarMutation>;
export type RemoveStarMutationOptions = Apollo.BaseMutationOptions<RemoveStarMutation, RemoveStarMutationVariables>;