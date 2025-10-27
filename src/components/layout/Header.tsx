import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import UserContainer from "../common/UserContainer";
import Navbar, { type NavItem } from "./Navbar";

interface HeaderProps {
  className?: string;
  username?: string;
  customNavItems?: NavItem[];
  variant?: "default" | "bordered";
}

export default function Header({
  className,
  username = "Gwen",
  customNavItems,
  variant = "default",
}: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Clear authentication state/tokens
    navigate("/login");
  };

  const baseClasses = variant === "bordered"
    ? "bg-[#0a0a0a] border-[#181818] border-b-[1px] border-solid"
    : "";

  return (
    <div
      className={`${baseClasses} box-border content-stretch flex items-center justify-between left-0 top-0 w-full px-6 py-3 ${className || ""}`}
    >
      {/* Logo */}
      <div className="box-border content-stretch flex flex-col gap-1 items-start px-1 py-0 relative shrink-0">
        <Logo className="h-6 overflow-hidden relative shrink-0 w-[102px]" />
      </div>

      {/* Navigation */}
      <Navbar customNavItems={customNavItems} />

      {/* User Info */}
      <div className="border-[2px_0px_0px] border-neutral-950 border-solid box-border content-stretch flex gap-4 items-center px-6 py-3 relative shrink-0">
        <UserContainer
          className="box-border content-stretch flex gap-4 items-center p-2 relative rounded-full shrink-0 w-[200px]"
          onLogout={handleLogout}
          username={username}
        />
      </div>
    </div>
  );
}
