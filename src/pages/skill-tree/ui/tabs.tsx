import { twJoin } from "tailwind-merge";

import { useSuspenseSectionsQuery } from "shared/graphql";
import { ClassName } from "shared/types";
import { Tab, Tabs } from "shared/ui/tabs";

type Props = {
  activeSectionId: string;
  onChange: (sectionId: string) => void;
} & ClassName;

export const QuestsTabs = (props: Props) => {
  const { activeSectionId, onChange, className } = props;
  const { data } = useSuspenseSectionsQuery(undefined, {
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Tabs className={twJoin("gap-x-4", className)}>
      {data.sections.map((section) => {
        const disabled = section.status === "LOCKED";

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
