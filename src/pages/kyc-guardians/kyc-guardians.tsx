import { useState } from "react";

import { twJoin } from "tailwind-merge";

import { GuardianInfo } from "entities/guardian/ui/info";
import { GenerateCommitmentHashModal } from "features/generate-commitment-hash";
import { Button } from "shared/ui/button";

const guardians = [
  {
    provider: {
      title: "SwissBorg",
      description: "swissborg.com",
      img: "/assets/swissborg-logo.png",
    },
    score: "9.9",
    totalDocsCount: "32,956",
    docsPerMonth: "4,059",
    avgIssueTime: {
      title: "Very fast",
      description: "~35 min",
    },
  },
];

const cls = "grid-cols-[34px,repeat(6,minmax(0,1fr))]";

export const KycGuardians = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col p-8">
        <h1 className="text-3xl font-semibold">KYC Guardians</h1>
        <div className="mt-8">Tabs</div>
        <div
          className={twJoin(
            cls,
            "mt-6 grid items-center border-b border-b-iron px-1 py-3 text-xs font-medium text-riverBed"
          )}
        >
          <div className="py-4 pl-6">#</div>
          <div className="px-6 py-4">KYC Provider</div>
          <div>Score</div>
          <div>Total documents issued</div>
          <div>Documents/month</div>
          <div>Avg. issue time</div>
          <div />
        </div>

        {guardians.map((guardian) => {
          return (
            <div
              className={twJoin(
                cls,
                "grid items-center border-b border-b-iron px-1 py-4 text-sm font-medium"
              )}
              key={guardian.provider.title}
            >
              <div>1</div>
              <div>
                <GuardianInfo {...guardian.provider} />
              </div>
              <div>
                <span className="flex w-16 justify-center rounded-full bg-basketBallOrange py-1 text-white">
                  {guardian.score}
                </span>
              </div>
              <div>{guardian.totalDocsCount}</div>
              <div>{guardian.docsPerMonth}</div>
              <div>
                {guardian.avgIssueTime.title} <br />
                <span>{guardian.avgIssueTime.description}</span>
              </div>
              <Button className="h-10" onClick={handleClick}>
                Start KYC
              </Button>
            </div>
          );
        })}
      </div>
      <GenerateCommitmentHashModal onClose={handleClick} />
    </>
  );
};
