import { twJoin } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Tab, Tabs } from "shared/ui/tabs";

import { QuestName } from "../types";

type Props = {
  activeQuestSection: QuestName;
  onChange: (questSection: QuestName) => void;
} & ClassName;

export const QuestsTabs = (props: Props) => {
  const { activeQuestSection, onChange, className } = props;

  return (
    <Tabs className={twJoin("gap-x-4", className)}>
      <Tab
        isActive={activeQuestSection === "onboarding"}
        onClick={() => {
          onChange("onboarding");
        }}
      >
        Onboarding
      </Tab>
      <Tab
        isActive={activeQuestSection === "sentinels"}
        onClick={() => {
          onChange("sentinels");
        }}
      >
        Sentinels
      </Tab>
      <Tab
        isActive={activeQuestSection === "cypher-state"}
        onClick={() => {
          onChange("cypher-state");
        }}
      >
        CypherState
      </Tab>
      <Tab
        isActive={activeQuestSection === "lp-dimension"}
        onClick={() => {
          onChange("lp-dimension");
        }}
      >
        LP Dimension
      </Tab>
      <Tab
        isActive={activeQuestSection === "data-dimension"}
        onClick={() => {
          onChange("data-dimension");
        }}
      >
        Data Dimension
      </Tab>
      <Tab
        isActive={activeQuestSection === "referrer"}
        onClick={() => {
          onChange("referrer");
        }}
      >
        Referrer
      </Tab>
      <Tab
        isActive={activeQuestSection === "partner"}
        onClick={() => {
          onChange("partner");
        }}
      >
        Partner
      </Tab>
    </Tabs>
  );
};
