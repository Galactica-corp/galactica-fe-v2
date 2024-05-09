import { useState } from "react";

import { twMerge } from "tailwind-merge";

import { SBTCard } from "entities/sbt";
import { Tab, Tabs } from "shared/ui/tabs";

import { OriginalSBTBanner } from "./ui/originial-sbt-banner";

type TabValue = "active" | "expired";

export const MySBTs = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("active");

  return (
    <div className="flex flex-col p-8">
      <h1 className="text-3xl font-semibold">My Soulbound tokens</h1>
      <Tabs className="mt-6">
        <Tab
          className="gap-x-2"
          isActive={activeTab === "active"}
          onClick={setActiveTab}
          value="active"
        >
          Active SBTs
          <span
            className={twMerge(
              "inline-flex size-5 items-center justify-center rounded-full border border-alabaster bg-white text-xs text-pickledBluewood",
              activeTab === "active" && "border-mistyRose text-basketBallOrange"
            )}
          >
            4
          </span>
        </Tab>
        <Tab
          isActive={activeTab === "expired"}
          onClick={setActiveTab}
          value="expired"
        >
          Expired SBTs
        </Tab>
      </Tabs>

      <OriginalSBTBanner className="mt-8" />

      <div className="mt-8 flex flex-wrap gap-6">
        <SBTCard expiryDate="25.04.28" name="Twitter proof" />
        <SBTCard expiryDate="25.04.28" name="Twitter proof" />
        <SBTCard expiryDate="25.04.28" name="Twitter proof" />
      </div>
    </div>
  );
};
