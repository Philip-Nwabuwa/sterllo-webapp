import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Route } from "@/routes/_authenticated/wallets.$id";
import ReceiptModal, { type ReceiptData } from "./ReceiptModal";

import BankIcon from "../assets/icons/bank.svg";
import exportIcon from "../assets/icons/export-icon.svg";
import arrowDown from "../assets/icons/arrow-down-icon.svg";
import filterIcon from "../assets/icons/filter.svg";
import searchIcon from "../assets/icons/search.svg";
import arrowDownBlack from "../assets/icons/arrow-down-black-icon.svg";

type TransactionStatus = "Processing" | "Completed" | "Failed";

function getStatusStyles(status: TransactionStatus) {
  switch (status) {
    case "Processing":
      return {
        bg: "bg-[#191f4d]",
        border: "border-[#233876]",
        text: "text-[#5b8def]",
      };
    case "Completed":
      return {
        bg: "bg-[#053321]",
        border: "border-[#074d31]",
        text: "text-[#17b26a]",
      };
    case "Failed":
      return {
        bg: "bg-[rgba(85,22,12,0.2)]",
        border: "border-[#431008]",
        text: "text-[#912018]",
      };
  }
}

export default function WalletDetail() {
  const params = Route.useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "transfers" | "withdrawals" | "deposits" | "swaps"
  >("transfers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["wallet", id],
    queryFn: async () => {
      const response = await fetch(`/api/wallets/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch wallet details");
      }
      return response.json();
    },
  });

  const {
    data: transfersData,
    isLoading: transfersLoading,
    error: transfersError,
  } = useQuery({
    queryKey: ["transfers", id, selectedWallet],
    queryFn: async () => {
      if (!data?.data?.subWallets?.[selectedWallet]?.id) {
        return { success: true, data: [], meta: { pagination: { page: 1, limit: 25 } } };
      }
      const walletId = data.data.subWallets[selectedWallet].id;
      const response = await fetch(`/api/wallets/${walletId}/transfers`);
      if (!response.ok) {
        throw new Error("Failed to fetch transfers");
      }
      return response.json();
    },
    enabled: !!data?.data?.subWallets?.[selectedWallet]?.id && activeTab === "transfers",
  });

  const {
    data: withdrawalsData,
    isLoading: withdrawalsLoading,
    error: withdrawalsError,
  } = useQuery({
    queryKey: ["withdrawals", id, selectedWallet],
    queryFn: async () => {
      if (!data?.data?.subWallets?.[selectedWallet]?.id) {
        return { success: true, data: [], meta: { pagination: { page: 1, limit: 25 } } };
      }
      const walletId = data.data.subWallets[selectedWallet].id;
      const response = await fetch(`/api/wallets/${walletId}/withdrawals`);
      if (!response.ok) {
        throw new Error("Failed to fetch withdrawals");
      }
      return response.json();
    },
    enabled: !!data?.data?.subWallets?.[selectedWallet]?.id && activeTab === "withdrawals",
  });

  const {
    data: depositsData,
    isLoading: depositsLoading,
    error: depositsError,
  } = useQuery({
    queryKey: ["deposits", id, selectedWallet],
    queryFn: async () => {
      if (!data?.data?.subWallets?.[selectedWallet]?.id) {
        return { success: true, data: [], meta: { pagination: { page: 1, limit: 25 } } };
      }
      const walletId = data.data.subWallets[selectedWallet].id;
      const response = await fetch(`/api/wallets/${walletId}/deposits`);
      if (!response.ok) {
        throw new Error("Failed to fetch deposits");
      }
      return response.json();
    },
    enabled: !!data?.data?.subWallets?.[selectedWallet]?.id && activeTab === "deposits",
  });

  console.log("data", data);
  console.log("transfersData", transfersData);
  console.log("withdrawalsData", withdrawalsData);
  console.log("depositsData", depositsData);

  if (isLoading) {
    return (
      <div className="bg-neutral-950 relative size-full min-h-screen flex items-center justify-center">
        <div className="text-[#f7f7f7] text-xl font-['Nunito',sans-serif]">
          Loading wallet details...
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="bg-neutral-950 relative size-full min-h-screen flex items-center justify-center">
        <div className="content-stretch flex flex-col gap-4 items-center">
          <p className="font-['Nunito',sans-serif] font-semibold leading-[28.8px] text-[#f7f7f7] text-2xl">
            {error ? `Error: ${error.message}` : "Wallet not found"}
          </p>
          <button
            onClick={() => navigate({ to: "/wallets" })}
            className="bg-[#bad133] box-border content-stretch flex gap-2 items-center justify-center px-5 py-3 rounded-full"
          >
            <p className="font-['Nunito',sans-serif] font-normal leading-[16.8px] text-[#121505] text-sm">
              Back to Wallets
            </p>
          </button>
        </div>
      </div>
    );
  }

  const walletData = data.data;

  return (
    <div className="bg-neutral-950 relative size-full min-h-screen pb-10">
      {/* Page Header */}
      <div className="bg-[#0a0a0a] flex gap-4 items-end px-6 py-6 w-full">
        <div className="flex flex-col gap-4 flex-1">
          {/* Breadcrumb */}
          <div className="bg-[#181818] border-[#313131] border-[0.5px] border-solid flex gap-3 items-center px-4 py-1 rounded-full w-fit">
            <button
              onClick={() => navigate({ to: "/wallets" })}
              className="size-5 cursor-pointer"
            >
              <svg viewBox="0 0 20 20" fill="none" className="size-full">
                <path
                  d="M12.5 15.833L7.5 10.833C6.95 10.283 6.95 9.38301 7.5 8.83301L12.5 3.83301"
                  stroke="#717171"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="bg-[#313131] h-3 w-px" />
            <div className="flex gap-1 items-center">
              <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#717171] text-sm text-nowrap tracking-[-0.28px]">
                Wallets
              </p>
              <svg viewBox="0 0 10 10" fill="none" className="size-2.5">
                <path
                  d="M3.75 7.5L6.25 5L3.75 2.5"
                  stroke="#717171"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#d7d7d7] text-sm text-nowrap tracking-[-0.28px]">
                Manage Wallet
              </p>
            </div>
          </div>

          {/* Title and Info */}
          <div className="flex flex-col gap-6 px-1">
            <div className="flex flex-col gap-1">
              <div className="flex gap-4 items-center">
                <p className="font-['Nunito',sans-serif] font-semibold leading-[28.8px] text-[#f7f7f7] text-2xl text-nowrap tracking-[0.24px]">
                  {walletData.customerName}
                </p>
              </div>
            </div>
            <div className="flex gap-8 items-center">
              <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#717171] text-base text-nowrap tracking-[0.024px]">
                {walletData.email}
              </p>
              <div className="bg-[#313131] h-full w-[0.5px]" />
              <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-base text-nowrap tracking-[0.024px]">
                <span className="text-[#494949]">Wallet ID: </span>
                <span className="text-[#717171]">{walletData.walletId}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 items-center">
          <button className="bg-[#bad133] flex gap-2 items-center justify-center px-5 py-4 rounded-full">
            <svg viewBox="0 0 16 16" fill="none" className="size-4">
              <path
                d="M4.66667 8H11.3333M8 4.66667V11.3333"
                stroke="#121505"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-['Nunito',sans-serif] font-normal leading-[16.8px] text-[#121505] text-sm text-nowrap tracking-[0.14px]">
              Primary Button
            </p>
          </button>
          <button className="bg-[#181818] border-[#313131] border-[1px] border-solid flex gap-2 items-center justify-center px-5 py-4 rounded-full">
            <svg viewBox="0 0 16 16" fill="none" className="size-4">
              <path
                d="M4.66667 8H11.3333M8 4.66667V11.3333"
                stroke="#717171"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-['Nunito',sans-serif] font-normal leading-[16.8px] text-[#717171] text-sm text-nowrap tracking-[0.14px]">
              Secondary Button
            </p>
          </button>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="px-6 mt-6">
        <div className="bg-[#181818] flex rounded-3xl">
          <div className="flex w-full">
            {/* Wallet Tabs (Sidebar) */}
            <div className="flex flex-col w-56 min-h-[660px] border-r border-[#313131]">
              {/* Search Bar */}
              <div className="border-[#313131] border-b-[0.5px] border-solid flex items-center p-3">
                <div className="bg-[#494949] border-[#717171] border-[0.5px] border-solid flex gap-2 items-center px-4 py-2.5 rounded-xl w-full">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="size-5 shrink-0"
                  >
                    <path
                      d="M11.6666 4.1665H16.6666"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.6666 6.6665H14.1666"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 9.58317C17.5 13.9582 13.9583 17.4998 9.58329 17.4998C5.20829 17.4998 1.66663 13.9582 1.66663 9.58317C1.66663 5.20817 5.20829 1.6665 9.58329 1.6665"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.3333 18.3332L16.6666 16.6665"
                      stroke="#717171"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search for ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent font-['Nunito',sans-serif] font-normal w-full leading-[22.4px] outline-none relative text-sm text-[#a2a2a2] tracking-[-0.28px]"
                  />
                </div>
              </div>

              {/* Wallet List */}
              <div
                className="flex flex-col overflow-y-auto"
                style={{ maxHeight: "598px" }}
              >
                {walletData.subWallets.map((wallet: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedWallet(index)}
                    className={`${
                      selectedWallet === index
                        ? "bg-[#0a0a0a]"
                        : "bg-transparent"
                    } border-[#313131] border-b-[0.5px] border-solid flex flex-col gap-2 items-start p-4 w-full hover:bg-[#0a0a0a] transition-colors`}
                  >
                    <div className="flex gap-2 items-center w-full">
                      <img src={wallet.flag} className="size-5" />
                      <p className="font-['Nunito',sans-serif] font-normal flex leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#f7f7f7] text-nowrap tracking-[-0.28px]">
                        {wallet.title}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center justify-between w-full">
                      <p className="font-['Nunito',sans-serif] text-[#a2a2a2] text-xs">
                        {wallet.currency} {wallet.balance}
                      </p>
                      <div className="bg-[#007aff] flex gap-2 items-center justify-center px-2 py-1 rounded-full">
                        <img src={BankIcon} className="size-4" />
                        <p className="font-['Nunito',sans-serif] font-bold text-white text-xs">
                          {wallet.environment}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Table Section */}
            <div className="flex flex-col flex-1">
              {/* Tab Container */}
              <div className="border-[#313131] border-b-[0.5px] border-solid flex items-start">
                {["transfers", "withdrawals", "deposits", "swaps"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                      className={`${
                        activeTab === tab ? "" : "bg-[#0a0a0a]/50"
                      } flex-1 flex gap-2 items-center justify-between px-4 py-5 transition-colors`}
                    >
                      <p
                        className={`font-['Nunito',sans-serif] font-normal leading-[22.4px] text-sm text-nowrap tracking-[-0.28px] ${
                          activeTab === tab
                            ? "text-[#f7f7f7]"
                            : "text-[#717171]"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </p>
                      <svg viewBox="0 0 20 20" fill="none" className="size-5">
                        <path
                          d="M7.5 14.1667L12.5 9.16667L7.5 4.16667"
                          stroke={activeTab === tab ? "#f7f7f7" : "#717171"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )
                )}
              </div>

              {/* Table Container */}
              <div className="flex flex-col">
                {/* Header */}
                <div className="border-[#313131] border-b-[0.5px] border-solid flex gap-4 justify-between items-center px-4 py-6">
                  <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px] whitespace-nowrap">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Statement
                  </p>
                  <div className="flex gap-4 items-center">
                    <div className="bg-[#181818] border-[#717171] border-[0.5px] border-solid flex gap-2 items-center px-4 py-3 rounded-xl flex-1 min-w-[100px]">
                      <img src={searchIcon} className="size-5" />
                      <input
                        type="text"
                        placeholder="Search wallets..."
                        className="bg-transparent font-['Nunito',sans-serif] font-normal w-full leading-[22.4px] outline-none relative text-sm text-[#a2a2a2] tracking-[-0.28px]"
                      />
                    </div>
                    <button className="bg-[#494949] flex gap-2 items-center justify-center px-5 py-2.5 rounded-full whitespace-nowrap">
                      <img src={filterIcon} className="size-5" />
                      <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] text-[#a2a2a2] text-xs tracking-[0.12px]">
                        All Status
                      </p>
                      <img src={arrowDown} className="size-5" />
                    </button>
                    <button className="bg-[#494949] flex gap-2 items-center justify-center px-5 py-2.5 rounded-full whitespace-nowrap">
                      <img src={filterIcon} className="size-5" />
                      <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] text-[#a2a2a2] text-xs tracking-[0.12px]">
                        All Currencies
                      </p>
                      <img src={arrowDown} className="size-5" />
                    </button>
                    <button className="bg-[#fff] flex gap-2 items-center justify-center px-5 py-2.5 rounded-full whitespace-nowrap">
                      <img src={exportIcon} />
                      <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] text-[#000] text-xs tracking-[0.12px]">
                        Export
                      </p>
                      <img src={arrowDownBlack} className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="flex flex-col p-2">
                  <div className="border-[#0a0a0a] border-[0.5px] border-solid rounded-2xl">
                    <div className="flex flex-col overflow-clip rounded-inherit">
                      {/* Table Header Row */}
                      <div className="flex items-start overflow-clip">
                        <div className="flex-1 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 rounded-tl-2xl">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Service
                          </p>
                        </div>
                        <div className="flex-1 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Amount
                          </p>
                        </div>
                        <div className="flex-1 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Recipient
                          </p>
                        </div>
                        <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[140px]">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Date
                          </p>
                        </div>
                        <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[132px]">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Status
                          </p>
                        </div>
                        <div className="bg-[#313131] flex items-center px-4 py-3 w-[80px] rounded-tr-2xl">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Actions
                          </p>
                        </div>
                      </div>

                      {/* Table Rows */}
                      <div className="flex flex-col">
                        {activeTab === "transfers" ? (
                          transfersLoading ? (
                            <div className="flex items-center justify-center py-8">
                              <p className="font-['Nunito',sans-serif] text-[#a2a2a2] text-sm">
                                Loading transfers...
                              </p>
                            </div>
                          ) : transfersError ? (
                            <div className="flex items-center justify-center py-8">
                              <p className="font-['Nunito',sans-serif] text-[#912018] text-sm">
                                Error loading transfers
                              </p>
                            </div>
                          ) : !transfersData?.data || transfersData.data.length === 0 ? (
                            <div className="flex items-center justify-center py-8">
                              <p className="font-['Nunito',sans-serif] text-[#a2a2a2] text-sm">
                                No transfers found
                              </p>
                            </div>
                          ) : (
                            transfersData.data.map(
                              (transfer: any, index: number) => {
                                const statusStyles = getStatusStyles(
                                  transfer.status
                                );
                                const isEvenRow = index % 2 === 1;
                                return (
                                  <div
                                    key={transfer.id || index}
                                    className={`${
                                      isEvenRow ? "bg-[rgba(10,10,10,0.2)]" : ""
                                    } border-[#0a0a0a] border-b-[0.5px] border-solid flex h-10 items-start`}
                                  >
                                    <div className="flex-1 border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {transfer.service}
                                      </p>
                                    </div>
                                    <div className="flex-1 border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {transfer.amount}
                                      </p>
                                    </div>
                                    <div className="flex-1 border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {transfer.recipient?.name || "N/A"}
                                      </p>
                                    </div>
                                    <div className="border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2 w-[140px]">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {transfer.date}
                                      </p>
                                    </div>
                                    <div className="border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2 w-[132px]">
                                      <div
                                        className={`${statusStyles.bg} ${statusStyles.border} border-[0.5px] border-solid flex gap-1 items-center justify-center px-3 py-[2px] rounded-full`}
                                      >
                                        <p
                                          className={`font-['Nunito',sans-serif] font-medium leading-[19.2px] overflow-ellipsis overflow-hidden text-xs ${statusStyles.text} text-nowrap tracking-[0.48px]`}
                                        >
                                          {transfer.status}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-center min-h-10 px-4 py-2 w-[80px]">
                                      <button
                                        aria-label="View receipt"
                                        onClick={() => {
                                          setReceiptData({
                                            service: transfer.service,
                                            amount: transfer.amount,
                                            date: transfer.date,
                                            time: transfer.time,
                                            fee: transfer.fee,
                                            openingBalance: "N/A",
                                            closingBalance: "N/A",
                                            referenceId: transfer.reference,
                                            status: transfer.status,
                                          });
                                          setShowReceipt(true);
                                        }}
                                      >
                                        <svg
                                          className="size-5 cursor-pointer"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M7.5 14.1667L12.5 9.16667L7.5 4.16667"
                                            stroke="#a2a2a2"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          )
                        ) : activeTab === "withdrawals" ? (
                          withdrawalsLoading ? (
                            <div className="flex items-center justify-center py-8">
                              <p className="font-['Nunito',sans-serif] text-[#a2a2a2] text-sm">
                                Loading withdrawals...
                              </p>
                            </div>
                          ) : withdrawalsError ? (
                            <div className="flex items-center justify-center py-8">
                              <p className="font-['Nunito',sans-serif] text-[#912018] text-sm">
                                Error loading withdrawals
                              </p>
                            </div>
                          ) : !withdrawalsData?.data || withdrawalsData.data.length === 0 ? (
                            <div className="flex items-center justify-center py-8">
                              <p className="font-['Nunito',sans-serif] text-[#a2a2a2] text-sm">
                                No withdrawals found
                              </p>
                            </div>
                          ) : (
                            withdrawalsData.data.map(
                              (withdrawal: any, index: number) => {
                                const statusStyles = getStatusStyles(
                                  withdrawal.status
                                );
                                const isEvenRow = index % 2 === 1;
                                return (
                                  <div
                                    key={withdrawal.id || index}
                                    className={`${
                                      isEvenRow ? "bg-[rgba(10,10,10,0.2)]" : ""
                                    } border-[#0a0a0a] border-b-[0.5px] border-solid flex h-10 items-start`}
                                  >
                                    <div className="flex-1 border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {withdrawal.service}
                                      </p>
                                    </div>
                                    <div className="flex-1 border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {withdrawal.amount}
                                      </p>
                                    </div>
                                    <div className="flex-1 border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {withdrawal.recipient?.name || "N/A"}
                                      </p>
                                    </div>
                                    <div className="border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2 w-[140px]">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {withdrawal.date}
                                      </p>
                                    </div>
                                    <div className="border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2 w-[132px]">
                                      <div
                                        className={`${statusStyles.bg} ${statusStyles.border} border-[0.5px] border-solid flex gap-1 items-center justify-center px-3 py-[2px] rounded-full`}
                                      >
                                        <p
                                          className={`font-['Nunito',sans-serif] font-medium leading-[19.2px] overflow-ellipsis overflow-hidden text-xs ${statusStyles.text} text-nowrap tracking-[0.48px]`}
                                        >
                                          {withdrawal.status}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-center min-h-10 px-4 py-2 w-[80px]">
                                      <button
                                        aria-label="View receipt"
                                        onClick={() => {
                                          setReceiptData({
                                            service: withdrawal.service,
                                            amount: withdrawal.amount,
                                            date: withdrawal.date,
                                            time: withdrawal.time,
                                            fee: withdrawal.fee,
                                            openingBalance: "N/A",
                                            closingBalance: "N/A",
                                            referenceId: withdrawal.reference,
                                            status: withdrawal.status,
                                          });
                                          setShowReceipt(true);
                                        }}
                                      >
                                        <svg
                                          className="size-5 cursor-pointer"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M7.5 14.1667L12.5 9.16667L7.5 4.16667"
                                            stroke="#a2a2a2"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          )
                        ) : activeTab === "deposits" ? (
                          depositsLoading ? (
                            <div className="flex items-center justify-center py-8">
                              <p className="font-['Nunito',sans-serif] text-[#a2a2a2] text-sm">
                                Loading deposits...
                              </p>
                            </div>
                          ) : depositsError ? (
                            <div className="flex items-center justify-center py-8">
                              <p className="font-['Nunito',sans-serif] text-[#912018] text-sm">
                                Error loading deposits
                              </p>
                            </div>
                          ) : !depositsData?.data || depositsData.data.length === 0 ? (
                            <div className="flex items-center justify-center py-8">
                              <p className="font-['Nunito',sans-serif] text-[#a2a2a2] text-sm">
                                No deposits found
                              </p>
                            </div>
                          ) : (
                            depositsData.data.map(
                              (deposit: any, index: number) => {
                                const statusStyles = getStatusStyles(
                                  deposit.status
                                );
                                const isEvenRow = index % 2 === 1;
                                return (
                                  <div
                                    key={deposit.id || index}
                                    className={`${
                                      isEvenRow ? "bg-[rgba(10,10,10,0.2)]" : ""
                                    } border-[#0a0a0a] border-b-[0.5px] border-solid flex h-10 items-start`}
                                  >
                                    <div className="flex-1 border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {deposit.service}
                                      </p>
                                    </div>
                                    <div className="flex-1 border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {deposit.amount}
                                      </p>
                                    </div>
                                    <div className="flex-1 border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {deposit.sender?.name || "N/A"}
                                      </p>
                                    </div>
                                    <div className="border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2 w-[140px]">
                                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                        {deposit.date}
                                      </p>
                                    </div>
                                    <div className="border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center min-h-10 px-4 py-2 w-[132px]">
                                      <div
                                        className={`${statusStyles.bg} ${statusStyles.border} border-[0.5px] border-solid flex gap-1 items-center justify-center px-3 py-[2px] rounded-full`}
                                      >
                                        <p
                                          className={`font-['Nunito',sans-serif] font-medium leading-[19.2px] overflow-ellipsis overflow-hidden text-xs ${statusStyles.text} text-nowrap tracking-[0.48px]`}
                                        >
                                          {deposit.status}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-center min-h-10 px-4 py-2 w-[80px]">
                                      <button
                                        aria-label="View receipt"
                                        onClick={() => {
                                          setReceiptData({
                                            service: deposit.service,
                                            amount: deposit.amount,
                                            date: deposit.date,
                                            time: deposit.time,
                                            fee: deposit.fee,
                                            openingBalance: "N/A",
                                            closingBalance: "N/A",
                                            referenceId: deposit.reference,
                                            status: deposit.status,
                                          });
                                          setShowReceipt(true);
                                        }}
                                      >
                                        <svg
                                          className="size-5 cursor-pointer"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                        >
                                          <path
                                            d="M7.5 14.1667L12.5 9.16667L7.5 4.16667"
                                            stroke="#a2a2a2"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          )
                        ) : (
                          <div className="flex items-center justify-center py-8">
                            <p className="font-['Nunito',sans-serif] text-[#a2a2a2] text-sm">
                              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} data not available yet
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Pagination */}
                      <div className="flex items-center justify-between gap-6 px-4 py-4">
                        <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[#494949] text-xs tracking-[0.48px]">
                          Showing 09 of 127 Wallets
                        </p>
                        <div className="flex gap-4 items-center">
                          <button
                            disabled
                            className="border-[#494949] border-[1px] border-solid opacity-30 rounded-full px-4 py-2"
                          >
                            <p className="font-['Nunito',sans-serif] font-normal leading-[14.4px] text-[#494949] text-xs tracking-[0.12px]">
                              Previous
                            </p>
                          </button>
                          <div className="flex font-['Nunito',sans-serif] font-medium gap-2 items-center leading-[19.2px] text-xs text-nowrap tracking-[0.48px]">
                            <p className="text-[#f7f7f7]">01</p>
                            <p className="text-[#494949]">of</p>
                            <p className="text-[#494949]">12</p>
                          </div>
                          <button className="border-[#494949] border-[1px] border-solid cursor-pointer rounded-full px-4 py-2">
                            <p className="font-['Nunito',sans-serif] font-normal leading-[14.4px] text-[#494949] text-xs tracking-[0.12px]">
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
        </div>
      </div>
      <ReceiptModal
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
        data={receiptData}
      />
    </div>
  );
}
