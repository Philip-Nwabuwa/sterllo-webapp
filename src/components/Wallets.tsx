import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

// Reusable Components
import MetricCard from "./dashboard/MetricCard";

// Metric Icons
import totalCustomersIcon from "../assets/icons/total-customer-icon.svg";
import activeCustomersIcon from "../assets/icons/active-icon.svg";
import newCustomersIcon from "../assets/icons/new-customer-icon.svg";
import arrowDown from "../assets/icons/arrow-down-icon.svg";

// Helper functions to get styling based on status
const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return {
        className: "bg-[#053321] border-[#17B26A] text-[#17B26A]",
        text: "Active",
      };
    case "inactive":
      return {
        className: "bg-[#313131] border-[#494949] text-[#FEDF89]",
        text: "Inactive",
      };
    case "closed":
      return {
        className: "bg-[#55160C] border-[#7A271A] text-[#FDA29B]",
        text: "Closed",
      };
    default:
      return {
        className: "bg-[#313131] border-[#494949] text-[#fff]",
        text: status,
      };
  }
};

const getKycStyles = (kycStatus: string) => {
  switch (kycStatus.toLowerCase()) {
    case "verified":
      return {
        className: "bg-[#053321] border-[#17B26A] text-[#17B26A]",
        text: "Verified",
      };
    case "pending":
      return {
        className: "bg-[#93370D] border-[#7A2E0E] text-[#FEDF89]",
        text: "Pending",
      };
    case "rejected":
      return {
        className: "bg-[#55160C] border-[#7A271A] text-[#FDA29B]",
        text: "Rejected",
      };
    default:
      return {
        className: "bg-[#313131] border-[#494949] text-[#fff]",
        text: kycStatus,
      };
  }
};

