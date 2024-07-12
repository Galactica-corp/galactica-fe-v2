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
  /** Points are rewards for completing each Quest. */
  Points: { input: number; output: number };
  QuestID: { input: string; output: string };
  SectionID: { input: string; output: string };
  Void: { input: void; output: void };
};

export type CompleteNonVerifiableQuestParams = {
  quest: Scalars["QuestID"]["input"];
  section: Scalars["SectionID"]["input"];
};

/** An event that is fired when a quest is completed. */
export type EventQuestCompleted = {
  __typename?: "EventQuestCompleted";
  quest: Quest;
  /** Rewards obtained by completing this quest. */
  rewards: Array<Reward>;
  section: Section;
  unlockedQuests: Array<Quest>;
  unlockedSections: Array<Section>;
};

/** Link represents a hyperlink with text. */
export type Link = {
  __typename?: "Link";
  /** User-facing text of the link. */
  text: Scalars["String"]["output"];
  /** A URL that the link refers to. */
  url: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** The only way to complete Quest that cannot be verified by other means is to call this mutation. */
  completeNonVerifiableQuest: Maybe<Scalars["Void"]["output"]>;
};

export type MutationCompleteNonVerifiableQuestArgs = {
  params: CompleteNonVerifiableQuestParams;
};

export type Query = {
  __typename?: "Query";
  /** Return section by ID. */
  section: Section;
  /** List of every quest section. */
  sections: Array<Section>;
};

export type QuerySectionArgs = {
  id: Scalars["SectionID"]["input"];
};

/** Quest is a task for a User to complete. */
export type Quest = {
  __typename?: "Quest";
  /** A Link to internal or external page or service. */
  action: Maybe<Link>;
  /** Detailed information about the Quest, including how to complete it. */
  description: Scalars["String"]["output"];
  icon: Scalars["String"]["output"];
  id: Scalars["QuestID"]["output"];
  /** A large, contextual image associated with each Quest. */
  image: Scalars["String"]["output"];
  /** External Link to information about the Quest. */
  learnMore: Maybe<Link>;
  /** Points for successful completion of the Quest. */
  points: Scalars["Points"]["output"];
  status: Status;
  /** User-facing name of the Quest. */
  title: Scalars["String"]["output"];
};

/** QuestTree defines hierarchical structure of Quests and their dependencies. */
export type QuestTree = {
  __typename?: "QuestTree";
  edges: Array<QuestTreeEdge>;
  quests: Array<Quest>;
};

/**
 * QuestTree represents one edge in the Quest Tree. This means that in order to unlock a Quest it is required to complete
 * another one.
 */
export type QuestTreeEdge = {
  __typename?: "QuestTreeEdge";
  /** Which Quest is required to complete. */
  requirement: Scalars["QuestID"]["output"];
  /** Which Quest would be unlocked after completion of the required Quest. */
  unlocks: Scalars["QuestID"]["output"];
};

/** Reward is an SBT that a user can obtain by reaching a specific amount of points within a Section. */
export type Reward = {
  __typename?: "Reward";
  description: Scalars["String"]["output"];
  icon: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  /** Amount of Points in Section required to obtain this reward. */
  points: Scalars["Points"]["output"];
  title: Scalars["String"]["output"];
  /** Token ID of the issued reward if it was issued. */
  tokenID: Maybe<Scalars["ID"]["output"]>;
};

/** Section is a way to organise Quests. It contains a Quest Tree. */
export type Section = {
  __typename?: "Section";
  id: Scalars["SectionID"]["output"];
  /** How many points is now earned in this section. */
  points: Scalars["Points"]["output"];
  questTree: QuestTree;
  rewards: Array<Reward>;
  status: Status;
  title: Scalars["String"]["output"];
};

/** Status of quest or section completion. */
export type Status =
  /** Unlocked, but not yet completed. */
  | "AVAILABLE"
  | "COMPLETED"
  /** Conditions for unlocking are not met yet. */
  | "LOCKED";

export type Subscription = {
  __typename?: "Subscription";
  /** Subscribe to notifications about completed quests. */
  questCompletion: EventQuestCompleted;
};

