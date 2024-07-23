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
  const allQuests = section.questTree.quests;
  const completedQuests = section.questTree.quests.filter(
    (q) => q.status === "COMPLETED"
  );

  const percent = Math.floor((completedQuests.length / allQuests.length) * 100);

  const receivedPoints = completedQuests.reduce((acc, q) => {
    acc = acc + q.points;
    return acc;
  }, 0);

  const points = allQuests.reduce((acc, quest) => {
    acc = acc + quest.points;
    return acc;
  }, 0);

  return (
    <div className={twMerge("flex w-full flex-col", className)}>
      <div className="flex justify-between text-sm text-riverBed">
        <div className="flex">
          {section.title}:
          <span className="ml-1 flex items-center text-basketBallOrange">
            {receivedPoints} / {points}{" "}
            <Icon className="size-3" name="lightning" />
          </span>
        </div>
        <div className="flex">
          Left before the {section.title} is completed
          <span className="ml-1.5 flex items-center font-semibold text-basketBallOrange">
            <Icon className="mr-1 size-3.5" name="verifiedCheck" />
            {pluralize(allQuests.length - completedQuests.length, "task")}
          </span>
        </div>
      </div>
      <div className="mt-2.5 h-1.5 rounded-full bg-white">
        <div
          className="h-full rounded-full bg-basketBallOrange shadow-xs shadow-basketBallOrange"
          style={{
            width: `${Number.isNaN(percent) ? 0 : percent}%`,
          }}
        />
      </div>
    </div>
  );
};
