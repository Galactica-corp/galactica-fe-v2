import { Icon } from "shared/ui/icon";
import { twMerge } from "tailwind-merge";

type UploadProps = {
  className?: string;
};

export const Upload = ({ className }: UploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    console.log(f);
  };
  return (
    <div
      className={twMerge(
        "relative w-full h-[500px] bg-white border border-dawnPink rounded-xl",
        className
      )}
    >
      <div className="absolute w-[300px] h-auto place-center">
        <div className="relative w-full h-full">
          <div className="border border-dawnPink m-auto mb-3 rounded-lg size-[40px] relative">
            <Icon className="place-center size-5" name="cloud" />
          </div>
          <div className="text-center">
            <label
              htmlFor="file"
              className="text-sm leading-none orange-gradient-text mr-1 cursor-pointer font-semibold"
            >
              <input
                className="hidden"
                id="file"
                type="file"
                onChange={handleFileChange}
                accept="application/json"
              />
              Click to upload
            </label>
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
  );
};
