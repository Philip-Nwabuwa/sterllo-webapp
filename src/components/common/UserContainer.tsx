import profileIcon from "../../assets/icons/profile-icon.svg";
import dropdownIcon from "../../assets/icons/dropdown-icon.svg";

interface UserContainerProps {
  className?: string;
  onLogout?: () => void;
  username?: string;
}

export default function UserContainer({
  className,
  onLogout,
  username = "Gwen",
}: UserContainerProps) {
  return (
    <div className={className} data-name="UserContainer">
      <div className="basis-0 content-stretch flex gap-2 grow items-center min-h-px min-w-px relative shrink-0">
        <div className="bg-[#181818] border-[#494949] border-[0.5px] border-solid box-border content-stretch flex items-center justify-center p-2 relative rounded-full shrink-0">
          <div className="relative shrink-0 size-5">
            <img
              alt="Profile"
              className="block max-w-none size-full"
              src={profileIcon}
            />
          </div>
        </div>
        <div className="basis-0 flex flex-col font-['Nunito',sans-serif] font-normal grow justify-end leading-none min-h-px min-w-px relative shrink-0 text-lg text-[#c0c0c0] tracking-[0.18px]">
          <p className="leading-[28.8px]">{username}</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="relative shrink-0 size-5 hover:opacity-70 transition-opacity"
        title="Logout"
      >
        <img
          alt="Dropdown"
          className="block max-w-none size-full"
          src={dropdownIcon}
        />
      </button>
    </div>
  );
}
