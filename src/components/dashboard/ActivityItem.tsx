interface ActivityItemProps {
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  time: string;
}

export default function ActivityItem({
  icon,
  iconBg,
  title,
  subtitle,
  time,
}: ActivityItemProps) {
  return (
    <div className="box-border content-stretch flex gap-3 items-start px-4 py-3 relative rounded-3xl shrink-0 w-full">
      <div className={`${iconBg} relative rounded-[20px] shrink-0 size-10`}>
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex items-center justify-center relative size-10">
          <div className="relative shrink-0 size-5">
            <img
              alt="Activity"
              className="block max-w-none size-full"
              src={icon}
            />
          </div>
        </div>
      </div>
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex flex-col gap-1 items-start relative w-full">
          <div className="content-stretch flex h-5 items-start relative shrink-0 w-full">
            <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[25.6px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#a2a2a2] text-base text-nowrap tracking-[0.024px]">
              {title}
            </p>
          </div>
          <div className="content-stretch flex gap-1 items-center relative shrink-0 w-full">
            <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[22.4px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#494949] text-sm text-nowrap tracking-[-0.28px]">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
      <div className="h-4 relative shrink-0">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex h-4 items-start relative">
          <p className="font-['Nunito_Sans',sans-serif] font-normal leading-4 relative shrink-0 text-[#777777] text-xs text-nowrap whitespace-pre">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}
