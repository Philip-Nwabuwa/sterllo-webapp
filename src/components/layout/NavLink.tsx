import arrowDownIcon from "../../assets/icons/arrow-down-icon.svg";

interface NavLinkProps {
  icon: string;
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
}

export default function NavLink({
  icon,
  label,
  isActive = false,
  hasDropdown = false,
  onClick,
}: NavLinkProps) {
  const baseClasses =
    "box-border content-stretch flex gap-3 h-12 items-center px-4 py-3 relative rounded-full shrink-0 cursor-pointer";
  const activeClasses =
    "bg-[#252a09] border-[#4a5313] border-[0.5px] border-solid";

  return (
    <div
      className={`${baseClasses} ${isActive ? activeClasses : ""}`}
      onClick={onClick}
    >
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
        <div className="bg-clip-padding border-0 border-transparent border-solid box-border content-stretch flex gap-2 items-center relative w-full">
          <div className="relative shrink-0 size-5">
            <img
              alt={label}
              className="block max-w-none size-full"
              src={icon}
            />
          </div>
          <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
            <p
              className={`basis-0 font-['Nunito',sans-serif] ${
                isActive
                  ? "font-normal text-[#f7f7f7]"
                  : "font-normal text-[#717171]"
              } grow leading-[21px] min-h-px min-w-px relative shrink-0 text-sm`}
            >
              {label}
            </p>
          </div>
        </div>
      </div>
      {hasDropdown && (
        <div className="relative shrink-0 size-5">
          <img
            alt="Dropdown"
            className="block max-w-none size-full"
            src={arrowDownIcon}
          />
        </div>
      )}
    </div>
  );
}
