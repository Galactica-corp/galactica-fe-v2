import { useState } from "react";

import { SBTCard } from "entities/sbt";
import { Tab, TabIndicator, Tabs } from "shared/ui/tabs";

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
          onClick={() => setActiveTab("active")}
          value="active"
        >
          Active SBTs
          <TabIndicator isActive={activeTab === "active"}>4</TabIndicator>
        </Tab>
        <Tab
          isActive={activeTab === "expired"}
          onClick={() => setActiveTab("expired")}
          value="expired"
        >
          Expired SBTs
          <TabIndicator isActive={activeTab === "expired"}>1</TabIndicator>
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
