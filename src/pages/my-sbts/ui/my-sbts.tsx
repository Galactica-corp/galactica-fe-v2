import { useState } from "react";

import { SBTCard } from "entities/sbt";
import { PageLayout } from "pages/ui";
import { useSBTsSuspenseQuery } from "shared/api";
import { Tab, TabIndicator, Tabs } from "shared/ui/tabs";

import { OriginalSBTBanner } from "./original-sbt-banner";

type TabValue = "active" | "expired";

export const MySBTs = () => {
  const [activeTab, setActiveTab] = useState<TabValue>("active");

  const query = useSBTsSuspenseQuery();
  const sbt = query.data;

  const activeSBTs = sbt && sbt.expirationTime > Date.now() ? [sbt] : [];
  const expiredSBTs = sbt && sbt.expirationTime <= Date.now() ? [sbt] : [];

  return (
    <PageLayout title="My Soulbound tokens">
      <Tabs className="mt-6">
        <Tab
          className="gap-x-2"
          isActive={activeTab === "active"}
          onClick={() => setActiveTab("active")}
        >
          Active SBTs
          {activeSBTs.length > 0 && (
            <TabIndicator isActive={activeTab === "active"}>1</TabIndicator>
          )}
        </Tab>
        <Tab
          isActive={activeTab === "expired"}
          onClick={() => setActiveTab("expired")}
        >
          Expired SBTs
          {expiredSBTs.length > 0 && (
            <TabIndicator isActive={activeTab === "expired"}>1</TabIndicator>
          )}
        </Tab>
      </Tabs>

      <OriginalSBTBanner className="mt-8" />

      <div className="mt-8 flex flex-wrap gap-6">
        {activeTab === "active" &&
          activeSBTs.map((sbt) => {
            return (
              <SBTCard
                expiryDate={new Date(sbt.expirationTime).toDateString()}
                key={sbt.tokenId}
                name="KYC Proof"
              />
            );
          })}

        {activeTab === "expired" &&
          expiredSBTs.map((sbt) => {
            return (
              <SBTCard
                expiryDate={new Date(sbt.expirationTime).toDateString()}
                key={sbt.tokenId}
                name="KYC Proof"
              />
            );
          })}
      </div>
    </PageLayout>
  );
};
