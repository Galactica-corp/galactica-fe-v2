import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

type Theme = "jaffa";

type Props = {
  theme?: Theme;
};

const spinTransition = {
  duration: 0.9,
  ease: "linear",
  repeat: Infinity,
};

const animate = { rotate: 360 };

export const Spinner = ({ className, theme = "jaffa" }: Props & ClassName) => {
  return (
    <motion.svg
      animate={animate}
      className={twMerge(
        "size-12",
        theme === "jaffa" && "stroke-athensGray text-jaffa",
        className
      )}
      fill="none"
      transition={spinTransition}
      viewBox="0 0 49 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.31345 34.5C4.93457 32.1117 4.0396 29.4752 3.67964 26.741C3.31968 24.0069 3.50178 21.2286 4.21554 18.5648C4.9293 15.901 6.16075 13.4039 7.83957 11.216C9.51839 9.02812 11.6117 7.19234 14 5.81346C16.3883 4.43458 19.0248 3.53961 21.7589 3.17965C24.4931 2.81969 27.2714 3.00179 29.9352 3.71555C32.599 4.42931 35.0961 5.66076 37.284 7.33957C39.4719 9.01839 41.3076 11.1117 42.6865 13.5C44.0654 15.8883 44.9604 18.5248 45.3203 21.2589C45.6803 23.9931 45.4982 26.7714 44.7844 29.4352C44.0707 32.099 42.8392 34.5961 41.1604 36.784C39.4816 38.9719 37.3883 40.8077 35 42.1865C32.6117 43.5654 29.9752 44.4604 27.241 44.8203C24.5069 45.1803 21.7286 44.9982 19.0648 44.2844C16.401 43.5707 13.9039 42.3392 11.716 40.6604C9.52811 38.9816 7.69232 36.8883 6.31345 34.5L6.31345 34.5Z"
        stroke="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />
      <path
        d="M35 42.1865C32.6117 43.5654 29.9752 44.4604 27.241 44.8203C24.5069 45.1803 21.7286 44.9982 19.0648 44.2844C16.401 43.5707 13.9039 42.3392 11.716 40.6604C9.52812 38.9816 7.69233 36.8883 6.31345 34.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />
    </motion.svg>
  );
};