export type CompleteNonVerifiableQuestMutationVariables = Exact<{
  params: CompleteNonVerifiableQuestParams;
}>;

export type CompleteNonVerifiableQuestMutation = {
  __typename?: "Mutation";
  completeNonVerifiableQuest: void | null;
};

export type SectionsQueryVariables = Exact<{ [key: string]: never }>;

export type SectionsQuery = {
  __typename?: "Query";
  sections: Array<{
    __typename?: "Section";
    id: string;
    title: string;
    status: Status;
    points: number;
    questTree: {
      __typename?: "QuestTree";
      quests: Array<{
        __typename?: "Quest";
        id: string;
        icon: string;
        image: string;
        title: string;
        description: string;
        points: number;
        status: Status;
        action: { __typename?: "Link"; text: string; url: string } | null;
        learnMore: { __typename?: "Link"; text: string; url: string } | null;
      }>;
      edges: Array<{
        __typename?: "QuestTreeEdge";
        requirement: string;
        unlocks: string;
      }>;
    };
    rewards: Array<{
      __typename?: "Reward";
      id: string;
      title: string;
      description: string;
      icon: string;
      points: number;
      tokenID: string | null;
    }>;
  }>;
};

export const CompleteNonVerifiableQuestDocument = `
    mutation CompleteNonVerifiableQuest($params: CompleteNonVerifiableQuestParams!) {
  completeNonVerifiableQuest(params: $params)
}
    `;

export const useCompleteNonVerifiableQuestMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    CompleteNonVerifiableQuestMutation,
    TError,
    CompleteNonVerifiableQuestMutationVariables,
    TContext
  >
) => {
  return useMutation<
    CompleteNonVerifiableQuestMutation,
    TError,
    CompleteNonVerifiableQuestMutationVariables,
    TContext
  >({
    mutationKey: ["CompleteNonVerifiableQuest"],
    mutationFn: (variables?: CompleteNonVerifiableQuestMutationVariables) =>
      graphqlRequestFetcher<
        CompleteNonVerifiableQuestMutation,
        CompleteNonVerifiableQuestMutationVariables
      >(CompleteNonVerifiableQuestDocument, variables)(),
    ...options,
  });
};

export const SectionsDocument = `
    query Sections {
  sections {
    id
    title
    questTree {
      quests {
        id
        icon
        image
        title
        description
        action {
          text
          url
        }
        learnMore {
          text
          url
        }
        points
        status
      }
      edges {
        requirement
        unlocks
      }
    }
    rewards {
      id
      title
      description
      icon
      points
      tokenID
    }
    status
    points
  }
}
    `;

export const useSectionsQuery = <TData = SectionsQuery, TError = unknown>(
  variables?: SectionsQueryVariables,
  options?: Omit<UseQueryOptions<SectionsQuery, TError, TData>, "queryKey"> & {
    queryKey?: UseQueryOptions<SectionsQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<SectionsQuery, TError, TData>({
    queryKey: variables === undefined ? ["Sections"] : ["Sections", variables],
    queryFn: graphqlRequestFetcher<SectionsQuery, SectionsQueryVariables>(
      SectionsDocument,
      variables
    ),
    ...options,
  });
};

useSectionsQuery.getKey = (variables?: SectionsQueryVariables) =>
  variables === undefined ? ["Sections"] : ["Sections", variables];

export const useSuspenseSectionsQuery = <
  TData = SectionsQuery,
  TError = unknown,
>(
  variables?: SectionsQueryVariables,
  options?: Omit<
    UseSuspenseQueryOptions<SectionsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseSuspenseQueryOptions<
      SectionsQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useSuspenseQuery<SectionsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["SectionsSuspense"]
        : ["SectionsSuspense", variables],
    queryFn: graphqlRequestFetcher<SectionsQuery, SectionsQueryVariables>(
      SectionsDocument,
      variables
    ),
    ...options,
  });
};

useSuspenseSectionsQuery.getKey = (variables?: SectionsQueryVariables) =>
  variables === undefined
    ? ["SectionsSuspense"]
    : ["SectionsSuspense", variables];
