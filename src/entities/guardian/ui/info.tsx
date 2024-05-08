import { ReactNode } from "react";

type Props = {
  description?: ReactNode;
  img?: ReactNode;
  title: ReactNode;
};

export const GuardianInfo = ({ title, description, img }: Props) => {
  return (
    <div className="flex items-center gap-x-3">
      {typeof img == "string" ? <img className="size-10" src={img} /> : img}
      <div className="flex flex-col">
        <div className="text-sm font-medium">{title}</div>
        {description && (
          <div className="text-sm text-riverBed">{description}</div>
        )}
      </div>
    </div>
  );
};
