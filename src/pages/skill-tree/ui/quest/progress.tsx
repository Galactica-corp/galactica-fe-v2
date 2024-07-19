import { twMerge } from "tailwind-merge";

import { Section } from "shared/graphql";
import { ClassName } from "shared/types";
import { Icon } from "shared/ui/icon";
import { pluralize } from "shared/utils";

type Props = {
  section: Section;
} & ClassName;

export const Progress = (props: Props) => {
  const { className, section } = props;
  const questsLength = section.questTree.quests.length;
  const completedQuests = section.questTree.quests.filter(
    (q) => q.status === "COMPLETED"
  ).length;

  const percent = Math.floor((completedQuests / questsLength) * 100);

  return (
    <div className={twMerge("flex w-full flex-col", className)}>
      <div className="flex justify-between text-sm text-riverBed">
        <div className="flex">
          {section.title} is
          <span className="ml-1 text-basketBallOrange">
            {Number.isNaN(percent) ? 0 : percent}% complete
          </span>
        </div>
        <div className="flex">
          Left before the {section.title} is completed
          <span className="ml-1.5 flex items-center font-semibold text-basketBallOrange">
            <Icon className="mr-1 size-3.5" name="verifiedCheck" />
            {pluralize(questsLength - completedQuests, "task")}
          </span>
        </div>
      </div>
      <div className="mt-2.5 h-1.5 rounded-full bg-white">
        <div
          className="h-full rounded-full bg-basketBallOrange shadow-basketBallOrange"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
};
