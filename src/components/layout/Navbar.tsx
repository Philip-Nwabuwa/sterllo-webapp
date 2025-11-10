import { useLocation, useNavigate } from "@tanstack/react-router";
import NavLink from "./NavLink";

// Navigation Icons
import dashboardIcon from "../../assets/icons/dashboard-icon.svg";
import customersIcon from "../../assets/icons/customers-icon.svg";
import walletsIcon from "../../assets/icons/wallets-icon.svg";
import paymentIcon from "../../assets/icons/payment-icon.svg";
import operationsIcon from "../../assets/icons/operations-icon.svg";

export interface NavItem {
  icon: string;
  label: string;
  path: string;
  hasDropdown?: boolean;
}

interface NavbarProps {
  className?: string;
  customNavItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { icon: dashboardIcon, label: "Dashboard", path: "/dashboard" },
  { icon: customersIcon, label: "Customers", path: "/customers" },
  { icon: walletsIcon, label: "Wallets", path: "/wallets" },
  { icon: paymentIcon, label: "Payments", path: "/payments", hasDropdown: true },
  {
    icon: operationsIcon,
    label: "Operations",
    path: "/operations",
    hasDropdown: true,
  },
];

export default function Navbar({ className, customNavItems }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = customNavItems || defaultNavItems;

  return (
    <div className={className || "content-stretch flex gap-3 items-center relative shrink-0"}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          icon={item.icon}
          label={item.label}
          isActive={location.pathname.startsWith(item.path)}
          hasDropdown={item.hasDropdown}
          onClick={() => navigate({ to: item.path as any })}
        />
      ))}
    </div>
  );
}
