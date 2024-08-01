import { useState } from "react";

import { useCerts } from "entities/cert";
import { KYCCard } from "entities/kyc-card";
import { PageLayout } from "pages/ui";
import { Tab, TabIndicator, Tabs } from "shared/ui/tabs";

import { Upload } from "./upload";

export const MyCertificates = () => {
  const [active, setActive] = useState(1);
  const [activeBottom, setActiveBottom] = useState(1);

  const { certs } = useCerts();

  const filteredCerts = certs.filter((c) => {
    if (active === 1) return c.standard === "gip1";
    if (active === 1) return c.standard === "gip2";

    return c.standard !== "gip1" && c.standard !== "gip2";
  });

  const activeCerts = filteredCerts.filter(
    (c) => c.expirationDateMS > Date.now()
  );
  const expiredCerts = filteredCerts.filter(
    (c) => c.expirationDateMS <= Date.now()
  );

  const hasCertificates = activeCerts.length > 0 || expiredCerts.length > 0;

  return (
    <PageLayout title="My Certificates">
      <Tabs className="mb-8 mt-6">
        <Tab isActive={active === 1} onClick={() => setActive(1)}>
          My KYCs
        </Tab>
        <Tab isActive={active === 2} onClick={() => setActive(2)}>
          My Social Accounts
        </Tab>
        <Tab isActive={active === 3} onClick={() => setActive(3)}>
          Other Certificates
        </Tab>
      </Tabs>
      <Upload className={hasCertificates ? "max-h-[170px]" : ""} />

      {hasCertificates ? (
        <>
          <Tabs className="mt-6">
            <Tab
              isActive={activeBottom === 1}
              onClick={() => setActiveBottom(1)}
            >
              Active KYCs
              <TabIndicator isActive={activeBottom === 1}>
                {activeCerts.length}
              </TabIndicator>
            </Tab>
            <Tab
              isActive={activeBottom === 2}
              onClick={() => setActiveBottom(2)}
            >
              Expired KYCs
              <TabIndicator isActive={activeBottom === 2}>
                {expiredCerts.length}
              </TabIndicator>
            </Tab>
          </Tabs>
          <div className="grid grid-cols-[repeat(3,338px)] gap-8">
            {activeBottom === 1
              ? activeCerts.map((cert) => (
                  <KYCCard
                    expirationDate={cert.expirationDateMS}
                    key={`a${cert.expirationDate}`}
                    name={cert.standard === "gip1" ? "unknown" : "swissborg"}
                    view="small"
                  />
                ))
              : null}
            {activeBottom === 2
              ? expiredCerts.map((cert) => (
                  <KYCCard
                    expirationDate={cert.expirationDateMS}
                    key={`e${cert.expirationDate}`}
                    name={cert.standard === "gip1" ? "unknown" : "swissborg"}
                    view="small"
                  />
                ))
              : null}
          </div>
        </>
      ) : null}
    </PageLayout>
  );
};
