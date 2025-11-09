import { useNavigate } from "@tanstack/react-router";
import flagEUR from "../assets/icons/flags/EUR.svg";
import MetricCard from "./dashboard/MetricCard";
import exportIcon from "../assets/icons/export-icon.svg";
import arrowDown from "../assets/icons/arrow-down-icon.svg";
import filterIcon from "../assets/icons/filter.svg";
import searchIcon from "../assets/icons/search.svg";
import arrowDownBlack from "../assets/icons/arrow-down-black-icon.svg";
import moreOptionsIcon from "../assets/icons/more-options-icon.svg";
import totalCustomersIcon from "../assets/icons/total-customer-icon.svg";
import activeCustomersIcon from "../assets/icons/active-icon.svg";
import newCustomersIcon from "../assets/icons/new-customer-icon.svg";

// Mock API response data
const CUSTOMERS_DATA = [
  {
    flag: [flagEUR],
    name: "Chidi Uzoma",
    email: "chidi.u@example.com",
    phone: "+234 802 234 5678",
    balance: "€ 450,500.00",
    wallets: "37",
    status: "active",
    kycStatus: "verified",
  },
  {
    flag: [flagEUR],
    name: "Amara Nwachukwu",
    email: "amara.n@example.com",
    phone: "+234 909 987 6543",
    balance: "€ 150,250.00",
    wallets: "22",
    status: "active",
    kycStatus: "verified",
  },
  {
    flag: [flagEUR],
    name: "Amara Nwachukwu",
    email: "amara.n@example.com",
    phone: "+234 909 987 6543",
    balance: "€ 150,250.00",
    wallets: "22",
    status: "active",
    kycStatus: "verified",
  },
  {
    flag: [flagEUR],
    name: "Emeka Okafor",
    email: "emeka.o@example.com",
    phone: "+234 805 567 8901",
    balance: "€ 100,250.00",
    wallets: "18",
    status: "inactive",
    kycStatus: "pending",
  },
];

// Helper functions to get styling based on status
const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return {
        className: "bg-[#053321] border-[#17B26A]",
        text: "Active",
      };
    case "inactive":
      return {
        className: "bg-[#313131] border-[#494949]",
        text: "Inactive",
      };
    default:
      return {
        className: "bg-[] border-[]",
        text: status,
      };
  }
};

const getKycStyles = (kycStatus: string) => {
  switch (kycStatus.toLowerCase()) {
    case "verified":
      return {
        className: "bg-[#053321] border-[#17B26A]",
        text: "Verified",
      };
    case "pending":
      return {
        className: "bg-[#93370D] border-[#7A2E0E]",
        text: "Pending",
      };
    default:
      return {
        className: "bg-[] border-[]",
        text: kycStatus,
      };
  }
};

type ColumnHeaderProps = {
  className?: string;
  label?: string;
};

