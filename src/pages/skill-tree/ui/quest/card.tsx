import { twJoin, twMerge } from "tailwind-merge";

import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

// import cardImagePng from "../../assets/card-image.png";
import { QuestStatus } from "../../types";

type Props = {
  buttonLink: string;
  buttonText: string;
  description: string;
  imageLink: string;
  link?: string;
  linkText?: string;
  points?: number | string;
  status: QuestStatus;
  title: string;
};

export const Card = (props: Props) => {
  const {
    title,
    description,
    points,
    imageLink,
    buttonLink,
    buttonText,
    link,
    linkText,
    status,
  } = props;
  return (
    <div className="flex flex-col">
      <img alt={title} className="flex w-full rounded-xl" src={imageLink} />
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
        <Button
          as="a"
          href={buttonLink}
          referrerPolicy="no-referrer"
          target="_blank"
        >
          {buttonText}
        </Button>
        {link && linkText && (
          <a
            className="mt-4 self-center text-basketBallOrange"
            href={link}
            referrerPolicy="no-referrer"
            rel="noreferrer"
            target="_blank"
          >
            {linkText}
          </a>
        )}
      </footer>
    </div>
  );
};
