import { twJoin } from "tailwind-merge";

import { useSuspenseSectionsQuery } from "shared/api";
import { ClassName } from "shared/types";
import { Tab, Tabs } from "shared/ui/tabs";

type Props = {
  activeSectionId: string;
  onChange: (sectionId: string) => void;
} & ClassName;

export const QuestsTabs = (props: Props) => {
  const { activeSectionId, onChange, className } = props;
  const { data: sections } = useSuspenseSectionsQuery();

  return (
    <Tabs className={twJoin("gap-x-4", className)}>
      {sections.map((section) => {
        const disabled =
          section.status === "LOCKED" || section.id.includes("Coming soon");

        return (
          <Tab
            disabled={disabled}
            isActive={activeSectionId === section.id}
            key={section.id}
            onClick={() => {
              if (disabled) return;
              onChange(section.id);
            }}
          >
            {section.title}
          </Tab>
        );
      })}
    </Tabs>
  );
};
