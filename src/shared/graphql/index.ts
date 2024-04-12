import {
  useMutation,
  useQuery,
  useSuspenseQuery,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { graphqlRequestFetcher } from "./fetcher.ts";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type ConfirmationResponse = {
  __typename?: "ConfirmationResponse";
  success: Scalars["Boolean"]["output"];
};

export type InfoResponse = {
  __typename?: "InfoResponse";
  twitterIdToFollow: Scalars["String"]["output"];
  twitterIdToRetweet: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  bindWalletToTwitterAccount: ConfirmationResponse;
  cleansing: ConfirmationResponse;
  confirmFollow: ConfirmationResponse;
  confirmRetweet: ConfirmationResponse;
  forceMint: ConfirmationResponse;
};

export type MutationBindWalletToTwitterAccountArgs = {
  walletAddress: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  checkStatus: Status;
  info: InfoResponse;
  verificationProgress: VerificationProgressResponse;
};

export type State = "CONFIRMED" | "FAILED" | "PENDING";

export type Status =
  | "FOLLOW_CONFIRMED"
  | "FOLLOW_NOT_CONFIRMED"
  | "SBT_ISSUE_COMPLETE"
  | "SBT_ISSUE_FAILED"
  | "SBT_ISSUE_IN_PROGRESS"
  | "VERIFICATION"
  | "WALLET_NOT_BOUND";

export type VerificationProgressResponse = {
  __typename?: "VerificationProgressResponse";
  followState: State;
  retweetState: State;
  sbtState: State;
  transactionHash: Maybe<Scalars["String"]["output"]>;
};

export type BindWalletToTwitterAccountMutationVariables = Exact<{
  walletAddress: Scalars["String"]["input"];
}>;

export type BindWalletToTwitterAccountMutation = {
  __typename?: "Mutation";
  bindWalletToTwitterAccount: {
    __typename?: "ConfirmationResponse";
    success: boolean;
  };
};

export type CleansingMutationVariables = Exact<{ [key: string]: never }>;

export type CleansingMutation = {
  __typename?: "Mutation";
  cleansing: { __typename?: "ConfirmationResponse"; success: boolean };
};

export type ConfirmFollowMutationVariables = Exact<{ [key: string]: never }>;

export type ConfirmFollowMutation = {
  __typename?: "Mutation";
  confirmFollow: { __typename?: "ConfirmationResponse"; success: boolean };
};

export type ConfirmRetweetMutationVariables = Exact<{ [key: string]: never }>;

export type ConfirmRetweetMutation = {
  __typename?: "Mutation";
  confirmRetweet: { __typename?: "ConfirmationResponse"; success: boolean };
};

export type CheckStatusQueryVariables = Exact<{ [key: string]: never }>;

export type CheckStatusQuery = {
  __typename?: "Query";
  checkStatus: Status;
  verificationProgress: {
    __typename?: "VerificationProgressResponse";
    followState: State;
    retweetState: State;
    sbtState: State;
    transactionHash: string | null;
  };
};

export const BindWalletToTwitterAccountDocument = `
    mutation BindWalletToTwitterAccount($walletAddress: String!) {
  bindWalletToTwitterAccount(walletAddress: $walletAddress) {
    success
  }
}
    `;

export const useBindWalletToTwitterAccountMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    BindWalletToTwitterAccountMutation,
    TError,
    BindWalletToTwitterAccountMutationVariables,
    TContext
  >
) => {
  return useMutation<
    BindWalletToTwitterAccountMutation,
    TError,
    BindWalletToTwitterAccountMutationVariables,
    TContext
  >({
    mutationKey: ["BindWalletToTwitterAccount"],
    mutationFn: (variables?: BindWalletToTwitterAccountMutationVariables) =>
      graphqlRequestFetcher<
        BindWalletToTwitterAccountMutation,
        BindWalletToTwitterAccountMutationVariables
      >(BindWalletToTwitterAccountDocument, variables)(),
    ...options,
  });
};

