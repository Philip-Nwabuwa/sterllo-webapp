import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

// Reusable Components
import MetricCard from "./dashboard/MetricCard";

// Metric Icons
import walletsMetricIcon from "../assets/icons/wallets-metric-icon.svg";
import transactionsIcon from "../assets/icons/transactions-icon.svg";
import uptimeIcon from "../assets/icons/uptime-icon.svg";

// Flag assets from Figma export
import flagEUR from "../assets/icons/flags/EUR.svg";
import flagGHA from "../assets/icons/flags/GHA.svg";
import flagCHE from "../assets/icons/flags/CHE.svg";
import flagGBR from "../assets/icons/flags/GBR.svg";
import flagUGA from "../assets/icons/flags/UGA.svg";
import flagCAN from "../assets/icons/flags/CAN.svg";
import flagAUS from "../assets/icons/flags/AUS.svg";
import flagJPN from "../assets/icons/flags/JPN.svg";
import flagRWA from "../assets/icons/flags/RWA.svg";
import flagUSA from "../assets/icons/flags/USA.svg";

type WalletStatus = "Active" | "Inactive" | "Suspended";

interface WalletData {
  id: number;
  customerName: string;
  flag: string;
  currency: string;
  balance1: string;
  balance2: string;
  balance3: string;
  status: WalletStatus;
  dateCreated: string;
  lastActivity: string;
}

// Flag mapping for currencies
const currencyFlagMap: Record<string, string> = {
  EUR: flagEUR,
  GHS: flagGHA,
  CHF: flagCHE,
  GBP: flagGBR,
  UGX: flagUGA,
  CAD: flagCAN,
  AUD: flagAUS,
  JPY: flagJPN,
  RWF: flagRWA,
  USD: flagUSA,
};

function getStatusStyles(status: WalletStatus) {
  switch (status) {
    case "Active":
      return {
        bg: "bg-[#053321]",
        border: "border-[#074d31]",
        text: "text-[#17b26a]",
      };
    case "Inactive":
      return {
        bg: "bg-[#313131]",
        border: "border-[#494949]",
        text: "text-[#fff]",
      };
    case "Suspended":
      return {
        bg: "bg-[rgba(85,22,12,0.2)]",
        border: "border-[#431008]",
        text: "text-[#912018]",
      };
  }
}

