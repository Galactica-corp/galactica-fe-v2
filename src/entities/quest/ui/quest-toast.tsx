import { Link } from "react-router-dom";

import { useSessionStorage } from "@uidotdev/usehooks";

import { Points } from "entities/points";
import { Icon } from "shared/ui/icon";

type Props = {
  points: number;
  questId: string;
  questTitle: string;
  sectionId: string;
  sectionTitle: string;
};

export const QuestToast = ({
  sectionId,
  sectionTitle,
  questTitle,
  questId,
  points,
}: Props) => {
  const [_, setActiveSectionId] = useSessionStorage(
    "active-quest-sections",
    sectionId
  );
  return (
    <div className="relative flex gap-x-5">
      <div className="relative inline-flex size-20 shrink-0">
        <img
          alt="task"
          className="size-full"
          src={`quests/${questId}/node.png`}
        />
        <Icon
          className="absolute -right-1 -top-1 z-10 size-5 rounded-full bg-white p-0.5"
          name="verifiedCheck"
        />
      </div>
      <div className="flex flex-col">
        <div>
          You have successfully completed <br /> <b>{questTitle}</b> task!
        </div>
        <div className="mt-2 flex items-center gap-x-5">
          <Points label="Reward:" value={points} />
          <Link
            className="inline-flex text-sm font-semibold text-basketBallOrange"
            onClick={() => {
              setActiveSectionId(sectionId);
            }}
            to="/skill-tree"
          >
            Go to {sectionTitle} <span className="ml-2 flex">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
