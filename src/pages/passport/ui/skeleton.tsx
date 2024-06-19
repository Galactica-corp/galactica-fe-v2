import ContentLoader from "react-content-loader";

export const Skeleton = () => {
  return (
    <div className="mt-[100px] flex items-center justify-center">
      <ContentLoader
        backgroundColor="white"
        className="rounded-2xl border border-black/7 bg-whiteSmoke shadow-2xl"
        foregroundColor="#F7F4F2"
        height={605}
        title=""
        viewBox="0 0 1216 615"
        width={1216}
      >
        <rect height="323" rx="12" ry="12" width="270" x="32" y="32" />
        <rect height="323" rx="12" ry="12" width="246" x="332" y="32" />
        <rect height="197" rx="12" ry="12" width="546" x="32" y="385" />
        <rect
          fill="#EAECF0"
          height="547"
          rx="12"
          ry="12"
          style={{
            fill: "#EAECF0",
          }}
          width="1"
          x="610"
          y="32"
        />
        <rect height="64" rx="12" ry="12" width="538" x="642" y="32" />
        <rect height="83" rx="12" ry="12" width="538" x="642" y="116" />
        <rect height="64" rx="12" ry="12" width="538" x="642" y="219" />

        <rect height="72" rx="12" ry="12" width="258" x="642" y="314" />
        <rect height="72" rx="12" ry="12" width="258" x="918" y="314" />

        <rect height="72" rx="12" ry="12" width="258" x="642" y="407" />
        <rect height="72" rx="12" ry="12" width="258" x="918" y="407" />

        <rect height="84" rx="12" ry="12" width="533" x="642" y="497" />
      </ContentLoader>
    </div>
  );
};