function ColumnHeader({
  className,
  label = "Column header",
}: ColumnHeaderProps) {
  return (
    <div className={className} data-name="ColumnHeader">
      <div className="box-border content-stretch flex items-center px-4 py-3 relative">
        <p className="font-[family-name:var(--body\/small\/family,'Nunito:Regular',sans-serif)] font-[var(--body\/small\/weight,400)] leading-[22.4px] relative shrink-0 text-[color:var(--colors\/grey\/600,#a2a2a2)] text-[length:var(--body\/small\/size,14px)] tracking-[-0.28px] whitespace-pre">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function Customers() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-neutral-950 relative size-full min-h-screen"
      data-name="CustomersPage"
    >
      {/* Header Container */}
      <div className="flex gap-4 items-end p-6">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <p className="font-[family-name:var(--headings\/subheading-1\/family,'Nunito:SemiBold',sans-serif)] font-[var(--headings\/subheading-1-bold\/weight,600)] leading-[28.8px] text-[color:var(--colors\/grey\/100,#f7f7f7)] text-[length:var(--headings\/subheading-1\/size,24px)] tracking-[0.24px]">
              Customers
            </p>
            <p className="font-[family-name:var(--body\/base\/family,'Nunito:Regular',sans-serif)] font-[var(--body\/base\/weight,400)] leading-[25.6px] text-[color:var(--colors\/grey\/600,#a2a2a2)] text-[length:var(--body\/base\/size,16px)] tracking-[0.024px]">
              Manage and monitor all customer accounts and their activities.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6 px-6">
        <MetricCard
          icon={totalCustomersIcon}
          iconBg="bg-[#00c7be]"
          iconBorder="border-[#00e2d8]"
          title="Total Customers"
          value="127"
        />
        <MetricCard
          icon={activeCustomersIcon}
          iconBg="bg-[#0040c1]"
          iconBorder="border-[#004eeb]"
          title="Active Customers"
          value="112"
        />
        <MetricCard
          icon={activeCustomersIcon}
          iconBg="bg-[#085d3a]"
          iconBorder="border-[#067647]"
          title="Inactive Customers"
          value="109"
        />
        <MetricCard
          icon={newCustomersIcon}
          iconBg="bg-[#93370d]"
          iconBorder="border-[#b54708]"
          title="New Customers"
          value="12"
        />
      </div>

      {/* Table Wrapper */}
      <div className="px-6 mt-6">
        <div className="bg-[#181818] flex flex-col rounded-3xl">
          {/* Header Row */}
          <div className="border-[var(--colors\/grey\/900,#313131)] border-b-[0.5px] flex items-center justify-between gap-6 p-4">
            <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px]">
              All Customers
            </p>
            <div className="flex-1 max-w-md">
              <div className="bg-[#181818] border border-[#717171] flex gap-2 items-center p-2 rounded-xl">
                <img alt="" className="size-5" src={searchIcon} />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="bg-transparent font-['Nunito',sans-serif] font-normal leading-[22.4px] outline-none relative text-sm text-[#a2a2a2] tracking-[-0.28px] w-full"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
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
          <div className="box-border flex flex-col p-2 w-full">
            <div className="border border-[var(--colors\/grey\/1000,#0a0a0a)] rounded-2xl w-full">
              <div className="flex flex-col overflow-hidden rounded-[inherit] w-full">
                <div className="flex items-start w-full">
                  <div className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] self-stretch" />
                  <ColumnHeader
                    label=""
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] w-[52px] h-[46px]"
                  />
                  <ColumnHeader
                    label="Customer Name"
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] w-[252px]"
                  />
                  <ColumnHeader
                    label="Email Address"
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] w-[284px]"
                  />
                  <ColumnHeader
                    label="Phone Number"
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] w-[184px]"
                  />
                  <ColumnHeader
                    label="Balance"
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] grow"
                  />
                  <ColumnHeader
                    label="No. of Wallets"
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] w-[112px]"
                  />
                  <ColumnHeader
                    label="Status"
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] w-[124px]"
                  />
                  <ColumnHeader
                    label="KYC Status"
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] w-[140px]"
                  />
                  <ColumnHeader
                    label="Actions"
                    className="bg-[var(--colors\/grey\/900,#313131)] w-[80px]"
                  />
                </div>

                {/* Sample rows (static to mirror the design) */}
                {CUSTOMERS_DATA.map((r, i) => {
                  const statusStyles = getStatusStyles(r.status);
                  const kycStyles = getKycStyles(r.kycStatus);

                  return (
                    <div
                      key={i}
                      className="border-t border-[var(--colors\/grey\/1000,#0a0a0a)] flex h-10 items-start"
                    >
                      <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center min-h-10 px-4 py-2">
                        <div className="size-5 overflow-hidden">
                          <img alt="" className="" src={r.flag[0]} />
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          navigate({
                            to: `/customers/${i + 1}` as any,
                            state: { ...r, customerId: String(i + 1) } as any,
                          })
                        }
                        className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center min-h-10 px-4 py-2 w-[252px] text-left hover:bg-[rgba(10,10,10,0.2)] transition-colors"
                      >
                        <p className="font-[family-name:var(--body\/small\/family,'Nunito:Regular',sans-serif)] font-[var(--body\/small\/weight,400)] leading-[22.4px] text-[14px] text-[color:var(--colors\/grey\/600,#a2a2a2)] tracking-[-0.28px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {r.name}
                        </p>
                      </button>
                      <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center min-h-10 px-4 py-2 w-[284px]">
                        <p className="font-[family-name:var(--body\/small\/family,'Nunito:Regular',sans-serif)] font-[var(--body\/small\/weight,400)] leading-[22.4px] text-[14px] text-[color:var(--colors\/grey\/600,#a2a2a2)] tracking-[-0.28px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {r.email}
                        </p>
                      </div>
                      <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center min-h-10 px-4 py-2 w-[184px]">
                        <p className="font-[family-name:var(--body\/small\/family,'Nunito:Regular',sans-serif)] font-[var(--body\/small\/weight,400)] leading-[22.4px] text-[14px] text-[color:var(--colors\/grey\/600,#a2a2a2)] tracking-[-0.28px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {r.phone}
                        </p>
                      </div>
                      <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] box-border flex items-center min-h-10 px-4 py-2 grow gap-1 text-[14px] text-[color:var(--colors\/grey\/600,#a2a2a2)]">
                        <p>€</p>
                        <p>{r.balance.split(" ")[1]}</p>
                      </div>
                      <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center justify-center min-h-10 px-4 py-2 w-[112px]">
                        <p className="font-[family-name:var(--body\/small\/family,'Nunito:Regular',sans-serif)] font-[var(--body\/small\/weight,400)] leading-[22.4px] text-[14px] text-[color:var(--colors\/grey\/600,#a2a2a2)]">
                          {r.wallets}
                        </p>
                      </div>
                      <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center min-h-10 px-4 py-2 w-[124px]">
                        <div
                          className={`${statusStyles.className} flex gap-1 items-center justify-center px-3 py-0.5 rounded-full min-w-[80px]`}
                        >
                          <p className="font-[family-name:var(--body\/caption\/family,'Nunito:Medium',sans-serif)] font-[var(--body\/caption\/weight,500)] leading-[19.2px] text-[12px] text-[color:var(--colors\/green\/500,#17b26a)] tracking-[0.48px]">
                            {statusStyles.text}
                          </p>
                        </div>
                      </div>
                      <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center min-h-10 px-4 py-2 w-[140px]">
                        <div
                          className={`${kycStyles.className} flex gap-1 items-center justify-center px-3 py-0.5 rounded-full min-w-[80px]`}
                        >
                          <p className="font-[family-name:var(--body\/caption\/family,'Nunito:Medium',sans-serif)] font-[var(--body\/caption\/weight,500)] leading-[19.2px] text-[12px] text-[color:var(--colors\/green\/500,#17b26a)] tracking-[0.48px]">
                            {kycStyles.text}
                          </p>
                        </div>
                      </div>
                      <button
                        aria-label="View customer"
                        onClick={() =>
                          navigate({
                            to: `/customers/${i + 1}` as any,
                            state: { ...r, customerId: String(i + 1) } as any,
                          })
                        }
                        className="flex items-center justify-center min-h-10 px-4 py-2 w-[80px] hover:bg-[rgba(10,10,10,0.2)] transition-colors"
                      >
                        <div className="size-5 opacity-60 cursor-pointer">
                          <img
                            alt=""
                            className="block max-w-none size-full"
                            src={moreOptionsIcon}
                          />
                        </div>
                      </button>
                    </div>
                  );
                })}

                {/* Pagination */}
                <div className="flex items-center justify-between gap-6 px-4 py-2">
                  <p className="font-[family-name:var(--body\/caption\/family,'Nunito:Medium',sans-serif)] font-[var(--body\/caption\/weight,500)] leading-[19.2px] text-[color:var(--colors\/grey\/800,#494949)] text-[length:var(--body\/caption\/size,12px)] tracking-[0.48px]">
                    Showing 11 of 127 Customers
                  </p>
                  <div className="flex gap-4 items-center">
                    <div className="border border-[var(--colors\/grey\/800,#494949)] opacity-30 rounded-full">
                      <div className="flex gap-2 items-center justify-center overflow-clip px-4 py-2 rounded-[inherit]">
                        <p className="font-['Nunito',sans-serif] leading-[14.4px] text-[color:var(--colors\/grey\/800,#494949)] text-[12px] tracking-[0.12px]">
                          Previous
                        </p>
                      </div>
                    </div>
                    <div className="flex font-[family-name:var(--body\/caption\/family,'Nunito:Medium',sans-serif)] font-[var(--body\/caption\/weight,500)] gap-1 items-center text-[length:var(--body\/caption\/size,12px)] tracking-[0.48px]">
                      <p className="text-[color:var(--colors\/grey\/100,#f7f7f7)]">
                        01
                      </p>
                      <p className="text-[color:var(--colors\/grey\/800,#494949)]">
                        of
                      </p>
                      <p className="text-[color:var(--colors\/grey\/800,#494949)]">
                        12
                      </p>
                    </div>
                    <button className="border border-[var(--colors\/grey\/800,#494949)] rounded-full">
                      <div className="flex gap-2 items-center justify-center overflow-clip px-4 py-2 rounded-[inherit]">
                        <p className="font-['Nunito',sans-serif] leading-[14.4px] text-[color:var(--colors\/grey\/800,#494949)] text-[12px] tracking-[0.12px]">
                          Next
                        </p>
                      </div>
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