export const CleansingDocument = `
    mutation Cleansing {
  cleansing {
    success
  }
}
    `;

export const useCleansingMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CleansingMutation,
    TError,
    CleansingMutationVariables,
    TContext
  >
) => {
  return useMutation<
    CleansingMutation,
    TError,
    CleansingMutationVariables,
    TContext
  >({
    mutationKey: ["Cleansing"],
    mutationFn: (variables?: CleansingMutationVariables) =>
      graphqlRequestFetcher<CleansingMutation, CleansingMutationVariables>(
        CleansingDocument,
        variables
      )(),
    ...options,
  });
};

export const ConfirmFollowDocument = `
    mutation ConfirmFollow {
  confirmFollow {
    success
  }
}
    `;

export const useConfirmFollowMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ConfirmFollowMutation,
    TError,
    ConfirmFollowMutationVariables,
    TContext
  >
) => {
  return useMutation<
    ConfirmFollowMutation,
    TError,
    ConfirmFollowMutationVariables,
    TContext
  >({
    mutationKey: ["ConfirmFollow"],
    mutationFn: (variables?: ConfirmFollowMutationVariables) =>
      graphqlRequestFetcher<
        ConfirmFollowMutation,
        ConfirmFollowMutationVariables
      >(ConfirmFollowDocument, variables)(),
    ...options,
  });
};

export const ConfirmRetweetDocument = `
    mutation ConfirmRetweet {
  confirmRetweet {
    success
  }
}
    `;

export const useConfirmRetweetMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ConfirmRetweetMutation,
    TError,
    ConfirmRetweetMutationVariables,
    TContext
  >
) => {
  return useMutation<
    ConfirmRetweetMutation,
    TError,
    ConfirmRetweetMutationVariables,
    TContext
  >({
    mutationKey: ["ConfirmRetweet"],
    mutationFn: (variables?: ConfirmRetweetMutationVariables) =>
      graphqlRequestFetcher<
        ConfirmRetweetMutation,
        ConfirmRetweetMutationVariables
      >(ConfirmRetweetDocument, variables)(),
    ...options,
  });
};

export const CheckStatusDocument = `
    query CheckStatus {
  checkStatus
  verificationProgress {
    followState
    retweetState
    sbtState
    transactionHash
  }
}
    `;

export const useCheckStatusQuery = <TData = CheckStatusQuery, TError = unknown>(
  variables?: CheckStatusQueryVariables,
  options?: Omit<
    UseQueryOptions<CheckStatusQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<CheckStatusQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<CheckStatusQuery, TError, TData>({
    queryKey:
      variables === undefined ? ["CheckStatus"] : ["CheckStatus", variables],
    queryFn: graphqlRequestFetcher<CheckStatusQuery, CheckStatusQueryVariables>(
      CheckStatusDocument,
      variables
    ),
    ...options,
  });
};

useCheckStatusQuery.getKey = (variables?: CheckStatusQueryVariables) =>
  variables === undefined ? ["CheckStatus"] : ["CheckStatus", variables];

export const useSuspenseCheckStatusQuery = <
  TData = CheckStatusQuery,
  TError = unknown,
>(
  variables?: CheckStatusQueryVariables,
  options?: Omit<
    UseSuspenseQueryOptions<CheckStatusQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseSuspenseQueryOptions<
      CheckStatusQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useSuspenseQuery<CheckStatusQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["CheckStatusSuspense"]
        : ["CheckStatusSuspense", variables],
    queryFn: graphqlRequestFetcher<CheckStatusQuery, CheckStatusQueryVariables>(
      CheckStatusDocument,
      variables
    ),
    ...options,
  });
};

useSuspenseCheckStatusQuery.getKey = (variables?: CheckStatusQueryVariables) =>
  variables === undefined
    ? ["CheckStatusSuspense"]
    : ["CheckStatusSuspense", variables];