export default function Wallets() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      const response = await fetch("/api/wallets/");
      if (!response.ok) {
        throw new Error("Failed to fetch wallets");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="bg-neutral-950 relative size-full min-h-screen flex items-center justify-center">
        <div className="text-[#f7f7f7] text-xl font-['Nunito',sans-serif]">
          Loading wallets...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-950 relative size-full min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl font-['Nunito',sans-serif]">
          Error loading wallets: {error.message}
        </div>
      </div>
    );
  }

  const wallets = data?.data || [];
  const metrics = data?.metrics || {};
  const total = data?.total || 0;

  // Map API data to component format
  const walletData: WalletData[] = wallets.map((wallet: any) => ({
    id: wallet.id,
    customerName: wallet.customerName,
    flag: currencyFlagMap[wallet.currency] || flagEUR,
    currency: wallet.currencySymbol,
    balance1: wallet.balance1,
    balance2: wallet.balance2,
    balance3: wallet.balance3,
    status: wallet.status as WalletStatus,
    dateCreated: wallet.dateCreated,
    lastActivity: wallet.lastActivity,
  }));

  return (
    <div
      className="bg-neutral-950 relative size-full min-h-screen pb-10"
      data-name="Wallets"
    >
      {/* Page Header */}
      <div className="bg-[#0a0a0a] flex gap-4 items-end p-6">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <p className="font-['Nunito',sans-serif] font-semibold leading-[28.8px] text-[#f7f7f7] text-2xl tracking-[0.24px]">
              Wallets
            </p>
            <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#a2a2a2] text-base tracking-[0.024px]">
              Manage and monitor all customer wallets across multiple
              currencies.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Container */}
      <div className="grid grid-cols-4 gap-6 px-6">
        <MetricCard
          icon={walletsMetricIcon}
          iconBg="bg-[#00c7be]"
          iconBorder="border-[#00e2d8]"
          title="Total Wallets"
          value={String(metrics.totalWallets || total)}
        />
        <MetricCard
          icon={transactionsIcon}
          iconBg="bg-[#0040c1]"
          iconBorder="border-[#004eeb]"
          title="Total Value"
          value="₦2.4B"
        />
        <MetricCard
          icon={uptimeIcon}
          iconBg="bg-[#085d3a]"
          iconBorder="border-[#067647]"
          title="Active Wallets"
          value={String(walletData.filter(w => w.status === "Active").length)}
        />
        <MetricCard
          icon={walletsMetricIcon}
          iconBg="bg-[#93370d]"
          iconBorder="border-[#b54708]"
          title="Pending Transactions"
          value={metrics.totalTransactions || "0"}
        />
      </div>

      {/* All Wallets Table */}
      <div className="px-6 mt-6">
        <div className="bg-[#181818] flex flex-col rounded-3xl">
          {/* Table Header */}
          <div className="border-[#313131] border-b-[0.5px] border-solid flex items-center justify-between gap-6 p-4">
            <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px]">
              All Wallets
            </p>
            <div className="flex-1 max-w-md">
              <div className="bg-[#181818] border-[#717171] border-[0.5px] border-solid flex gap-2 items-center p-4 rounded-xl">
                <svg className="size-5" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M9.0625 15.625C12.6869 15.625 15.625 12.6869 15.625 9.0625C15.625 5.43813 12.6869 2.5 9.0625 2.5C5.43813 2.5 2.5 5.43813 2.5 9.0625C2.5 12.6869 5.43813 15.625 9.0625 15.625Z"
                    stroke="#717171"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.7031 14.0781L17.5 17.8656"
                    stroke="#717171"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search wallets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent font-['Nunito',sans-serif] font-normal flex-1 leading-[22.4px] outline-none text-sm text-[#a2a2a2] tracking-[-0.28px]"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <button className="bg-[#494949] flex gap-2 items-center justify-center px-5 py-3 rounded-full">
                <svg
                  className="relative shrink-0 size-4"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2 4.66667H14"
                    stroke="#a2a2a2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.66669 8H11.3334"
                    stroke="#a2a2a2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.66669 11.3333H9.33335"
                    stroke="#a2a2a2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] text-[#a2a2a2] text-xs tracking-[0.12px]">
                  All Status
                </p>
                <svg className="size-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.28 5.96667L8.93333 10.3133C8.42 10.8267 7.58 10.8267 7.06667 10.3133L2.72 5.96667"
                    stroke="#a2a2a2"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex flex-col p-2">
            <div className="border-[#0a0a0a] border-[0.5px] border-solid rounded-2xl">
              <div className="flex flex-col overflow-clip rounded-inherit">
                {/* Table Header Row */}
                <div className="flex items-start overflow-clip">
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-[26px] py-[23px] rounded-tl-2xl" />
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[252px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Customer Name
                    </p>
                  </div>
                  <div className="flex-1 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Balance
                    </p>
                  </div>
                  <div className="basis-0 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center grow min-h-px min-w-px px-4 py-3 relative shrink-0">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Balance
                    </p>
                  </div>
                  <div className="basis-0 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center grow min-h-px min-w-px px-4 py-3 relative shrink-0">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Balance
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[124px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Status
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[164px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Date Created
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center px-4 py-3 relative shrink-0 w-[112px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Last Activity
                    </p>
                  </div>
                  <div className="bg-[#313131] box-border content-stretch flex items-center px-4 py-3 relative shrink-0 w-[80px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Actions
                    </p>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  {walletData.map((wallet, index) => {
                    const statusStyles = getStatusStyles(wallet.status);
                    const isEvenRow = index % 2 === 1;
                    return (
                      <div
                        key={wallet.id}
                        className={`${
                          isEvenRow ? "bg-[rgba(10,10,10,0.2)]" : ""
                        } border-[#0a0a0a] border-b-[0.5px] border-solid box-border content-stretch flex h-10 items-start relative shrink-0 w-full`}
                      >
                        <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0">
                          <img
                            src={wallet.flag}
                            alt="flag"
                            className="relative shrink-0 size-5"
                          />
                        </div>
                        <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[252px]">
                          <p
                            onClick={() => navigate({ to: `/wallets/${wallet.id}` })}
                            className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[22.4px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px] cursor-pointer hover:text-[#f7f7f7] transition-colors"
                          >
                            {wallet.customerName}
                          </p>
                        </div>
                        <div className="basis-0 border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex font-['Nunito',sans-serif] font-normal gap-1 grow items-center leading-[22.4px] min-h-10 min-w-px px-4 py-2 relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                          <p className="overflow-ellipsis overflow-hidden relative shrink-0">
                            {wallet.currency}
                          </p>
                          <p className="overflow-ellipsis overflow-hidden relative shrink-0">
                            {wallet.balance1}
                          </p>
                        </div>
                        <div className="basis-0 border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex font-['Nunito',sans-serif] font-normal gap-1 grow items-center leading-[22.4px] min-h-10 min-w-px px-4 py-2 relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                          <p className="overflow-ellipsis overflow-hidden relative shrink-0">
                            {wallet.currency}
                          </p>
                          <p className="overflow-ellipsis overflow-hidden relative shrink-0">
                            {wallet.balance2}
                          </p>
                        </div>
                        <div className="basis-0 border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex font-['Nunito',sans-serif] font-normal gap-1 grow items-center leading-[22.4px] min-h-10 min-w-px px-4 py-2 relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                          <p className="overflow-ellipsis overflow-hidden relative shrink-0">
                            {wallet.currency}
                          </p>
                          <p className="overflow-ellipsis overflow-hidden relative shrink-0">
                            {wallet.balance3}
                          </p>
                        </div>
                        <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[124px]">
                          <div
                            className={`${statusStyles.bg} ${statusStyles.border} border-[0.5px] border-solid box-border content-stretch flex gap-1 items-center justify-center px-3 py-[2px] relative rounded-full shrink-0`}
                          >
                            <p
                              className={`font-['Nunito',sans-serif] font-medium leading-[19.2px] overflow-ellipsis overflow-hidden relative shrink-0 text-xs ${statusStyles.text} text-nowrap tracking-[0.48px]`}
                            >
                              {wallet.status}
                            </p>
                          </div>
                        </div>
                        <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[164px]">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                            {wallet.dateCreated}
                          </p>
                        </div>
                        <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[112px]">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                            {wallet.lastActivity}
                          </p>
                        </div>
                        <div className="box-border content-stretch flex items-center justify-center min-h-10 px-4 py-2 relative shrink-0 w-[80px]">
                          <svg
                            className="relative shrink-0 size-4"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <circle
                              cx="8"
                              cy="3.33333"
                              r="1.33333"
                              fill="#a2a2a2"
                            />
                            <circle cx="8" cy="8" r="1.33333" fill="#a2a2a2" />
                            <circle
                              cx="8"
                              cy="12.6667"
                              r="1.33333"
                              fill="#a2a2a2"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="box-border content-stretch flex gap-6 items-center px-0 py-2 relative shrink-0 w-full">
                  <div className="basis-0 box-border content-stretch flex grow items-center min-h-px min-w-px px-4 py-3 relative shrink-0">
                    <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] relative shrink-0 text-[#494949] text-xs tracking-[0.48px]">
                      Showing {walletData.length} of {total} Wallets
                    </p>
                  </div>
                  <div className="box-border content-stretch flex gap-4 items-center justify-end px-4 py-0 relative shrink-0 w-[277px]">
                    <button
                      disabled
                      className="border-[#494949] border-[1px] border-solid opacity-30 relative rounded-full shrink-0 px-4 py-2"
                    >
                      <p className="font-['Nunito',sans-serif] font-normal leading-[14.4px] relative shrink-0 text-[#494949] text-xs tracking-[0.12px]">
                        Previous
                      </p>
                    </button>
                    <div className="content-stretch flex font-['Nunito',sans-serif] font-medium gap-2 items-center leading-[19.2px] relative shrink-0 text-xs text-nowrap tracking-[0.48px]">
                      <p className="relative shrink-0 text-[#f7f7f7]">01</p>
                      <p className="relative shrink-0 text-[#494949]">of</p>
                      <p className="relative shrink-0 text-[#494949]">12</p>
                    </div>
                    <button className="border-[#494949] border-[1px] border-solid cursor-pointer relative rounded-full shrink-0 px-4 py-2">
                      <p className="font-['Nunito',sans-serif] font-normal leading-[14.4px] relative shrink-0 text-[#494949] text-xs tracking-[0.12px]">
                        Next
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
