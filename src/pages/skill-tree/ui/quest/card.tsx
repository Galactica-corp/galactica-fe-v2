import { MouseEventHandler } from "react";

import { useIsMutating } from "@tanstack/react-query";
import { twJoin } from "tailwind-merge";

import { useCerts } from "entities/cert";
import { Points } from "entities/points";
import { useCompleteQuestMutation } from "shared/api";
import { Quest, Section } from "shared/graphql";
import { Button } from "shared/ui/button";

import { useHandleOnboarding } from "../../hooks/use-handle-onboarding";

type Props = {
  quest: Quest;
  section: Section;
};

export const Card = (props: Props) => {
  const { quest, section } = props;
  const { title, points, description, action, learnMore, id, status } = quest;
  const { hasUpdates } = useCerts();
  const handleOnboarding = useHandleOnboarding();
  const isMutating = useIsMutating({
    mutationKey: useCompleteQuestMutation.mutationKey,
  });

  const handleClick: MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = async (event) => {
    const target = event.currentTarget;
    if (target.tagName === "BUTTON" && section.id === "1-onboarding")
      handleOnboarding(quest);
  };

  return (
    <div className="flex flex-col">
      <img
        alt={title}
        className="flex w-full rounded-xl"
        src={`/quests/${id}/card.png`}
      />
      <header className="mt-6 flex items-end justify-between">
        <h3
          className={twJoin(
            "text-xl font-semibold",
            status === "COMPLETED" && "line-through"
          )}
        >
          {title}
        </h3>
        {points && (
          <Points
            className={twJoin(status !== "AVAILABLE" && "bg-mercury")}
            label={status === "AVAILABLE" ? "Reward:" : "Received:"}
            value={points}
          />
        )}
      </header>

      <p className="mt-2.5 whitespace-pre-line leading-6 text-riverBed">
        {description}
      </p>

      <footer className="mt-4 flex flex-col">
        {action?.text && (
          <Button
            as={action.url ? "a" : "button"}
            disabled={
              status === "COMPLETED" ||
              status === "LOCKED" ||
              (quest.id === "pass-kyc" && hasUpdates)
            }
            href={action.url}
            isLoading={isMutating > 0}
            onClick={handleClick}
            referrerPolicy="no-referrer"
            target="_blank"
          >
            {status === "COMPLETED" ? "Completed" : action.text}
          </Button>
        )}

        {learnMore?.url && learnMore.text && (
          <a
            className="mt-4 self-center text-basketBallOrange"
            href={learnMore.url}
            referrerPolicy="no-referrer"
            rel="noreferrer"
            target="_blank"
          >
            {learnMore.text}
          </a>
        )}
      </footer>
    </div>
  );
};
