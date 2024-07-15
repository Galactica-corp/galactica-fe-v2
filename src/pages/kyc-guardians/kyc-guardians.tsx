import { useState } from "react";

import { twJoin } from "tailwind-merge";

import { GuardianInfo } from "entities/guardian/ui/info";
import { GenerateCommitmentHashModal } from "features/generate-commitment-hash";
import { PageLayout } from "pages/ui";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

const guardians = [
  {
    provider: {
      title: "KYC Sample",
      description: "galactica.com",
      img: (
        <div className="rounded-full bg-white p-1 inner-border-santaGrey">
          <Icon className="size-8" name="galactica" />
        </div>
      ),
    },
    score: "TBD",
    totalDocsCount: "TBD",
    docsPerMonth: "TBD",
    avgIssueTime: {
      title: "TBD",
      description: "",
    },
    link: "https://kyc-andromeda.galactica.com",
  },
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
    score: "TBD",
    totalDocsCount: "TBD",
    docsPerMonth: "TBD",
    avgIssueTime: {
      title: "TBD",
      description: "",
    },
    link: "https://stage-swissborg.galactica.com",
  },
];

type KYCGuardian = (typeof guardians)[number];

const cls = "grid-cols-[34px,repeat(6,minmax(160px,1fr))]";

export const KYCGuardians = () => {
  const [guardian, setGuardian] = useState<KYCGuardian | undefined>();

  return (
    <PageLayout title="KYC Guardians">
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

      {guardians.map((guardian, index) => {
        return (
          <div
            className={twJoin(
              cls,
              "grid items-center border-b border-b-iron px-1 py-4 text-sm font-medium"
            )}
            key={guardian.provider.title}
          >
            <div className="pl-6">{index + 1}</div>
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
      {guardian && (
        <GenerateCommitmentHashModal
          onClose={() => setGuardian(undefined)}
          redirectLink={guardian.link}
        />
      )}
    </PageLayout>
  );
};
