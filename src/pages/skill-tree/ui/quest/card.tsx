import { MouseEventHandler } from "react";

import { useIsMutating } from "@tanstack/react-query";
import { twJoin, twMerge } from "tailwind-merge";

import { Section, useCompleteNonVerifiableQuestMutation } from "shared/graphql";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

import { useHandleOnboarding } from "../../hooks/use-handle-onboarding";
import { Quest } from "../../types";

type Props = {
  quest: Quest;
  section: Section;
};

export const Card = (props: Props) => {
  const { quest, section } = props;
  const { title, points, description, action, learnMore, id } = quest;
  const handleOnboarding = useHandleOnboarding();
  const isMutating = useIsMutating({
    mutationKey: useCompleteNonVerifiableQuestMutation.getKey(),
  });

  const handleClick: MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = async (event) => {
    const target = event.currentTarget;
    if (target.tagName === "BUTTON" && section.id === "onboarding")
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
            status === "completed" && "line-through"
          )}
        >
          {title}
        </h3>
        {points && (
          <div
            className={twMerge(
              "flex h-[30px] items-center whitespace-nowrap rounded bg-mercury px-2.5 py-1.5 text-sm text-basketBallOrange shadow-xs",
              status === "available" && "bg-basketBallOrange/10"
            )}
          >
            {status === "available" ? "Reward:" : "Received:"}
            <span className="ml-1 font-semibold">{points}</span>
            <Icon className="size-3" name="lightning" />
          </div>
        )}
      </header>

      <p className="mt-2.5 whitespace-pre-line leading-6 text-riverBed">
        {description}
      </p>

      <footer className="mt-4 flex flex-col">
        {action?.text && (
          <Button
            as={action.url ? "a" : "button"}
            href={action.url}
            isLoading={isMutating > 0}
            onClick={handleClick}
            referrerPolicy="no-referrer"
            target="_blank"
          >
            {action.text}
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
