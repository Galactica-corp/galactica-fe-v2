import { useState } from "react";
import { Icon } from "shared/ui/icon";
import { twMerge } from "tailwind-merge";

export const MyCertificates = () => {
  const [active, setActive] = useState(1);
  const [activeBottom, setActiveBottom] = useState(1);

  const hasCertificates = true;

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
      <div
        className={twMerge(
          "relative w-full h-[500px] bg-white border border-dawnPink rounded-xl",
          hasCertificates && "max-h-[170px]"
        )}
      >
        <div className="absolute w-[300px] h-auto place-center">
          <div className="relative w-full h-full">
            <div className="border border-dawnPink m-auto mb-3 rounded-lg size-[40px] relative">
              <Icon className="place-center size-5" name="cloud" />
            </div>
            <div className="text-center">
              <span className="text-sm leading-none orange-gradient mr-1 cursor-pointer font-semibold">
                Click to upload
              </span>
              <span className="text-sm leading-none text-riverBed">
                or drag and drop
              </span>
              <div className="text-xs mt-1 leading-none text-riverBed">
                JSON file (max. 3mb)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-3 mt-6 border-b border-b-iron">
        <Tab active={activeBottom === 1} onClick={() => setActiveBottom(1)}>
          Active KYCs
        </Tab>
        <Tab active={activeBottom === 2} onClick={() => setActiveBottom(2)}>
          Expired KYCs
        </Tab>
      </div>
    </div>
  );
};

type TabProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick?(): void;
};

const Tab = ({ active, children, onClick }: TabProps) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div className={"px-1 pb-3"}>
        <div
          className={twMerge(
            "text-sm leading-none text-mistBlue ",
            active && "orange-gradient"
          )}
        >
          {children}
        </div>
      </div>
      <div
        className={twMerge(
          "orange-gradient-bg absolute -bottom-[1px] hidden h-[2px] w-full",
          active && "block"
        )}
      />
    </div>
  );
};
