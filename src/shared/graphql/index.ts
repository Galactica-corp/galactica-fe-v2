import { GraphQLClient, RequestOptions } from "graphql-request";
import { GraphQLError, print } from "graphql";
import gql from "graphql-tag";
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
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
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

export type QuestCompletionSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type QuestCompletionSubscription = {
  __typename?: "Subscription";
  questCompletion: {
    __typename?: "EventQuestCompleted";
    section: {
      __typename?: "Section";
      id: string;
      title: string;
      status: Status;
      points: number;
    };
    quest: {
      __typename?: "Quest";
      id: string;
      icon: string;
      image: string;
      title: string;
      description: string;
      points: number;
      status: Status;
    };
  };
};

export const CompleteNonVerifiableQuestDocument = gql`
  mutation CompleteNonVerifiableQuest(
    $params: CompleteNonVerifiableQuestParams!
  ) {
    completeNonVerifiableQuest(params: $params)
  }
`;
export const SectionsDocument = gql`
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
export const QuestCompletionDocument = gql`
  subscription QuestCompletion {
    questCompletion {
      section {
        id
        title
        status
        points
      }
      quest {
        id
        icon
        image
        title
        description
        points
        status
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables
) => action();
const CompleteNonVerifiableQuestDocumentString = print(
  CompleteNonVerifiableQuestDocument
);
const SectionsDocumentString = print(SectionsDocument);
const QuestCompletionDocumentString = print(QuestCompletionDocument);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    CompleteNonVerifiableQuest(
      variables: CompleteNonVerifiableQuestMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: CompleteNonVerifiableQuestMutation;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CompleteNonVerifiableQuestMutation>(
            CompleteNonVerifiableQuestDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "CompleteNonVerifiableQuest",
        "mutation",
        variables
      );
    },
    Sections(
      variables?: SectionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: SectionsQuery;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<SectionsQuery>(SectionsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Sections",
        "query",
        variables
      );
    },
    QuestCompletion(
      variables?: QuestCompletionSubscriptionVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: QuestCompletionSubscription;
      errors?: GraphQLError[];
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<QuestCompletionSubscription>(
            QuestCompletionDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "QuestCompletion",
        "subscription",
        variables
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
