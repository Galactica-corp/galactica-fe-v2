import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Icon } from "shared/ui/icon";
import { pluralize } from "shared/utils";

type Props = ClassName;

export const Progress = (props: Props) => {
  const { className } = props;
  const questsLength = 20;
  const completedQuests = 10;

  const percent = (completedQuests / questsLength) * 100;

  return (
    <div className={twMerge("flex w-full flex-col", className)}>
      <div className="flex justify-between text-sm text-riverBed">
        <div className="flex">
          Onboarding is
          <span className="ml-1 text-basketBallOrange">
            {percent}% complete
          </span>
        </div>
        <div className="flex">
          Left before the Onboarding is completed
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
