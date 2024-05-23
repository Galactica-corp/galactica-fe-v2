import { twJoin } from "tailwind-merge";

import { GuardianInfo } from "entities/guardian/ui/info";
import { Button } from "shared/ui/button";
import { Icon, IconName } from "shared/ui/icon";

const guardians = [
  {
    provider: {
      title: "Occam Data Provider",
      description: "Occam.fi",
      img: (
        <div className="rounded-full bg-white p-1 inner-border-santaGrey">
          <Icon className="size-8" name="occamDataGuardian" />
        </div>
      ),
    },
    score: "9.0",
    total: "32,956",
    socialCerts: [
      "x",
      "linkedin",
      "google",
      "youtube",
      "reddit",
      "tg",
    ] as IconName[],
  },
];

const cls = "grid-cols-[34px,repeat(5,minmax(160px,1fr))]";

export const DataGuardians = () => {
  return (
    <div className="flex flex-col p-8">
      <h1 className="text-3xl font-semibold">Data Guardians</h1>
      <div
        className={twJoin(
          cls,
          "mt-6 grid items-center border-b border-b-iron px-1 py-3 text-xs font-medium text-riverBed"
        )}
      >
        <div className="pl-6">#</div>
        <div className="px-6">Data Provider</div>
        <div className="px-6">Score</div>
        <div className="px-6">Total issued</div>
        <div className="px-6">Certificates supported</div>
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
            <div className="px-6">{guardian.total}</div>
            <div className="flex items-center gap-x-4 px-6">
              {guardian.socialCerts.map((cert) => (
                <Icon
                  className="size-5 min-h-5 min-w-5"
                  key={cert}
                  name={cert}
                />
              ))}
            </div>
            <div className="flex px-6">
              <Button
                className="h-10 basis-full"
                onClick={() => {
                  console.log("TODO: to be continued");
                }}
              >
                Start zkCertificate
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