export default function Wallets() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const [showLimitDropdown, setShowLimitDropdown] = useState(false);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    // Search term can be used for email, reference, or phone
    if (searchTerm) {
      // Try to determine what type of search term it is
      if (searchTerm.includes("@")) {
        params.append("email_address", searchTerm);
      } else if (/^\+?\d+$/.test(searchTerm)) {
        const formattedSearchTerm = searchTerm.replace(/^\+234/, "0");
        params.append("phone_number", formattedSearchTerm);
      } else {
        params.append("reference", searchTerm);
      }
    }

    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString());

    return params.toString();
  }, [searchTerm, limit, page]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["customers", queryString],
    queryFn: async () => {
      // Use full URL for TanStack Start server handlers
      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000";
      const url = `${baseUrl}/api/customers/${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url, {
        credentials: "include", // Include cookies for authentication
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch customers: ${response.status}`
        );
      }
      return response.json();
    },
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setPage(1);
  };

  // Handle error state
  if (error) {
    return (
      <div className="bg-neutral-950 relative size-full min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl font-['Nunito',sans-serif]">
          Error loading customers: {error.message}
        </div>
      </div>
    );
  }

  const customers = data?.data || [];
  const metrics = data?.metrics || {};
  const total = data?.total || 0;

  // Map API data to component format
  const CUSTOMERS_DATA = customers.map((customer: any) => ({
    id: customer.id,
    flag: customer.nationality?.flag,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    status: customer.status,
    pnd: customer.pnd,
    dateCreated: customer.dateCreated,
    kycStatus: customer.kycStatus,
    reference: customer.reference,
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
          icon={totalCustomersIcon}
          iconBg="bg-[#00c7be]"
          iconBorder="border-[#00e2d8]"
          title="Total Customers"
          value={String(metrics.totalCustomers || total)}
        />
        <MetricCard
          icon={activeCustomersIcon}
          iconBg="bg-[#0040c1]"
          iconBorder="border-[#004eeb]"
          title="Active Customers"
          value={String(metrics.activeCustomers || 0)}
        />
        <MetricCard
          icon={activeCustomersIcon}
          iconBg="bg-[#085d3a]"
          iconBorder="border-[#067647]"
          title="Inactive Customers"
          value={String(total - (metrics.activeCustomers || 0))}
        />
        <MetricCard
          icon={newCustomersIcon}
          iconBg="bg-[#93370d]"
          iconBorder="border-[#b54708]"
          title="New Customers"
          value={String(metrics.newCustomers || 0)}
        />
      </div>

      {/* All Wallets Table */}
      <div className="px-6 mt-6">
        <div className="bg-[#181818] flex flex-col rounded-3xl">
          {/* Table Header */}
          <div className="border-[#313131] border-b-[0.5px] border-solid flex items-center justify-between gap-6 p-4">
            <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px]">
              All Customers
            </p>
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
              <div className="bg-[#181818] border-[#717171] border-[0.5px] border-solid flex gap-2 items-center p-4 rounded-xl">
                <button
                  type="submit"
                  className="size-5 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
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
                </button>
                <input
                  type="text"
                  placeholder="Search by email, phone, or reference... (Press Enter)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="bg-transparent font-['Nunito',sans-serif] font-normal flex-1 leading-[22.4px] outline-none text-sm text-[#a2a2a2] tracking-[-0.28px]"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setSearchTerm("");
                      setPage(1);
                    }}
                    className="text-[#a2a2a2] hover:text-[#f7f7f7] text-xs px-2 py-1 rounded hover:bg-[#313131] transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
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
                  Filter
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
                      Email Address
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[140px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Phone Number
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[140px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Date Created
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[80px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      PND
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[124px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Status
                    </p>
                  </div>
                  <div className="bg-[#313131] border-[#0a0a0a] border-r-[0.5px] border-solid flex items-center px-4 py-3 w-[140px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      KYC Status
                    </p>
                  </div>
                  <div className="bg-[#313131] box-border content-stretch flex items-center px-4 py-3 relative shrink-0 w-[80px]">
                    <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#a2a2a2] text-sm tracking-[-0.28px]">
                      Actions
                    </p>
                  </div>
                </div>

                {/* Table Rows */}
                {isLoading ? (
                  <div className="border-t border-[#0a0a0a] flex items-center justify-center py-16">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00c7be] mb-4"></div>
                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm">
                        Loading customers...
                      </p>
                    </div>
                  </div>
                ) : CUSTOMERS_DATA.length === 0 ? (
                  <div className="border-t border-[#0a0a0a] flex items-center justify-center py-16">
                    <div className="text-center">
                      <p className="font-['Nunito',sans-serif] font-semibold leading-[25.6px] text-[#f7f7f7] text-base mb-2">
                        No customers found
                      </p>
                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    {CUSTOMERS_DATA.map((customer: any, index: number) => {
                      const statusStyles = getStatusStyles(customer.status);
                      const kycStyles = getKycStyles(customer.kycStatus);
                      const isEvenRow = index % 2 === 1;
                      return (
                        <div
                          key={customer.id || index}
                          className={`${
                            isEvenRow ? "bg-[rgba(10,10,10,0.2)]" : ""
                          } border-[#0a0a0a] border-b-[0.5px] border-solid box-border content-stretch flex h-10 items-start relative shrink-0 w-full`}
                        >
                          <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0">
                            {customer.flag && (
                              <img
                                src={customer.flag}
                                alt="flag"
                                className="relative shrink-0 size-5"
                              />
                            )}
                          </div>
                          <button
                            onClick={() =>
                              navigate({ to: `/wallets/${customer.reference}` })
                            }
                            className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-start min-h-10 px-4 py-2 relative shrink-0 w-[252px] hover:bg-[rgba(10,10,10,0.2)] transition-colors"
                          >
                            <p className="basis-0 font-['Nunito',sans-serif] font-normal grow leading-[22.4px] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px] hover:text-[#f7f7f7]">
                              {customer.name}
                            </p>
                          </button>
                          <div className="basis-0 border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex grow items-center min-h-10 min-w-px px-4 py-2 relative shrink-0">
                            <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                              {customer.email}
                            </p>
                          </div>
                          <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[140px]">
                            <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                              {customer.phone}
                            </p>
                          </div>
                          <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[140px]">
                            <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] overflow-ellipsis overflow-hidden text-sm text-[#a2a2a2] text-nowrap tracking-[-0.28px]">
                              {customer.dateCreated}
                            </p>
                          </div>
                          <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center justify-center min-h-10 px-4 py-2 relative shrink-0 w-[80px]">
                            <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-sm text-[#a2a2a2]">
                              {customer.pnd ? "Yes" : "No"}
                            </p>
                          </div>
                          <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[124px]">
                            <div
                              className={`${statusStyles.className} border-[0.5px] border-solid box-border content-stretch flex gap-1 items-center justify-center px-3 py-[2px] relative rounded-full shrink-0 min-w-[80px]`}
                            >
                              <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] overflow-ellipsis overflow-hidden relative shrink-0 text-xs text-nowrap tracking-[0.48px]">
                                {statusStyles.text}
                              </p>
                            </div>
                          </div>
                          <div className="border-[#0a0a0a] border-r-[0.5px] border-solid box-border content-stretch flex items-center min-h-10 px-4 py-2 relative shrink-0 w-[140px]">
                            <div
                              className={`${kycStyles.className} border-[0.5px] border-solid box-border content-stretch flex gap-1 items-center justify-center px-3 py-[2px] relative rounded-full shrink-0 min-w-[80px]`}
                            >
                              <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] overflow-ellipsis overflow-hidden relative shrink-0 text-xs text-nowrap tracking-[0.48px]">
                                {kycStyles.text}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              navigate({ to: `/wallets/${customer.id}` })
                            }
                            className="box-border content-stretch flex items-center justify-center min-h-10 px-4 py-2 relative shrink-0 w-[80px] hover:bg-[rgba(10,10,10,0.2)] transition-colors"
                          >
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
                              <circle
                                cx="8"
                                cy="8"
                                r="1.33333"
                                fill="#a2a2a2"
                              />
                              <circle
                                cx="8"
                                cy="12.6667"
                                r="1.33333"
                                fill="#a2a2a2"
                              />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                <div className="box-border content-stretch flex gap-6 items-center px-0 py-2 relative shrink-0 w-full">
                  <div className="basis-0 box-border content-stretch flex grow items-center min-h-px min-w-px px-4 py-3 relative shrink-0">
                    <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] relative shrink-0 text-[#494949] text-xs tracking-[0.48px]">
                      Showing {CUSTOMERS_DATA.length} of {total} Customers
                    </p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowLimitDropdown(!showLimitDropdown)}
                      className="bg-[#494949] flex gap-2 items-center justify-center px-3 py-1.5 rounded-full whitespace-nowrap"
                    >
                      <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] text-[#a2a2a2] text-xs tracking-[0.12px]">
                        {limit} per page
                      </p>
                      <img src={arrowDown} className="size-4" />
                    </button>
                    {showLimitDropdown && (
                      <div className="absolute bottom-full mb-2 left-0 bg-[#313131] border border-[#494949] rounded-lg z-10">
                        {[10, 25, 50, 100].map((value) => (
                          <button
                            key={value}
                            onClick={() => {
                              setLimit(value);
                              setPage(1);
                              setShowLimitDropdown(false);
                            }}
                            className={`px-4 py-2 text-xs w-full text-left hover:bg-[#494949] ${
                              limit === value
                                ? "text-[#f7f7f7]"
                                : "text-[#a2a2a2]"
                            }`}
                          >
                            {value} per page
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="box-border content-stretch flex gap-4 items-center justify-end px-4 py-0 relative shrink-0 w-[277px]">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className={`border-[#494949] border-[1px] border-solid relative rounded-full shrink-0 px-4 py-2 ${
                        page === 1 ? "opacity-30" : "cursor-pointer"
                      }`}
                    >
                      <p className="font-['Nunito',sans-serif] font-normal leading-[14.4px] relative shrink-0 text-[#494949] text-xs tracking-[0.12px]">
                        Previous
                      </p>
                    </button>
                    <div className="content-stretch flex font-['Nunito',sans-serif] font-medium gap-2 items-center leading-[19.2px] relative shrink-0 text-xs text-nowrap tracking-[0.48px]">
                      <p className="relative shrink-0 text-[#f7f7f7]">
                        {String(page).padStart(2, "0")}
                      </p>
                      <p className="relative shrink-0 text-[#494949]">of</p>
                      <p className="relative shrink-0 text-[#494949]">
                        {String(Math.ceil(total / limit) || 1).padStart(2, "0")}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setPage((p) =>
                          Math.min(Math.ceil(total / limit), p + 1)
                        )
                      }
                      disabled={page >= Math.ceil(total / limit)}
                      className={`border-[#494949] border-[1px] border-solid relative rounded-full shrink-0 px-4 py-2 ${
                        page >= Math.ceil(total / limit)
                          ? "opacity-30"
                          : "cursor-pointer"
                      }`}
                    >
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
