import { useState } from "react";
import { Upload } from "./upload";
import { Tab } from "./tab";

export const MyCertificates = () => {
  const [active, setActive] = useState(1);
  const [activeBottom, setActiveBottom] = useState(1);

  const hasCertificates = false;

  return (
    <div className="flex flex-col p-8">
      <h1 className="text-3xl font-semibold">My Certificates</h1>
      <div className="mt-6 mb-8 flex space-x-3 border-b border-b-iron">
        <Tab active={active === 1} onClick={() => setActive(1)}>
          My KYCs
        </Tab>
        <Tab active={active === 2} onClick={() => setActive(2)}>
          My Social Accounts
        </Tab>
        <Tab active={active === 3} onClick={() => setActive(3)}>
          Other Certificates
        </Tab>
      </div>
      <Upload className={hasCertificates ? "max-h-[170px]" : ""} />

      {hasCertificates ? (
        <div className="flex space-x-3 mt-6 border-b border-b-iron">
          <Tab active={activeBottom === 1} onClick={() => setActiveBottom(1)}>
            Active KYCs
          </Tab>
          <Tab active={activeBottom === 2} onClick={() => setActiveBottom(2)}>
            Expired KYCs
          </Tab>
        </div>
      ) : null}
    </div>
  );
};
