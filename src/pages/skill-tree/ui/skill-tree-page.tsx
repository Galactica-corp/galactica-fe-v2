import { useState } from "react";

import { PageLayout } from "pages/ui/page-layout";

import { type QuestSection } from "../types";
import { QuestsTree } from "./quests-tree";
import { QuestsTabs } from "./tabs";

export const SkillTreePage = () => {
  const [activeQuestSection, setActiveQuestSection] =
    useState<QuestSection>("onboarding");

  return (
    <PageLayout title="Skill Wheel tasks">
      <QuestsTabs
        activeQuestSection={activeQuestSection}
        className="mt-6"
        onChange={setActiveQuestSection}
      />

      <div className="mt-8 flex grow">
        <div className="basis-4/6 border border-black/10">
          <QuestsTree />
        </div>
      </div>
    </PageLayout>
  );
};
