import { motion } from "framer-motion";

import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

import { AddCertField, Field, UploadKYC } from ".";

export const Passport = () => {
  const loading = false;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="mt-[100px] flex items-center justify-center"
      initial={{ opacity: 0 }}
    >
      <div
        className={
          "grid w-[1216px] max-w-[1216px] grid-cols-2 rounded-xl border border-black/7 bg-whiteSmoke p-8 shadow-2xl"
        }
      >
        <div className="border-r border-r-dawnPink pr-8">
          <div className="flex space-x-8">
            <div className="h-[323px] w-[269px]">
              {loading ? (
                <div className="skelet-bg size-full rounded-xl" />
              ) : (
                <div className="no-data-gradient relative size-full rounded-xl border border-softPeach">
                  <div className="place-center">
                    <div className="text-center text-sm leading-5 text-riverBed/30">
                      User without a KYC proof
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex grow flex-col space-y-6">
              {loading ? (
                <div className="skelet-bg size-full rounded-xl" />
              ) : (
                <>
                  <div>
                    <div className="mb-1 text-sm leading-5 text-riverBed">
                      Your Cypher Book ID
                    </div>
                    <div
                      className="orange-gradient-text flex items-end
                      whitespace-nowrap font-ptm text-[38px] leading-none
                      tracking-[-2px]
                      "
                    >
                      <span>#0x8b2</span>
                      <span className="mr-1 text-xl tracking-[-6px]">...</span>
                      <span>86a01</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                    <Field label="My Level" value="1" />
                    <Field
                      icon={<Icon className="size-5" name="lightning" />}
                      label="Score"
                      theme="orange"
                      value="95"
                    />
                    <Field disabled label="Your GNC" value="—" />
                    <Field disabled label="GNC Wave" value="—" />
                    <Field disabled label="Reputation" value="—" />
                    <Field
                      disabled
                      icon={<Icon className="size-5" name="hand" />}
                      label="Voting Power"
                      theme="blue"
                      value="—"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <UploadKYC loading={loading} />
        </div>

        <div className="pl-8">
          <div className="flex h-full flex-col justify-between">
            <div className="grid grid-cols-1 grid-rows-[64px,83px,52px] gap-y-5">
              {loading ? (
                <>
                  <div className="skelet-bg rounded-xl" />
                  <div className="skelet-bg rounded-xl" />
                  <div className="skelet-bg rounded-xl" />
                </>
              ) : (
                <>
                  <div className="flex space-x-4">
                    <Icon className="size-16" name="logo" />
                    <div className="flex flex-col">
                      <div className="text-sm leading-5 text-riverBed">
                        GNET Balance
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-4xl font-semibold leading-[44px] text-balticSea">
                          0
                        </div>
                        <div
                          className="whitespace-nowrap rounded-[6px] border border-magicMint bg-blackSqueeze
                          px-2 py-[2px] text-sm leading-5 text-shamrockGreen shadow-sm"
                        >
                          $0
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[6px] border border-whiteSmoke/30 bg-white">
                    <div className="relative h-[85px] w-full">
                      <div
                        className="absolute size-full bg-contain bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url("/chart-bg.png")`,
                        }}
                      />
                      <div className="place-center text-2xl font-semibold text-balticSea/30">
                        Coming Soon
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr,1fr,1.5fr] gap-2">
                    <div>
                      <div className="text-sm leading-5 text-riverBed">
                        GNET Balance
                      </div>
                      <div className="whitespace-nowrap text-2xl font-semibold leading-8">
                        0
                      </div>
                    </div>

                    <div>
                      <div className="text-sm leading-5 text-riverBed">APY</div>
                      <div className="whitespace-nowrap text-2xl font-semibold leading-8">
                        32.1%
                      </div>
                    </div>

                    <Button
                      className="w-full text-sm font-semibold"
                      theme="basketBallOrange-secondary"
                    >
                      Go to Staking
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {loading ? (
                <>
                  <div className="skelet-bg h-[74px] rounded-xl" />
                  <div className="skelet-bg h-[74px] rounded-xl" />
                  <div className="skelet-bg h-[74px] rounded-xl" />
                  <div className="skelet-bg h-[74px] rounded-xl" />
                  <div className="skelet-bg col-span-2 h-[74px] rounded-xl" />
                </>
              ) : (
                <>
                  <AddCertField reward={"120"} title="Add Discord" />
                  <AddCertField disabled title="Add Discord" />
                  <AddCertField disabled title="Add Discord" />
                  <AddCertField disabled title="Add Facebook" />
                  <AddCertField
                    className="col-span-2"
                    disabled
                    title="View all proofs for zkCertificates"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
