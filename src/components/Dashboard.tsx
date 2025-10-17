import { useNavigate } from "react-router-dom";

// SVG Assets - Local imports
import logoIcon from "../assets/icons/logo-icon.svg";
import logoText from "../assets/icons/logo-text.svg";
import profileIcon from "../assets/icons/profile-icon.svg";
import dropdownIcon from "../assets/icons/dropdown-icon.svg";

// Navigation Icons
import dashboardIcon from "../assets/icons/dashboard-icon.svg";
import customersIcon from "../assets/icons/customers-icon.svg";
import walletsIcon from "../assets/icons/wallets-icon.svg";
import paymentIcon from "../assets/icons/payment-icon.svg";
import operationsIcon from "../assets/icons/operations-icon.svg";
import arrowDownIcon from "../assets/icons/arrow-down-icon.svg";

// Metric Icons
import activeCustomersIcon from "../assets/icons/active-customers-icon.svg";
import walletsMetricIcon from "../assets/icons/wallets-metric-icon.svg";
import transactionsIcon from "../assets/icons/transactions-icon.svg";
import disputesIcon from "../assets/icons/disputes-icon.svg";
import uptimeIcon from "../assets/icons/uptime-icon.svg";
import arrowUpIcon from "../assets/icons/arrow-up-icon.svg";
import arrowDownRedIcon from "../assets/icons/arrow-down-red-icon.svg";

// Activity Icons
import walletActivityIcon from "../assets/icons/wallet-activity-icon.svg";
import disputeActivityIcon from "../assets/icons/dispute-activity-icon.svg";
import transferActivityIcon from "../assets/icons/transfer-activity-icon.svg";
import customerActivityIcon from "../assets/icons/customer-activity-icon.svg";
import disputeRedActivityIcon from "../assets/icons/dispute-red-activity-icon.svg";

// Chart Assets
import transactionChart from "../assets/images/transaction-chart.svg";
import pieChart from "../assets/images/pie-chart.svg";

// Legend Icons
import pendingLegendIcon from "../assets/icons/pending-legend-icon.svg";
import resolvedLegendIcon from "../assets/icons/resolved-legend-icon.svg";
import eurLegendIcon from "../assets/icons/eur-legend-icon.svg";
import gbpLegnedIcon from "../assets/icons/gbp-legend-icon.svg";
import ngnLegendIcon from "../assets/icons/ngn-legend-icon.svg";
import usdLegendIcon from "../assets/icons/usd-legend-icon.svg";

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
    <div className={className} data-name="Logo">
      <div
        className="absolute bottom-0 left-0 right-[76.57%] top-0"
        data-name="Icon"
      >
        <img
          alt="Sterllo Icon"
          className="block max-w-none size-full"
          src={logoIcon}
        />
      </div>
      <div
        className="absolute bottom-[16.41%] left-[34.3%] right-0 top-[16.42%]"
        data-name="Text"
      >
        <img
          alt="Sterllo"
          className="block max-w-none size-full"
          src={logoText}
        />
      </div>
    </div>
  );
}

interface UserContainerProps {
  className?: string;
  onLogout?: () => void;
}

