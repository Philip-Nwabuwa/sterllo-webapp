import { useNavigate, useLocation } from "@tanstack/react-router";
import { Route } from "@/routes/_authenticated/customers.$id";

import avatarImage from "../assets/images/avatar.png";
import penIcon from "../assets/icons/pen-icon.svg";
import NigeriaIcon from "../assets/icons/flags/NGN.svg";

type CustomerRow = {
  name: string;
  email: string;
  phone: string;
  balance: string;
  wallets: string;
  statusClass: string;
  statusText: string;
  kycClass: string;
  kycText: string;
};

export default function CustomerDetail() {
  const navigate = useNavigate();
  const params = Route.useParams();
  const id = params.id;
  const location = useLocation();
  const state = (location.state || {}) as Partial<CustomerRow> & {
    customerId?: string;
  };

  const customer: CustomerRow | null =
    state && state.name
      ? {
          name: state.name!,
          email: state.email || "",
          phone: state.phone || "",
          balance: state.balance || "",
          wallets: state.wallets || "0",
          statusClass: state.statusClass || "bg-[#313131] border-[#494949]",
          statusText: state.statusText || "inactive",
          kycClass: state.kycClass || "bg-[#313131] border-[#494949]",
          kycText: state.kycText || "Pending",
        }
      : null;

  if (!customer) {
    return (
      <div className="bg-neutral-950 relative size-full min-h-screen flex items-center justify-center">
        <div className="content-stretch flex flex-col gap-4 items-center">
          <p className="font-['Nunito',sans-serif] font-semibold leading-[28.8px] text-[#f7f7f7] text-2xl">
            Customer not found
          </p>
          <button
            onClick={() => navigate({ to: "/customers" })}
            className="bg-[#bad133] box-border content-stretch flex gap-2 items-center justify-center px-5 py-3 rounded-full"
          >
            <p className="font-['Nunito',sans-serif] font-normal leading-[16.8px] text-[#121505] text-sm">
              Back to Customers
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-neutral-950 relative size-full min-h-screen pb-10"
      data-name="CustomerDetailPage"
    >
      {/* Page Header */}
      <div className="bg-[#0a0a0a] flex gap-4 items-end px-6 py-6 w-full">
        <div className="flex flex-col gap-4 flex-1">
          {/* Breadcrumb */}
          <div className="bg-[#181818] border-[#313131] border-[0.5px] border-solid flex gap-3 items-center px-4 py-1 rounded-full w-fit">
            <button
              onClick={() => navigate({ to: "/customers" })}
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
                Customers
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
                Profile Details
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 items-center">
          <button className="bg-[#bad133] flex gap-2 items-center justify-center px-5 py-4 rounded-full">
            <img src={penIcon} alt="edit" className="size-4" />
            <p className="font-['Nunito',sans-serif] font-semibold leading-[16.8px] text-[#121505] text-sm text-nowrap tracking-[0.14px]">
              Edit Customer
            </p>
          </button>
          <button className="bg-[#55160C59] border-[#7A271A] border-[1px] border-solid flex gap-2 items-center justify-center px-5 py-4 rounded-full">
            <p className="font-['Nunito',sans-serif] font-normal leading-[16.8px] text-[#F04438] text-sm text-nowrap tracking-[0.14px]">
              Suspend Customer
            </p>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-[472px_1fr] gap-4">
          {/* Left Column: Profile Card */}
          <div className="bg-gradient-to-b from-[#121505] to-[#181818] flex flex-col items-center justify-between p-4 rounded-3xl">
            <div className="flex flex-col gap-4 items-center w-[226px]">
              <div className="border-[#c0c0c0] border rounded-full size-[120px] overflow-hidden bg-[#313131]">
                <img src={avatarImage} alt="avatar" className="size-full" />
              </div>
              <div className="flex flex-col gap-3 items-start w-full">
                <div className="flex flex-col gap-1 items-center text-center w-full">
                  <p className="font-['Nunito',sans-serif] font-semibold leading-[28px] text-[#c0c0c0] text-[20px] tracking-[0.2px] w-full">
                    {customer.name.toUpperCase()}
                  </p>
                  <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#717171] text-[14px] w-full">
                    CST-{id?.toString().padStart(4, "0")}
                  </p>
                </div>
                <div className="bg-[#f7f7f7] flex items-center justify-center px-4 py-2 rounded-full w-full">
                  <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[#181818] text-[12px] tracking-[0.48px]">
                    NUMBER OF WALLETS: {customer.wallets}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center w-full mt-10">
              <div className="bg-[rgba(10,10,10,0.2)] border-[#313131] border flex items-center justify-between gap-4 p-3 rounded-lg w-full">
                <div>
                  <p className="font-['Nunito',sans-serif] font-medium leading-4 uppercase text-[#717171] text-[10px] tracking-[0.5px]">
                    Total Balance
                  </p>
                  <p className="font-['Nunito',sans-serif] font-semibold leading-6 text-[#c0c0c0] text-[16px]">
                    {customer.balance}
                  </p>
                </div>
                <div className="bg-[#181818] border-[#313131] border flex items-center gap-2 px-1 py-1 rounded-full">
                  <img src={NigeriaIcon} alt="Nigeria" className="size-5" />
                  <svg viewBox="0 0 18 18" className="size-[18px]">
                    <path
                      d="M4.5 7.5l4.5 4.5 4.5-4.5"
                      stroke="#717171"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="bg-[rgba(10,10,10,0.2)] border-[#313131] border rounded-lg w-full">
                <div className="border-b border-[#313131] p-3">
                  <p className="font-['Nunito',sans-serif] font-medium leading-4 uppercase text-[#717171] text-[10px] tracking-[0.5px]">
                    Basic Details
                  </p>
                </div>
                <div className="border-b border-[#313131] p-3">
                  <p className="font-['Nunito',sans-serif] font-medium leading-4 uppercase text-[#717171] text-[10px]">
                    email address
                  </p>
                  <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#c0c0c0] text-[14px]">
                    {customer.email}
                  </p>
                </div>
                <div className="border-b border-[#313131] p-3">
                  <p className="font-['Nunito',sans-serif] font-medium leading-4 uppercase text-[#717171] text-[10px]">
                    phone number
                  </p>
                  <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#c0c0c0] text-[14px]">
                    {customer.phone}
                  </p>
                </div>
                <div className="p-3">
                  <p className="font-['Nunito',sans-serif] font-medium leading-4 uppercase text-[#717171] text-[10px]">
                    gender
                  </p>
                  <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#c0c0c0] text-[14px]">
                    Female
                  </p>
                </div>
              </div>

              <div className="bg-[rgba(10,10,10,0.2)] border-[#313131] border rounded-lg w-full">
                <div className="border-b border-[#313131] p-3">
                  <p className="font-['Nunito',sans-serif] font-medium leading-4 uppercase text-[#717171] text-[10px] tracking-[0.5px]">
                    Status
                  </p>
                </div>
                <div className="border-b border-[#313131] p-3 flex justify-between items-center gap-2">
                  <p className="font-['Nunito',sans-serif] font-medium leading-4 uppercase text-[#717171] text-[10px]">
                    Account Status
                  </p>
                  <div
                    className={`${customer.statusClass} border flex items-center justify-center px-3 py-[2px] rounded-full min-w-[80px]`}
                  >
                    <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[12px] text-[#17b26a] tracking-[0.48px]">
                      {customer.statusText}
                    </p>
                  </div>
                </div>
                <div className="p-3 flex justify-between items-center gap-2">
                  <p className="font-['Nunito',sans-serif] font-medium leading-4 uppercase text-[#717171] text-[10px]">
                    KYC Status
                  </p>
                  <div
                    className={`${customer.kycClass} border flex items-center justify-center px-3 py-[2px] rounded-full min-w-[80px]`}
                  >
                    <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[12px] text-[#17b26a] tracking-[0.48px]">
                      {customer.kycText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Transactions placeholder & Activity */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#181818] flex flex-col rounded-3xl">
              <div className="border-b border-[#313131] flex gap-6 items-center justify-between px-6 py-4">
                <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base">
                  Recent Transactions
                </p>
                <button className="border border-[#c0c0c0] rounded-full px-5 py-3">
                  <p className="font-['Nunito',sans-serif] font-semibold text-[#c0c0c0] text-[12px]">
                    See All
                  </p>
                </button>
              </div>
              <div className="p-6">
                <div className="border border-[#0a0a0a] rounded-2xl">
                  <div className="flex">
                    <div className="bg-[#313131] flex-1 px-4 py-3">
                      <p className="text-[#a2a2a2] text-sm">Withdrawal</p>
                    </div>
                    <div className="bg-[#313131] flex-1 px-4 py-3">
                      <p className="text-[#a2a2a2] text-sm">Amount</p>
                    </div>
                    <div className="bg-[#313131] w-[140px] px-4 py-3">
                      <p className="text-[#a2a2a2] text-sm">Date</p>
                    </div>
                    <div className="bg-[#313131] w-[132px] px-4 py-3 rounded-tr-2xl">
                      <p className="text-[#a2a2a2] text-sm">Status</p>
                    </div>
                  </div>
                  <div className="border-t border-[#0a0a0a] h-10 flex items-center px-4">
                    <p className="text-[#a2a2a2] text-sm">
                      No transactions yet.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#181818] rounded-3xl">
                <div className="border-b border-[#313131] p-4">
                  <p className="font-['Nunito',sans-serif] text-[#f7f7f7] text-base">
                    Statistics
                  </p>
                </div>
                <div className="p-2">
                  <div className="border-b border-[#313131] p-2 flex justify-between">
                    <p className="text-[#717171] text-sm">Total Spent</p>
                    <p className="text-[#f97066] text-sm font-bold">€0.00</p>
                  </div>
                  <div className="border-b border-[#313131] p-2 flex justify-between">
                    <p className="text-[#717171] text-sm">Total Received</p>
                    <p className="text-[#528bff] text-sm font-bold">€0.00</p>
                  </div>
                  <div className="border-b border-[#313131] p-2 flex justify-between">
                    <p className="text-[#717171] text-sm">
                      Avg. Transaction Amount
                    </p>
                    <p className="text-[#c0c0c0] text-sm font-bold">€0.00</p>
                  </div>
                  <div className="p-2 flex justify-between">
                    <p className="text-[#717171] text-sm">Success Rate</p>
                    <p className="text-[#c0c0c0] text-sm font-bold">—</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#181818] rounded-3xl">
                <div className="border-b border-[#313131] p-4">
                  <p className="font-['Nunito',sans-serif] text-[#f7f7f7] text-base">
                    Recent Activity
                  </p>
                </div>
                <div className="p-4 text-[#a2a2a2] text-sm">
                  No recent activity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
