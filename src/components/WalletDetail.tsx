import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import ReceiptModal, { type ReceiptData } from "./ReceiptModal";

import BankIcon from "../assets/icons/bank.svg";
import exportIcon from "../assets/icons/export-icon.svg";
import arrowDown from "../assets/icons/arrow-down-icon.svg";
import filterIcon from "../assets/icons/filter.svg";
import searchIcon from "../assets/icons/search.svg";
import arrowDownBlack from "../assets/icons/arrow-down-black-icon.svg";
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
import flagNGN from "../assets/icons/flags/NGN.svg";

// Mock wallet data (in a real app this would come from an API)
const walletDetailsData: Record<
  string,
  {
    customerName: string;
    email: string;
    walletId: string;
    walletType: string;
    subWallets: Array<{
      id: string;
      flag: string;
      currency: string;
      balance: string;
    }>;
    transactions: Array<{
      service: string;
      amount: string;
      balance: string;
      date: string;
      time?: string;
      referenceId?: string;
      fee?: string;
      openingBalance?: string;
      status: TransactionStatus;
    }>;
  }
> = {
  "1": {
    customerName: "Tunde Afolabi",
    email: "tundeafolabi@gmail.com",
    walletId: "WB9X3K2ZL7A4FJ8R0TQ1V5E6MNDCYS",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-7890-0001",
        flag: flagNGN,
        currency: "₦",
        balance: "300,750.00",
      },
      {
        id: "WLT-7890-0002",
        flag: flagGBR,
        currency: "£",
        balance: "40,000.456",
      },
      {
        id: "WLT-7890-0003",
        flag: flagUSA,
        currency: "$",
        balance: "300,750.00",
      },
      {
        id: "WLT-7890-0004",
        flag: flagEUR,
        currency: "€",
        balance: "1,987,456.78",
      },
      {
        id: "WLT-7890-0005",
        flag: flagCAN,
        currency: "$",
        balance: "147,765.873",
      },
      {
        id: "WLT-7890-0006",
        flag: flagNGN,
        currency: "₦",
        balance: "32,456,789,456.89",
      },
      {
        id: "WLT-7890-0007",
        flag: flagGHA,
        currency: "₵",
        balance: "7,765,235.87",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        time: "13:58:34",
        referenceId: "TRF-EUR-0001",
        fee: "€25.00",
        openingBalance: "€500,000.00",
        status: "Processing",
      },
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        time: "10:12:05",
        referenceId: "TRF-EUR-0002",
        fee: "€25.00",
        openingBalance: "€600,000.00",
        status: "Completed",
      },
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        time: "09:01:11",
        referenceId: "TRF-EUR-0003",
        fee: "€25.00",
        openingBalance: "€900,000.00",
        status: "Completed",
      },
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        time: "08:43:50",
        referenceId: "TRF-EUR-0004",
        fee: "€25.00",
        openingBalance: "€1,200,000.00",
        status: "Failed",
      },
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        status: "Completed",
      },
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        status: "Completed",
      },
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        status: "Completed",
      },
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        status: "Completed",
      },
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        status: "Completed",
      },
      {
        service: "Transfer",
        amount: "€300,750.00",
        balance: "€300,750.00",
        date: "2024-10-02",
        status: "Completed",
      },
    ],
  },
  "2": {
    customerName: "Femi Ogunleye",
    email: "femiogunleye@gmail.com",
    walletId: "WB8Y2J1YK6Z3FI7Q9SP0U4D5LMCBXR",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-5540-0001",
        flag: flagGHA,
        currency: "GH₵",
        balance: "55,400.00",
      },
      {
        id: "WLT-5540-0002",
        flag: flagUSA,
        currency: "GH₵",
        balance: "20,400.00",
      },
      {
        id: "WLT-5540-0003",
        flag: flagEUR,
        currency: "GH₵",
        balance: "15,000.00",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "GH₵55,400.00",
        balance: "GH₵55,400.00",
        date: "2024-09-30",
        time: "14:22:01",
        referenceId: "TRF-GHS-1001",
        fee: "GH₵5.00",
        openingBalance: "GH₵60,400.00",
        status: "Completed",
      },
      {
        service: "Transfer",
        amount: "GH₵10,000.00",
        balance: "GH₵45,400.00",
        date: "2024-09-29",
        status: "Completed",
      },
      {
        service: "Withdrawal",
        amount: "GH₵5,000.00",
        balance: "GH₵40,400.00",
        date: "2024-09-28",
        status: "Completed",
      },
    ],
  },
  "3": {
    customerName: "Zainab Ibrahim",
    email: "zainabibrahim@gmail.com",
    walletId: "WB7X1I0XJ5Y2EH6P8RO9T3C4KLBAWR",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-2250-0001",
        flag: flagCHE,
        currency: "CHf",
        balance: "200,250.00",
      },
      {
        id: "WLT-2250-0002",
        flag: flagEUR,
        currency: "CHf",
        balance: "100,000.00",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "CHf200,250.00",
        balance: "CHf200,250.00",
        date: "2024-09-27",
        time: "11:47:22",
        referenceId: "TRF-CHF-2001",
        fee: "CHf10.00",
        openingBalance: "CHf300,250.00",
        status: "Processing",
      },
      {
        service: "Deposit",
        amount: "CHf50,000.00",
        balance: "CHf150,250.00",
        date: "2024-09-26",
        status: "Completed",
      },
    ],
  },
  "4": {
    customerName: "Ijeoma Okeke",
    email: "ijeomaokeke@gmail.com",
    walletId: "WB6W0H9WI4X1DG5O7QN8S2B3JKAZUQ",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-4500-0001",
        flag: flagGBR,
        currency: "£",
        balance: "45,000.00",
      },
      {
        id: "WLT-4500-0002",
        flag: flagUSA,
        currency: "£",
        balance: "25,000.00",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "£45,000.00",
        balance: "£45,000.00",
        date: "2024-09-30",
        time: "16:10:45",
        referenceId: "TRF-GBP-3001",
        fee: "£12.00",
        openingBalance: "£90,000.00",
        status: "Completed",
      },
      {
        service: "Transfer",
        amount: "£15,000.00",
        balance: "£30,000.00",
        date: "2024-09-29",
        status: "Completed",
      },
    ],
  },
  "5": {
    customerName: "Adaobi Eze",
    email: "adaobieze@gmail.com",
    walletId: "WB5V9G8VH3W0CF4N6PM7R1A2IJAYTQ",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-1300-0001",
        flag: flagUGA,
        currency: "USh",
        balance: "130,000.00",
      },
      {
        id: "WLT-1300-0002",
        flag: flagUSA,
        currency: "USh",
        balance: "80,000.00",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "USh130,000.00",
        balance: "USh130,000.00",
        date: "2024-10-01",
        time: "12:00:00",
        referenceId: "TRF-UGX-4001",
        fee: "USh1,000.00",
        openingBalance: "USh260,000.00",
        status: "Completed",
      },
    ],
  },
  "6": {
    customerName: "Olumide Bakare",
    email: "olumidebakare@gmail.com",
    walletId: "WB4U8F7UG2V9BE3M5OL6Q0Z1HIXZSP",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-7890-0001",
        flag: flagCAN,
        currency: "C$",
        balance: "78,900.00",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "C$78,900.00",
        balance: "C$78,900.00",
        date: "2024-10-03",
        time: "15:30:10",
        referenceId: "TRF-CAD-5001",
        fee: "C$3.00",
        openingBalance: "C$100,000.00",
        status: "Processing",
      },
    ],
  },
  "7": {
    customerName: "Bola Johnson",
    email: "bolajohnson@gmail.com",
    walletId: "WB3T7E6TF1U8AD2L4NK5P9Y0GHWYRO",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-1560-0001",
        flag: flagAUS,
        currency: "A$",
        balance: "150,600.00",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "A$150,600.00",
        balance: "A$150,600.00",
        date: "2024-10-04",
        time: "07:45:55",
        referenceId: "TRF-AUD-6001",
        fee: "A$8.00",
        openingBalance: "A$200,600.00",
        status: "Completed",
      },
    ],
  },
  "8": {
    customerName: "Emeka Uche",
    email: "emekauche@gmail.com",
    walletId: "WB2S6D5SE0T7ZC1K3MJ4O8X9FGVXQN",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-9000-0001",
        flag: flagJPN,
        currency: "¥",
        balance: "90,000.00",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "¥90,000.00",
        balance: "¥90,000.00",
        date: "2024-09-29",
        time: "19:20:01",
        referenceId: "TRF-JPY-7001",
        fee: "¥250.00",
        openingBalance: "¥120,000.00",
        status: "Completed",
      },
    ],
  },
  "9": {
    customerName: "Jide Ojo",
    email: "jideojo@gmail.com",
    walletId: "WB1R5C4RD9S6YB0J2LI3N7W8EFUWPM",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-9999-0001",
        flag: flagRWA,
        currency: "RF",
        balance: "99,999.00",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "RF99,999.00",
        balance: "RF99,999.00",
        date: "2024-09-29",
        time: "09:09:09",
        referenceId: "TRF-RWF-8001",
        fee: "RF100.00",
        openingBalance: "RF150,000.00",
        status: "Completed",
      },
    ],
  },
  "10": {
    customerName: "Kamari Okoro",
    email: "kamariokoro@gmail.com",
    walletId: "WB0Q4B3QC8R5XA9I1KH2M6V7DETVOL",
    walletType: "BAAS",
    subWallets: [
      {
        id: "WLT-9999-0001",
        flag: flagUSA,
        currency: "$",
        balance: "99,999.00",
      },
    ],
    transactions: [
      {
        service: "Transfer",
        amount: "$99,999.00",
        balance: "$99,999.00",
        date: "2024-09-29",
        time: "18:18:18",
        referenceId: "TRF-USD-9001",
        fee: "$5.00",
        openingBalance: "$150,000.00",
        status: "Completed",
      },
    ],
  },
};

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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "transfers" | "withdrawals" | "deposits" | "swaps"
  >("transfers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const walletData = walletDetailsData[id as keyof typeof walletDetailsData];

  console.log(walletData.subWallets);

  if (!walletData) {
    return (
      <div className="bg-neutral-950 relative size-full min-h-screen flex items-center justify-center">
        <div className="content-stretch flex flex-col gap-4 items-center">
          <p className="font-['Nunito',sans-serif] font-semibold leading-[28.8px] text-[#f7f7f7] text-2xl">
            Wallet not found
          </p>
          <button
            onClick={() => navigate("/wallets")}
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

  return (
    <div className="bg-neutral-950 relative size-full min-h-screen pb-10">
      {/* Header */}
      <Header variant="bordered" />

      {/* Page Header */}
      <div className="bg-[#0a0a0a] box-border content-stretch flex gap-4 items-end px-6 py-6 w-full">
        <div className="basis-0 content-stretch flex flex-col gap-4 grow items-start min-h-px min-w-px relative shrink-0">
          {/* Breadcrumb */}
          <div className="bg-[#181818] border-[#313131] border-[0.5px] border-solid box-border content-stretch flex gap-3 items-center px-4 py-1 relative rounded-full shrink-0">
            <button
              onClick={() => navigate("/wallets")}
              className="relative shrink-0 size-5 cursor-pointer"
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
            <div className="bg-[#313131] h-3 shrink-0 w-px" />
            <div className="content-stretch flex gap-1 items-center relative shrink-0">
              <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#717171] text-sm text-nowrap tracking-[-0.28px]">
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
              <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#d7d7d7] text-sm text-nowrap tracking-[-0.28px]">
                Manage Wallet
              </p>
            </div>
          </div>

          {/* Title and Info */}
          <div className="box-border content-stretch flex flex-col gap-6 items-start px-1 py-0 relative shrink-0">
            <div className="content-stretch flex flex-col gap-1 items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-4 items-center relative shrink-0">
                <p className="font-['Nunito',sans-serif] font-semibold leading-[28.8px] relative shrink-0 text-[#f7f7f7] text-2xl text-nowrap tracking-[0.24px]">
                  {walletData.customerName}
                </p>
                <div className="bg-[#007aff] box-border content-stretch flex gap-2 items-center justify-center px-4 py-1 relative rounded-full shrink-0">
                  <img src={BankIcon} />
                  <p className="font-['Nunito',sans-serif] font-bold leading-[21px] text-white text-sm">
                    {walletData.walletType}
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-8 items-center relative shrink-0 w-full">
              <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] relative shrink-0 text-[#717171] text-base text-nowrap tracking-[0.024px]">
                {walletData.email}
              </p>
              <div className="bg-[#313131] h-full shrink-0 w-[0.5px]" />
              <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] relative shrink-0 text-base text-nowrap tracking-[0.024px]">
                <span className="text-[#494949]">Wallet ID: </span>
                <span className="text-[#717171]">{walletData.walletId}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="content-stretch flex gap-4 items-center relative shrink-0">
          <button className="bg-[#bad133] box-border content-stretch flex gap-2 items-center justify-center px-5 py-4 relative rounded-full shrink-0">
            <svg viewBox="0 0 16 16" fill="none" className="size-4">
              <path
                d="M4.66667 8H11.3333M8 4.66667V11.3333"
                stroke="#121505"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-['Nunito',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#121505] text-sm text-nowrap tracking-[0.14px]">
              Primary Button
            </p>
          </button>
          <button className="bg-[#181818] border-[#313131] border-[1px] border-solid box-border content-stretch flex gap-2 items-center justify-center px-5 py-4 relative rounded-full shrink-0">
            <svg viewBox="0 0 16 16" fill="none" className="size-4">
              <path
                d="M4.66667 8H11.3333M8 4.66667V11.3333"
                stroke="#717171"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-['Nunito',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#717171] text-sm text-nowrap tracking-[0.14px]">
              Secondary Button
            </p>
          </button>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="box-border content-stretch flex items-start px-6 py-0 w-full mt-6">
        <div className="bg-[#181818] content-stretch flex items-start relative rounded-3xl shrink-0 w-full">
          <div className="flex w-full">
            {/* Wallet Tabs (Sidebar) */}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-56 min-h-[660px] border-r border-[#313131]">
              {/* Search Bar */}
              <div className="border-[#313131] border-b-[0.5px] border-solid box-border content-stretch flex items-center p-3 relative shrink-0 w-full">
                <div className="bg-[#494949] border-[#717171] border-[0.5px] border-solid box-border content-stretch flex gap-2 items-center px-4 py-2.5 relative rounded-xl shrink-0 w-full">
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
                className="content-stretch flex flex-col items-start relative shrink-0 w-full overflow-y-auto"
                style={{ maxHeight: "598px" }}
              >
                {walletData.subWallets.map((wallet, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedWallet(index)}
                    className={`${
                      selectedWallet === index
                        ? "bg-[#0a0a0a]"
                        : "bg-transparent"
                    } border-[#313131] border-b-[0.5px] border-solid box-border content-stretch flex flex-col gap-2 items-start p-4 relative w-full hover:bg-[#0a0a0a] transition-colors`}
                  >
                    <div className="content-stretch flex gap-2 items-center relative shrink-0 w-full">
                      <img src={wallet.flag} className="size-5" />
                      <p className="font-['Nunito',sans-serif] font-normal flex leading-[22.4px] overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#f7f7f7] text-nowrap tracking-[-0.28px]">
                        {wallet.id}
                      </p>
                    </div>
                    <p className="font-['Nunito',sans-serif] text-[#a2a2a2] text-xs">
                      {wallet.currency} {wallet.balance}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Table Section */}
            <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
              {/* Tab Container */}
              <div className="border-[#313131] border-b-[0.5px] border-solid content-stretch flex items-start relative shrink-0 w-full">
                {["transfers", "withdrawals", "deposits", "swaps"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                      className={`${
                        activeTab === tab ? "" : "bg-[#0a0a0a]/50"
                      } basis-0 box-border content-stretch flex gap-2 grow items-center justify-between min-h-px min-w-px px-4 py-5 relative shrink-0 transition-colors`}
                    >
                      <p
                        className={`font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-sm text-nowrap tracking-[-0.28px] ${
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
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                {/* Header */}
                <div className="border-[#313131] border-b-[0.5px] border-solid box-border flex gap-4 justify-between items-center px-4 py-6 relative shrink-0 w-full">
                  <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] relative shrink-0 text-[#f7f7f7] text-base tracking-[0.024px] whitespace-nowrap">
                    Transfers Statement
                  </p>
                  <div className="flex gap-4 items-center">
                    <div className="bg-[#181818] border-[#717171] border-[0.5px] border-solid box-border flex gap-2 items-center px-4 py-3 rounded-xl flex-1 min-w-[100px]">
                      <img src={searchIcon} className="size-5 shrink-0" />
                      <input
                        type="text"
                        placeholder="Search wallets..."
                        className="bg-transparent font-['Nunito',sans-serif] font-normal w-full leading-[22.4px] outline-none relative text-sm text-[#a2a2a2] tracking-[-0.28px]"
                      />
                    </div>
                    <button className="bg-[#494949] box-border content-stretch flex gap-2 items-center justify-center px-5 py-2.5 relative rounded-full shrink-0 whitespace-nowrap">
                      <img src={filterIcon} className="size-5 shrink-0" />
                      <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] relative shrink-0 text-[#a2a2a2] text-xs tracking-[0.12px]">
                        All Status
                      </p>
                      <img src={arrowDown} className="size-5 shrink-0" />
                    </button>
                    <button className="bg-[#494949] box-border content-stretch flex gap-2 items-center justify-center px-5 py-2.5 relative rounded-full shrink-0 whitespace-nowrap">
                      <img src={filterIcon} className="size-5 shrink-0" />
                      <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] relative shrink-0 text-[#a2a2a2] text-xs tracking-[0.12px]">
                        All Currencies
                      </p>
                      <img src={arrowDown} className="size-5 shrink-0" />
                    </button>
                    <button className="bg-[#fff] box-border content-stretch flex gap-2 items-center justify-center px-5 py-2.5 relative rounded-full shrink-0 whitespace-nowrap">
                      <img src={exportIcon} className="shrink-0" />
                      <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] relative shrink-0 text-[#000] text-xs tracking-[0.12px]">
                        Export
                      </p>
                      <img src={arrowDownBlack} className="size-5 shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="box-border content-stretch flex flex-col items-start p-2 relative shrink-0 w-full">
                  <div className="border-[#0a0a0a] border-[0.5px] border-solid relative rounded-2xl shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-inherit w-full">
                      {/* Table Header Row */}
                      <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full">
                        <div className="basis-0 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center grow min-h-px min-w-px px-4 py-3 relative shrink-0 rounded-tl-2xl">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Service
                          </p>
                        </div>
                        <div className="basis-0 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center grow min-h-px min-w-px px-4 py-3 relative shrink-0">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Amount
                          </p>
                        </div>
                        <div className="basis-0 bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center grow min-h-px min-w-px px-4 py-3 relative shrink-0">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Balance
                          </p>
                        </div>
                        <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center px-4 py-3 relative shrink-0 w-[140px]">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Date
                          </p>
                        </div>
                        <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center px-4 py-3 relative shrink-0 w-[132px]">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Status
                          </p>
                        </div>
                        <div className="bg-[#313131] box-border content-stretch flex items-center px-4 py-3 relative shrink-0 w-[80px] rounded-tr-2xl">
                          <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                            Actions
                          </p>
                        </div>
                      </div>

                      {/* Table Rows */}
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                        {walletData.transactions.map((transaction, index) => {
                          const statusStyles = getStatusStyles(
                            transaction.status
                          );
                          const isEvenRow = index % 2 === 1;
                          return (
                            <div
                              key={index}
                              className={`${
                                isEvenRow ? "bg-[rgba(10,10,10,0.2)]" : ""
                              } border-[#0a0a0a] border-b-[0.5px] border-solid box-border content-stretch flex h-10 items-start relative shrink-0 w-full`}
                            >
                              <div className="basis-0 border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center grow min-h-10 min-w-px px-4 py-2 relative shrink-0">
                                <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                  {transaction.service}
                                </p>
                              </div>
                              <div className="basis-0 border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center grow min-h-10 min-w-px px-4 py-2 relative shrink-0">
                                <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                  {transaction.amount}
                                </p>
                              </div>
                              <div className="basis-0 border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center grow min-h-10 min-w-px px-4 py-2 relative shrink-0">
                                <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                  {transaction.balance}
                                </p>
                              </div>
                              <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[140px]">
                                <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                                  {transaction.date}
                                </p>
                              </div>
                              <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[132px]">
                                <div
                                  className={`${statusStyles.bg} ${statusStyles.border} border-[0.5px] border-solid box-border content-stretch flex gap-1 items-center justify-center px-3 py-[2px] relative rounded-full shrink-0`}
                                >
                                  <p
                                    className={`font-['Nunito',sans-serif] font-medium leading-[19.2px] overflow-ellipsis overflow-hidden relative shrink-0 text-xs ${statusStyles.text} text-nowrap tracking-[0.48px]`}
                                  >
                                    {transaction.status}
                                  </p>
                                </div>
                              </div>
                              <div className="box-border content-stretch flex items-center justify-center min-h-10 px-4 py-2 relative shrink-0 w-[80px]">
                                <button
                                  aria-label="View receipt"
                                  onClick={() => {
                                    setReceiptData({
                                      service: transaction.service,
                                      amount: transaction.amount,
                                      date: transaction.date,
                                      time: transaction.time,
                                      fee: transaction.fee,
                                      openingBalance:
                                        transaction.openingBalance,
                                      closingBalance: transaction.balance,
                                      referenceId: transaction.referenceId,
                                      status: transaction.status,
                                    });
                                    setShowReceipt(true);
                                  }}
                                >
                                  <svg
                                    className="relative shrink-0 size-5 cursor-pointer"
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
                        })}
                      </div>

                      {/* Pagination */}
                      <div className="box-border content-stretch flex gap-6 items-center px-0 py-4 relative shrink-0 w-full">
                        <div className="basis-0 box-border content-stretch flex grow items-center min-h-px min-w-px px-4 py-0 relative shrink-0">
                          <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] relative shrink-0 text-[#494949] text-xs tracking-[0.48px]">
                            Showing 09 of 127 Wallets
                          </p>
                        </div>
                        <div className="box-border content-stretch flex gap-4 items-center justify-end px-4 py-0 relative shrink-0">
                          <button
                            disabled
                            className="border-[#494949] border-[1px] border-solid opacity-30 relative rounded-full shrink-0 px-4 py-2"
                          >
                            <p className="font-['Nunito',sans-serif] font-normal leading-[14.4px] relative shrink-0 text-[#494949] text-xs tracking-[0.12px]">
                              Previous
                            </p>
                          </button>
                          <div className="content-stretch flex font-['Nunito',sans-serif] font-medium gap-2 items-center leading-[19.2px] relative shrink-0 text-xs text-nowrap tracking-[0.48px]">
                            <p className="relative shrink-0 text-[#f7f7f7]">
                              01
                            </p>
                            <p className="relative shrink-0 text-[#494949]">
                              of
                            </p>
                            <p className="relative shrink-0 text-[#494949]">
                              12
                            </p>
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
