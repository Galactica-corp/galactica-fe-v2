import { useId } from "react";

import { twMerge } from "tailwind-merge";

import { ConnectWalletButton } from "features/connect-wallet";
import { useAuthMutation } from "shared/api";
import { ErrorIcon } from "shared/ui/icon";

import bgSrc from "../assets/bg.png";
import galacticaNetworkSrc from "../assets/galactica-network.svg";
import starSrc from "../assets/star.svg";
import { useAuthStatus } from "../use-auth-status";
import { Book } from "./book";

type Props = {
  className?: string;
  isBackendNeeded?: boolean;
  isMetamaskNeeded?: boolean;
  isSnapNeeded?: boolean;
  onComplete?(): void;
};

export const Auth = ({
  isBackendNeeded,
  isMetamaskNeeded,
  isSnapNeeded,
  className,
  ...props
}: Props) => {
  const id = useId();
  const { isWrongChain } = useAuthStatus({
    isBackendNeeded,
    isMetamaskNeeded,
    isSnapNeeded,
  });

  const authMutation = useAuthMutation();

  return (
    <Book
      isBackendNeeded={isBackendNeeded}
      isMetamaskNeeded={isMetamaskNeeded}
      isSnapNeeded={isSnapNeeded}
      onComplete={props.onComplete}
    >
      <div
        className="absolute left-0 top-0 size-full rounded-xl bg-whiteSmoke object-cover"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div
          className={twMerge(
            "flex w-[480px] max-w-[480px] flex-col items-center rounded-xl bg-cover bg-no-repeat py-14",
            className
          )}
          style={{
            backgroundImage: `url("/passport/texture-wave.png")`,
          }}
        >
          <h2 className="mb-8 font-ptm text-[40px] uppercase leading-[130%]">
            Passport
          </h2>
          <div className="relative">
            <img
              className="absolute left-1/3 top-4 z-30 -translate-x-1/3"
              src={starSrc}
            />
            <img
              className={twMerge(
                "relative flex h-[284px] w-[291px]",
                isWrongChain && "grayscale"
              )}
              src={bgSrc}
              style={{
                clipPath: `url(#clipped-image-${id})`,
              }}
            />
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              height="284px"
              viewBox="0 0 284 291"
              width="291px"
            >
              <defs>
                <clipPath
                  className="origin-center animate-spin-slow"
                  filter="url(#gradient)"
                  id={`clipped-image-${id}`}
                  style={{
                    animationDirection: "reverse",
                  }}
                >
                  <path d="M199.519 5.39047C198.803 5.0679 198.118 4.62833 197.367 4.44031C169.656 -2.50204 142.283 -1.40329 115.46 8.43738C105.027 12.2649 95.2071 17.3901 86.0774 23.8889C78.1752 29.5138 70.9393 35.8062 64.5733 42.9957C43.1169 67.2273 32.9052 95.4323 34.7959 127.771C36.0623 149.428 43.2681 169.014 56.9899 185.823C72.9782 205.407 93.5529 217.584 119.243 220.036C136.164 221.65 152.312 218.83 167.134 210.194C173.51 206.479 179.269 201.937 184.381 196.603C185.948 194.967 187.603 193.362 189.449 192.065C190.243 191.507 191.903 191.319 192.657 191.782C193.399 192.238 194.021 193.884 193.771 194.743C192.943 197.592 192.09 200.562 190.539 203.051C185.924 210.452 179.987 216.684 172.621 221.537C144.398 240.13 114.641 240.387 84.2392 228.132C68.1823 221.66 54.8692 211.163 43.6391 197.926C24.3826 175.23 15.6858 148.787 15.1074 119.596C14.7731 102.713 18.4613 86.338 24.6855 70.627C29.7719 57.7881 36.4811 45.7981 45.5219 35.2298C49.5095 30.5687 53.8084 26.1689 57.9618 21.6463C58.748 20.7903 59.5138 19.9164 60.2894 19.0503C60.1674 18.904 60.0453 18.7571 59.9233 18.6103C58.8563 19.4737 57.6934 20.2442 56.7378 21.215C48.0295 30.0621 39.912 39.3453 33.3434 49.9503C21.8816 68.4545 14.9111 88.383 13.0813 110.026C11.5302 128.369 13.3612 146.379 19.4474 163.814C24.6735 178.786 32.2083 192.594 42.856 204.471C68.2509 232.8 99.8792 246.92 138.379 244.247C158.201 242.87 176.297 236.208 191.766 223.732C215.468 204.613 227.34 179.961 225.636 149.353C225.494 146.802 225.228 144.234 225.406 141.7C225.482 140.611 226.389 138.907 227.207 138.72C228.134 138.509 229.773 139.407 230.425 140.306C233.347 144.334 234.257 149.151 234.949 153.911C237.704 172.885 233.892 190.625 224.449 207.281C215.431 223.186 203.008 235.845 187.196 245.065C158.593 261.743 128.019 264.956 96.1065 257.123C76.1575 252.227 58.5667 242.681 43.0426 229.381C26.8358 215.496 14.5494 198.749 6.06879 179.261C4.09003 174.714 2.22491 170.119 0.0546875 165.598C0.950103 168.507 1.68501 171.476 2.7657 174.316C13.5018 202.523 31.0378 225.544 56.3399 242.465C78.6757 257.402 103.393 265.301 130.367 265.25C159.02 265.196 184.893 256.553 207.269 238.573C229.522 220.693 242.943 197.593 247.061 169.503C250.206 148.053 246.213 127.609 235.234 108.899C225.924 93.0336 212.714 81.0611 195.357 74.0206C191.34 72.3915 187.209 71.0425 183.133 69.5576C182.027 69.1548 180.768 68.9357 179.876 68.2524C178.984 67.5696 177.796 66.2828 177.95 65.4922C178.142 64.5073 179.445 63.3012 180.499 63.0102C182.377 62.4921 184.435 62.3856 186.404 62.4628C198.616 62.9405 209.523 67.3022 219.629 73.8203C241.534 87.9487 254.912 108.035 260.914 133.002C266.966 158.178 264.129 182.653 253.716 206.255C245.096 225.793 231.828 241.873 214.959 254.941C204.058 263.386 191.968 269.853 178.952 274.721C166.781 279.273 154.285 282.014 141.38 283.167C140.431 283.252 139.491 283.434 138.549 283.804C140.443 283.804 142.355 283.977 144.228 283.776C158.569 282.243 172.667 279.531 186 273.918C202.338 267.041 217.126 257.826 229.849 245.346C239.469 235.91 247.71 225.552 254.044 213.726C267.187 189.19 271.976 163.165 267.42 135.692C262.595 106.601 248.633 82.6745 224.688 64.9951C205.868 51.0991 184.581 44.2913 160.949 45.6407C145.992 46.4949 132.045 50.9685 119.623 59.1253C103.427 69.761 92.4726 84.4061 87.9695 103.428C87.5008 105.409 86.9733 107.439 86.038 109.223C85.5158 110.219 84.1053 111.32 83.0803 111.334C82.0655 111.349 80.3666 110.227 80.127 109.307C79.2912 106.101 78.5289 102.769 78.5157 99.482C78.4794 90.5135 81.4721 82.2327 85.5746 74.3997C96.1047 54.295 112.738 41.1922 134.026 33.5854C164.598 22.6609 193.96 26.5949 222.234 41.1541C238.075 49.3118 251.153 60.8477 261.986 74.9647C275.715 92.857 284.137 112.908 287.5 135.071C288.452 141.344 289.012 147.676 289.806 154.455C290.532 146.153 289.56 138.406 288.276 130.725C284.596 108.709 276.042 88.671 262.346 70.9575C250.96 56.2304 236.996 44.4377 220.283 35.8242C201.49 26.1386 181.539 21.2457 160.467 22.1047C136.102 23.0978 113.61 30.5219 94.9962 46.3924C67.0729 70.1997 54.5844 100.252 62.1669 136.78C66.6506 158.378 79.0989 174.787 98.8798 185.236C103.379 187.613 108.479 188.875 113.313 190.62C115.041 191.244 116.95 191.532 118.493 192.444C119.527 193.055 120.674 194.504 120.655 195.559C120.637 196.63 119.427 198.35 118.427 198.61C115.193 199.451 111.786 200.329 108.5 200.16C94.386 199.433 82.2141 193.912 71.4651 184.891C55.3388 171.357 46.2851 153.957 42.3961 133.656C37.8222 109.78 42.2745 87.2045 53.429 65.9646C63.2834 47.2001 77.6609 32.3937 95.8496 21.1243C118.541 7.06516 143.265 0.779358 169.838 1.33551C179.865 1.54547 189.791 2.99573 199.552 5.3782L199.519 5.39047Z" />
                </clipPath>

                <rect
                  fill="url(#gradient)"
                  height="100%"
                  id="recGradient"
                  width="100%"
                  x="0"
                  y="0"
                />

                <filter id="filter" primitiveUnits="objectBoundingBox">
                  <feImage
                    height="100%"
                    preserveAspectRatio="none"
                    width="100%"
                    x="0"
                    xlinkHref="#recGradient"
                    y="0"
                  />

                  <feComposite in="SourceGraphic" operator="in" />
                </filter>

                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="gradient"
                  x1="106.36"
                  x2="460.492"
                  y1="541.023"
                  y2="432.449"
                >
                  <stop stopColor="#F26F56" />
                  <stop offset="1" stopColor="#F49756" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p
            className={twMerge(
              "mt-4 font-medium text-grapefruit",
              !isWrongChain && "appearance-none opacity-0"
            )}
          >
            Wrong network selected
          </p>

          <ConnectWalletButton
            className={twMerge(
              "mb-8 mt-4 h-[54px] w-[227px] font-ptm uppercase inner-border-basketBallOrange/75",
              isWrongChain && "mt-4 w-auto inner-border-grapefruit"
            )}
            connectContent={
              <span className="tracking-tighter">Connect MetaMask</span>
            }
            onConnect={(connector) => {
              if (isBackendNeeded) authMutation.mutate({ connector });
            }}
            switchChainContent={
              <span className="flex items-center gap-x-6">
                <ErrorIcon /> Switch to Galactica
              </span>
            }
            theme="basketBallOrange-transparent"
          />
          <img className="mt-auto" src={galacticaNetworkSrc} />
        </div>
      </div>
    </Book>
  );
};
