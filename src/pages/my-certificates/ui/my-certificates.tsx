import { useState } from "react";

import { KYCCard, KYCName } from "entities/kyc-card";
import { Tab, TabIndicator, Tabs } from "shared/ui/tabs";

import { Upload } from "./upload";

export const MyCertificates = () => {
  const [active, setActive] = useState(1);
  const [activeBottom, setActiveBottom] = useState(1);

  // test
  const activeCerts = [{ name: "swissborg" }, { name: "xCom" }] as {
    name: KYCName;
  }[];

  // test
  const expiredCerts = [] as {
    name: KYCName;
  }[];

  const hasCertificates = activeCerts.length > 0 || expiredCerts.length > 0;

  // const mutation = useInvokeSnapMutation<any>("listZkCerts");

  return (
    <div className="flex flex-col p-8">
      <h1 className="text-3xl font-semibold">My Certificates</h1>
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
                    key={`a${cert.name}`}
                    name={cert.name}
                    view="small"
                  />
                ))
              : null}
            {activeBottom === 2
              ? expiredCerts.map((cert) => (
                  <KYCCard
                    key={`e${cert.name}`}
                    name={cert.name}
                    view="small"
                  />
                ))
              : null}
          </div>
        </>
      ) : null}
    </div>
  );
};
