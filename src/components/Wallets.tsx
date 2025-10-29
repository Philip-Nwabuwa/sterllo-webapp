import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Reusable Components
import Header from "./layout/Header";
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

const walletData: WalletData[] = [
  {
    id: 1,
    customerName: "Tunde Afolabi",
    flag: flagEUR,
    currency: "€",
    balance1: "300,750.00",
    balance2: "300,750.00",
    balance3: "300,750.00",
    status: "Active",
    dateCreated: "2024-10-02",
    lastActivity: "3 hours ago",
  },
  {
    id: 2,
    customerName: "Femi Ogunleye",
    flag: flagGHA,
    currency: "GH₵",
    balance1: "55,400.00",
    balance2: "55,400.00",
    balance3: "55,400.00",
    status: "Active",
    dateCreated: "2024-09-30",
    lastActivity: "3 hours ago",
  },
  {
    id: 3,
    customerName: "Zainab Ibrahim",
    flag: flagCHE,
    currency: "CHf",
    balance1: "200,250.00",
    balance2: "200,250.00",
    balance3: "200,250.00",
    status: "Suspended",
    dateCreated: "2024-09-27",
    lastActivity: "9 hours ago",
  },
  {
    id: 4,
    customerName: "Ijeoma Okeke",
    flag: flagGBR,
    currency: "£",
    balance1: "45,000.00",
    balance2: "45,000.00",
    balance3: "45,000.00",
    status: "Active",
    dateCreated: "2024-09-30",
    lastActivity: "5 hours ago",
  },
  {
    id: 5,
    customerName: "Adaobi Eze",
    flag: flagUGA,
    currency: "USh",
    balance1: "130,000.00",
    balance2: "130,000.00",
    balance3: "130,000.00",
    status: "Active",
    dateCreated: "2024-10-01",
    lastActivity: "1 hour ago",
  },
  {
    id: 6,
    customerName: "Olumide Bakare",
    flag: flagCAN,
    currency: "C$",
    balance1: "78,900.00",
    balance2: "78,900.00",
    balance3: "78,900.00",
    status: "Inactive",
    dateCreated: "2024-10-03",
    lastActivity: "4 hours ago",
  },
  {
    id: 7,
    customerName: "Bola Johnson",
    flag: flagAUS,
    currency: "A$",
    balance1: "150,600.00",
    balance2: "150,600.00",
    balance3: "150,600.00",
    status: "Active",
    dateCreated: "2024-10-04",
    lastActivity: "8 hours ago",
  },
  {
    id: 8,
    customerName: "Emeka Uche",
    flag: flagJPN,
    currency: "¥",
    balance1: "90,000.00",
    balance2: "90,000.00",
    balance3: "90,000.00",
    status: "Active",
    dateCreated: "2024-09-29",
    lastActivity: "7 hours ago",
  },
  {
    id: 9,
    customerName: "Jide Ojo",
    flag: flagRWA,
    currency: "RF",
    balance1: "99,999.00",
    balance2: "99,999.00",
    balance3: "99,999.00",
    status: "Active",
    dateCreated: "2024-09-29",
    lastActivity: "5 hours ago",
  },
  {
    id: 10,
    customerName: "Kamari Okoro",
    flag: flagUSA,
    currency: "$",
    balance1: "99,999.00",
    balance2: "99,999.00",
    balance3: "99,999.00",
    status: "Active",
    dateCreated: "2024-09-29",
    lastActivity: "5 hours ago",
  },
];

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

  return (
    <div
      className="bg-neutral-950 relative size-full min-h-screen pb-10"
      data-name="Wallets"
    >
      {/* Header */}
      <Header variant="bordered" />

      {/* Page Header */}
      <div className="bg-[#0a0a0a] box-border content-stretch flex gap-4 items-end left-0 p-6 top-[76px] w-full">
        <div className="basis-0 content-stretch flex flex-col gap-4 grow items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full">
            <div className="content-stretch flex gap-1 items-center relative shrink-0 w-full">
              <p className="basis-0 font-['Nunito',sans-serif] font-semibold grow leading-[28.8px] min-h-px min-w-px relative shrink-0 text-[#f7f7f7] text-2xl tracking-[0.24px]">
                Wallets
              </p>
            </div>
            <div className="content-stretch flex items-center relative shrink-0 w-full">
              <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[25.6px] min-h-px min-w-px relative shrink-0 text-[#a2a2a2] text-base tracking-[0.024px]">
                Manage and monitor all customer wallets across multiple
                currencies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Container */}
      <div className="box-border content-stretch flex gap-6 items-center justify-center px-6 py-0 w-full mt-6">
        <MetricCard
          icon={walletsMetricIcon}
          iconBg="bg-[#00c7be]"
          iconBorder="border-[#00e2d8]"
          title="Total Wallets"
          value="127"
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
          value="109"
        />
        <MetricCard
          icon={walletsMetricIcon}
          iconBg="bg-[#93370d]"
          iconBorder="border-[#b54708]"
          title="Pending Transactions"
          value="12"
        />
      </div>

      {/* All Wallets Table */}
      <div className="box-border content-stretch flex flex-col gap-1 items-start px-6 py-0 relative shrink-0 w-full mt-6">
        <div className="bg-[#181818] content-stretch flex flex-col items-start relative rounded-3xl shrink-0 w-full">
          {/* Table Header */}
          <div className="border-[#313131] border-b-[0.5px] border-solid box-border content-stretch flex gap-6 items-center p-4 relative shrink-0 w-full">
            <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[25.6px] min-h-px min-w-px relative shrink-0 text-[#f7f7f7] text-base tracking-[0.024px]">
              All Wallets
            </p>
            <div className="basis-0 content-stretch flex flex-col grow h-[43px] items-start min-h-px min-w-px relative shrink-0">
              <div className="basis-0 bg-[#181818] border-[#717171] border-[0.5px] border-solid box-border content-stretch flex gap-2 grow items-center min-h-px min-w-px p-4 relative rounded-xl shrink-0 w-full">
                <svg
                  className="relative shrink-0 size-5"
                  viewBox="0 0 20 20"
                  fill="none"
                >
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
                  className="basis-0 bg-transparent font-['Nunito',sans-serif] font-normal grow h-full leading-[22.4px] min-h-px min-w-px outline-none relative shrink-0 text-sm text-[#a2a2a2] tracking-[-0.28px]"
                />
              </div>
            </div>
            <div className="content-stretch flex gap-4 items-center relative shrink-0">
              <button className="bg-[#494949] box-border content-stretch flex gap-2 items-center justify-center px-5 py-3 relative rounded-full shrink-0">
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
                <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] relative shrink-0 text-[#a2a2a2] text-xs tracking-[0.12px]">
                  All Status
                </p>
                <svg
                  className="relative shrink-0 size-4"
                  viewBox="0 0 16 16"
                  fill="none"
                >
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
          <div className="box-border content-stretch flex flex-col items-start p-2 relative shrink-0 w-full">
            <div className="border-[#0a0a0a] border-[0.5px] border-solid relative rounded-2xl shrink-0 w-full">
              <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-inherit w-full">
                {/* Table Header Row */}
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full">
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center px-[26px] py-[23px] relative shrink-0 rounded-tl-2xl" />
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center px-4 py-3 relative shrink-0 w-[252px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Customer Name
                    </p>
                  </div>
                  <div className="basis-0 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center grow min-h-px min-w-px px-4 py-3 relative shrink-0">
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
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Balance
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center px-4 py-3 relative shrink-0 w-[124px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Status
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center px-4 py-3 relative shrink-0 w-[164px]">
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
                            onClick={() => navigate(`/wallets/${wallet.id}`)}
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
                      Showing 10 of 127 Wallets
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
