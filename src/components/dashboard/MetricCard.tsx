import arrowUpIcon from "../../assets/icons/arrow-up-icon.svg";
import arrowDownRedIcon from "../../assets/icons/arrow-down-red-icon.svg";

interface MetricCardProps {
  icon: string;
  iconBg: string;
  iconBorder: string;
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  changeText?: string;
}

export default function MetricCard({
  icon,
  iconBg,
  iconBorder,
  title,
  value,
  change,
  changeType,
  changeText,
}: MetricCardProps) {
  return (
    <div className="basis-0 bg-[#181818] box-border content-stretch flex flex-col gap-8 grow h-full items-start min-h-px min-w-px p-4 relative rounded-3xl shrink-0">
      <div className="relative shrink-0 w-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex gap-2 items-center relative w-full">
          <div
            className={`${iconBg} ${iconBorder} border-[0.5px] border-solid box-border content-stretch flex items-center justify-center p-[8.25px] relative rounded-3xl shrink-0`}
          >
            <div className="relative shrink-0 size-5">
              <img
                alt={title}
                className="block max-w-none size-full"
                src={icon}
              />
            </div>
          </div>
          <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[22.4px] min-h-px min-w-px relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
            {title}
          </p>
        </div>
      </div>
      <div className="h-[63px] relative shrink-0 w-full">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col gap-2 h-[63px] items-start justify-center relative w-full">
          <div className="content-stretch flex gap-1 items-center relative shrink-0 w-full">
            <p className="basis-0 font-['Nunito',sans-serif] font-semibold grow leading-[38.4px] min-h-px min-w-px relative shrink-0 text-[32px] text-[#c0c0c0] tracking-[0.32px]">
              {value}
            </p>
          </div>
          {change && changeType && changeText && (
            <div className="content-stretch flex gap-1 h-4 items-center relative shrink-0 w-[227.196px]">
              <div className="relative shrink-0 size-3">
                <img
                  alt={changeType === "up" ? "Arrow Up" : "Arrow Down"}
                  className="block max-w-none size-full"
                  src={changeType === "up" ? arrowUpIcon : arrowDownRedIcon}
                />
              </div>
              <div
                className={`basis-0 content-stretch flex font-['Nunito_Sans',sans-serif] font-normal gap-[2px] grow items-center leading-4 min-h-px min-w-px relative shrink-0 ${
                  changeType === "up" ? "text-[#17b26a]" : "text-[#f97066]"
                } text-xs`}
              >
                <p className="relative shrink-0 text-nowrap whitespace-pre">
                  {change}
                </p>
                <p className="basis-0 grow min-h-px min-w-px relative shrink-0">
                  {changeText}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