function UserContainer({ className, onLogout }: UserContainerProps) {
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
          <p className="leading-[28.8px]">Gwen</p>
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

function MetricCard({
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

interface ActivityItemProps {
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  time: string;
}

function ActivityItem({
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

interface NavLinkProps {
  icon: string;
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
}

function NavLink({
  icon,
  label,
  isActive = false,
  hasDropdown = false,
}: NavLinkProps) {
  const baseClasses =
    "box-border content-stretch flex gap-3 h-12 items-center px-4 py-3 relative rounded-full shrink-0 w-[180px]";
  const activeClasses =
    "bg-[#121505] border-[#252a09] border-[0.5px] border-solid";

  return (
    <div className={`${baseClasses} ${isActive ? activeClasses : ""}`}>
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
                  ? "font-bold text-[#f7f7f7]"
                  : "font-normal text-[#717171]"
              } grow leading-[21px] min-h-px min-w-px relative shrink-0 text-sm ${
                isActive ? "tracking-[0.035px]" : "tracking-[-0.28px]"
              }`}
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

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Clear authentication state/tokens
    navigate("/login");
  };
  const activityItems = [
    {
      icon: walletActivityIcon,
      iconBg: "bg-[#f4f8aa]",
      title: "Wallet #3456 created",
      subtitle: "by AdminUser",
      time: "2 mins ago",
    },
    {
      icon: disputeActivityIcon,
      iconBg: "bg-emerald-100",
      title: "Dispute #789 resolved successfully",
      subtitle: "by Support Team",
      time: "15 mins ago",
    },
    {
      icon: transferActivityIcon,
      iconBg: "bg-[#e3f2fd]",
      title: "Transfer of ₦50,000 processed",
      subtitle: "by System",
      time: "23 mins ago",
    },
    {
      icon: customerActivityIcon,
      iconBg: "bg-[#e3f2fd]",
      title: "New customer onboarded",
      subtitle: "by Sales Team",
      time: "1 hour ago",
    },
    {
      icon: disputeRedActivityIcon,
      iconBg: "bg-[#fbe2e2]",
      title: "New dispute filed for transaction #1234",
      subtitle: "by Customer Support",
      time: "2 hours ago",
    },
    {
      icon: disputeActivityIcon,
      iconBg: "bg-emerald-100",
      title: "API integration test passed",
      subtitle: "by DevOps",
      time: "4 hours ago",
    },
    {
      icon: walletActivityIcon,
      iconBg: "bg-[#f4f8aa]",
      title: "Wallet #3445 balance updated",
      subtitle: "by System",
      time: "5 hours ago",
    },
  ];

  return (
    <div
      className="bg-neutral-950 relative size-full min-h-screen"
      data-name="Dashboard"
    >
      {/* Header */}
      <div className="absolute content-stretch flex items-center justify-between left-0 top-0 w-full px-6 py-3">
        {/* Logo */}
        <div className="box-border content-stretch flex flex-col gap-1 items-start px-1 py-0 relative shrink-0">
          <Logo className="h-6 overflow-hidden relative shrink-0 w-[102px]" />
        </div>

        {/* Navigation */}
        <div className="content-stretch flex gap-3 items-center relative shrink-0">
          <NavLink icon={dashboardIcon} label="Dashboard" isActive={true} />
          <NavLink icon={customersIcon} label="Customers" />
          <NavLink icon={walletsIcon} label="Wallets" />
          <NavLink icon={paymentIcon} label="Payment" hasDropdown={true} />
          <NavLink
            icon={operationsIcon}
            label="Operations"
            hasDropdown={true}
          />
        </div>

        {/* User Info */}
        <div className="border-[2px_0px_0px] border-neutral-950 border-solid box-border content-stretch flex gap-4 items-center px-6 py-3 relative shrink-0">
          <UserContainer
            className="box-border content-stretch flex gap-4 items-center p-2 relative rounded-full shrink-0 w-[200px]"
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Metrics Container */}
      <div className="absolute box-border content-stretch flex gap-6 items-center justify-center left-0 px-6 py-0 top-[111px] w-full">
        <MetricCard
          icon={activeCustomersIcon}
          iconBg="bg-[#97ab27]"
          iconBorder="border-[#c8da5d]"
          title="Active Customers"
          value="1,247"
          change="12%"
          changeType="up"
          changeText="Compared to last month"
        />
        <MetricCard
          icon={walletsMetricIcon}
          iconBg="bg-[#00c7be]"
          iconBorder="border-[#00e2d8]"
          title="Total Wallets"
          value="3,456"
          change="8%"
          changeType="up"
          changeText="Compared to last month"
        />
        <MetricCard
          icon={transactionsIcon}
          iconBg="bg-[#0040c1]"
          iconBorder="border-[#004eeb]"
          title="Transactions Today"
          value="892"
          change="5%"
          changeType="down"
          changeText="Compared to yesterday"
        />
        <MetricCard
          icon={disputesIcon}
          iconBg="bg-[#93370d]"
          iconBorder="border-[#b54708]"
          title="Pending Disputes"
          value="1,247"
        />
        <MetricCard
          icon={uptimeIcon}
          iconBg="bg-[#085d3a]"
          iconBorder="border-[#067647]"
          title="API Uptime"
          value="99.98%"
        />
      </div>

      {/* Transaction Volume Chart */}
      <div className="absolute bg-[#181818] h-[368px] left-6 overflow-hidden rounded-3xl top-[298.5px] w-[720px]">
        <div className="border-[#313131] border-[0px_0px_0.5px] border-solid box-border content-stretch flex gap-1 items-center left-0 px-4 py-2 top-[0.5px] w-[720px]">
          <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[25.6px] min-h-px min-w-px relative shrink-0 text-[#f7f7f7] text-base tracking-[0.024px]">
            Transaction Volume
          </p>
        </div>
        <div className="absolute left-4 top-16 w-[688px] h-[304px] flex items-center justify-center">
          <img
            alt="Transaction Chart"
            className="max-w-full max-h-full"
            src={transactionChart}
          />
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="absolute bg-[#181818] box-border content-stretch flex flex-col h-[659px] items-start left-[calc(50%+12px)] rounded-3xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] top-[299px] w-[720px]">
        <div className="border-[#313131] border-[0px_0px_0.5px] border-solid box-border content-stretch flex gap-1 items-center p-4 relative shrink-0 w-full">
          <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[25.6px] min-h-px min-w-px relative shrink-0 text-[#f7f7f7] text-base tracking-[0.024px]">
            Recent Activity
          </p>
        </div>
        <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-between min-h-px min-w-px px-0 py-4 relative shrink-0 w-full">
          {activityItems.map((item, index) => (
            <ActivityItem
              key={index}
              icon={item.icon}
              iconBg={item.iconBg}
              title={item.title}
              subtitle={item.subtitle}
              time={item.time}
            />
          ))}
        </div>
      </div>

      {/* Dispute Resolution Chart */}
      <div className="absolute bg-[#181818] content-stretch flex flex-col h-[267px] items-start left-6 overflow-hidden rounded-3xl top-[691px] w-[348px]">
        <div className="border-[#313131] border-[0px_0px_0.5px] border-solid box-border content-stretch flex gap-1 items-center px-4 py-2 relative shrink-0 w-full">
          <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[25.6px] min-h-px min-w-px relative shrink-0 text-[#f7f7f7] text-base tracking-[0.024px]">
            Dispute Resolution
          </p>
        </div>

        {/* Bar Chart Area */}
        <div className="basis-0 grow min-h-px min-w-px overflow-hidden relative shrink-0 w-full p-4">
          {/* Simplified Bar Chart */}
          <div className="flex items-end justify-between h-32 px-4">
            {[
              { resolved: 80, pending: 41 },
              { resolved: 122, pending: 13 },
              { resolved: 93, pending: 85 },
              { resolved: 36, pending: 5 },
              { resolved: 130, pending: 25 },
              { resolved: 89, pending: 66 },
              { resolved: 17, pending: 28 },
            ].map((bar, index) => (
              <div key={index} className="flex flex-col items-center gap-1 w-8">
                <div className="flex gap-1 items-end h-full">
                  <div
                    className="bg-[#079455] rounded-t-2xl w-3"
                    style={{ height: `${(bar.resolved / 150) * 100}%` }}
                  />
                  <div
                    className="bg-[#dc6803] rounded-t-2xl w-3"
                    style={{ height: `${(bar.pending / 150) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Week Labels */}
          <div className="flex justify-between px-4 mt-2">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
              <p
                key={day}
                className="font-['Nunito',sans-serif] font-medium text-[#494949] text-[10px] text-center tracking-[0.5px] uppercase"
              >
                {day}
              </p>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="border-[#313131] border-[0px_0px_0.5px] border-solid box-border content-stretch flex gap-8 items-center justify-center px-4 py-2 relative shrink-0 w-full">
          <div className="content-stretch flex gap-1 items-center relative shrink-0">
            <div className="relative shrink-0 size-2">
              <img
                alt="Pending"
                className="block max-w-none size-full"
                src={pendingLegendIcon}
              />
            </div>
            <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] relative shrink-0 text-[#dc6803] text-xs text-center text-nowrap tracking-[0.48px] whitespace-pre">
              Pending
            </p>
          </div>
          <div className="content-stretch flex gap-1 items-center relative shrink-0">
            <div className="relative shrink-0 size-2">
              <img
                alt="Resolved"
                className="block max-w-none size-full"
                src={resolvedLegendIcon}
              />
            </div>
            <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] relative shrink-0 text-[#079455] text-xs text-center text-nowrap tracking-[0.48px] whitespace-pre">
              Resolved
            </p>
          </div>
        </div>
      </div>

      {/* Top Currencies Pie Chart */}
      <div className="absolute bg-[#181818] content-stretch flex flex-col h-[267px] items-start left-[calc(25%+18px)] overflow-hidden rounded-3xl top-[691px] w-[348px]">
        <div className="border-[#313131] border-[0px_0px_0.5px] border-solid box-border content-stretch flex gap-1 items-center px-4 py-2 relative shrink-0 w-full">
          <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[25.6px] min-h-px min-w-px relative shrink-0 text-[#f7f7f7] text-base tracking-[0.024px]">
            Top Currencies
          </p>
        </div>
        <div className="basis-0 box-border content-stretch flex gap-9 grow items-center justify-center min-h-px min-w-px overflow-hidden p-4 relative shrink-0 w-full">
          <div className="box-border content-stretch flex gap-1 h-full items-center justify-center px-0 py-[22px] relative shrink-0 w-[166px]">
            <div className="relative shrink-0 size-[150px]">
              <img
                alt="Pie Chart"
                className="block max-w-none size-full"
                src={pieChart}
              />
            </div>
          </div>
          <div className="basis-0 content-stretch flex flex-col gap-3 grow h-full items-center justify-center min-h-px min-w-px overflow-hidden relative shrink-0">
            <div className="content-stretch flex gap-1 items-center relative shrink-0 w-full">
              <div className="relative shrink-0 size-2">
                <img
                  alt="EUR"
                  className="block max-w-none size-full"
                  src={eurLegendIcon}
                />
              </div>
              <div className="basis-0 content-stretch flex grow h-[21.714px] items-center min-h-px min-w-px relative shrink-0">
                <p className="basis-0 font-['Nunito',sans-serif] font-medium grow leading-[19.2px] min-h-px min-w-px relative shrink-0 text-[#ff2d55] text-xs tracking-[0.48px]">
                  EUR (10%)
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-1 items-center relative shrink-0 w-full">
              <div className="relative shrink-0 size-2">
                <img
                  alt="GBP"
                  className="block max-w-none size-full"
                  src={gbpLegnedIcon}
                />
              </div>
              <div className="basis-0 content-stretch flex grow h-[21.714px] items-center min-h-px min-w-px relative shrink-0">
                <p className="basis-0 font-['Nunito',sans-serif] font-medium grow leading-[19.2px] min-h-px min-w-px relative shrink-0 text-[#2970ff] text-xs tracking-[0.48px]">
                  GBP (15%)
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-1 items-center relative shrink-0 w-full">
              <div className="relative shrink-0 size-2">
                <img
                  alt="NGN"
                  className="block max-w-none size-full"
                  src={ngnLegendIcon}
                />
              </div>
              <div className="basis-0 content-stretch flex grow h-[21.714px] items-center min-h-px min-w-px relative shrink-0">
                <p className="basis-0 font-['Nunito',sans-serif] font-medium grow leading-[19.2px] min-h-px min-w-px relative shrink-0 text-[#bad133] text-xs tracking-[0.48px]">
                  NGN (45%)
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-1 items-center relative shrink-0 w-full">
              <div className="relative shrink-0 size-2">
                <img
                  alt="USD"
                  className="block max-w-none size-full"
                  src={usdLegendIcon}
                />
              </div>
              <div className="basis-0 content-stretch flex grow h-[21.714px] items-center min-h-px min-w-px relative shrink-0">
                <p className="basis-0 font-['Nunito',sans-serif] font-medium grow leading-[19.2px] min-h-px min-w-px relative shrink-0 text-[#17b26a] text-xs tracking-[0.48px]">
                  USD (30%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
