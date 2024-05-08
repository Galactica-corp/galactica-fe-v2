import { useState } from "react";

import { twJoin } from "tailwind-merge";

import { GuardianInfo } from "entities/guardian/ui/info";
import { GenerateCommitmentHashModal } from "features/generate-commitment-hash";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

const guardians = [
  {
    provider: {
      title: "SwissBorg",
      description: "swissborg.com",
      img: (
        <div className="rounded-full bg-white p-1 inner-border-santaGrey">
          <Icon className="size-8" name="swissborg" />
        </div>
      ),
    },
    score: "9.9",
    totalDocsCount: "32,956",
    docsPerMonth: "4,059",
    avgIssueTime: {
      title: "Very fast",
      description: "~35 min",
    },
    link: "https://kyc-reticulum.galactica.com",
  },
];

type KYCGuardian = (typeof guardians)[number];

const cls = "grid-cols-[34px,repeat(6,minmax(160px,1fr))]";

export const KYCGuardians = () => {
  const [guardian, setGuardian] = useState<KYCGuardian | undefined>();

  return (
    <>
      <div className="flex flex-col p-8">
        <h1 className="text-3xl font-semibold">KYC Guardians</h1>
        <div
          className={twJoin(
            cls,
            "mt-6 grid items-center border-b border-b-iron px-1 py-3 text-xs font-medium text-riverBed"
          )}
        >
          <div className="pl-6">#</div>
          <div className="px-6">KYC Provider</div>
          <div className="px-6">Score</div>
          <div className="px-6">Total documents issued</div>
          <div className="px-6">Documents/month</div>
          <div className="px-6">Avg. issue time</div>
          <div className="px-6" />
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
              <div className="pl-6">1</div>
              <div className="px-6">
                <GuardianInfo {...guardian.provider} />
              </div>
              <div className="px-6">
                <span className="flex w-16 justify-center rounded-full bg-basketBallOrange py-1 text-white">
                  {guardian.score}
                </span>
              </div>
              <div className="px-6">{guardian.totalDocsCount}</div>
              <div className="px-6">{guardian.docsPerMonth}</div>
              <div className="px-6">
                {guardian.avgIssueTime.title} <br />
                <span>{guardian.avgIssueTime.description}</span>
              </div>
              <div className="flex px-6">
                <Button
                  className="h-10 basis-full"
                  onClick={() => setGuardian(guardian)}
                >
                  Start KYC
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {guardian && (
        <GenerateCommitmentHashModal
          onClose={() => setGuardian(undefined)}
          redirectLink={guardian.link}
        />
      )}
    </>
  );
};
