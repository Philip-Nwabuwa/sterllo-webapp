import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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
import { useMemo, useState } from "react";

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

  const [searchInput, setSearchInput] = useState(""); // Input field value
  const [searchTerm, setSearchTerm] = useState(""); // Actual search term for API
  const [type, setType] = useState<"PERSONAL" | "BUSINESS" | "">("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE" | "CLOSED" | "">(
    ""
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);

  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showLimitDropdown, setShowLimitDropdown] = useState(false);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    // Search term can be used for email, reference, or phone
    if (searchTerm) {
      // Try to determine what type of search term it is
      if (searchTerm.includes("@")) {
        params.append("email_address", searchTerm);
      } else if (/^\+?\d+$/.test(searchTerm)) {
        params.append("phone_number", searchTerm);
      } else {
        params.append("reference", searchTerm);
      }
    }

    if (type) params.append("type", type);
    if (status) params.append("status", status);
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString());

    return params.toString();
  }, [searchTerm, type, status, startDate, endDate, limit, page]);

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

  const handleFilterChange = () => {
    setPage(1);
  };

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
  const totalPages = Math.ceil(total / limit);

  // Map API data to component format
  const CUSTOMERS_DATA = customers.map((customer: any) => ({
    id: customer.id,
    flag: [customer.nationality?.flag],
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    status: customer.status,
    pnd: customer.pnd,
    dateCreated: customer.dateCreated,
    kycStatus: customer.kycStatus,
    reference: customer.reference,
    meta: customer.meta,
  }));

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

      {/* Table Wrapper */}
      <div className="px-6 mt-6">
        <div className="bg-[#181818] flex flex-col rounded-3xl">
          {/* Header Row */}
          <div className="border-[var(--colors\/grey\/900,#313131)] border-b-[0.5px] flex items-center justify-between gap-6 p-4">
            <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px]">
              All Customers
            </p>
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
              <div className="bg-[#181818] border border-[#717171] flex gap-2 items-center p-2 rounded-xl">
                <button
                  type="submit"
                  className="size-5 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img alt="Search" className="size-5" src={searchIcon} />
                </button>
                <input
                  type="text"
                  placeholder="Search by email, phone, or reference... (Press Enter)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="bg-transparent font-['Nunito',sans-serif] font-normal leading-[22.4px] outline-none relative text-sm text-[#a2a2a2] tracking-[-0.28px] w-full"
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
              <div className="relative">
                <button
                  onClick={() => setShowDateFilter(!showDateFilter)}
                  className="bg-[#494949] flex gap-2 items-center justify-center px-5 py-2.5 rounded-full whitespace-nowrap"
                >
                  <img src={filterIcon} className="size-5" />
                  <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] text-[#a2a2a2] text-xs tracking-[0.12px]">
                    Date {(startDate || endDate) && "✓"}
                  </p>
                  <img src={arrowDown} className="size-5" />
                </button>
                {showDateFilter && (
                  <div className="absolute top-full mt-2 right-0 bg-[#313131] border border-[#494949] rounded-xl p-4 z-10 min-w-[280px]">
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-xs text-[#a2a2a2] mb-1 block">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            handleFilterChange();
                          }}
                          className="bg-[#181818] border border-[#717171] text-[#f7f7f7] px-3 py-2 rounded-lg w-full text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#a2a2a2] mb-1 block">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => {
                            setEndDate(e.target.value);
                            handleFilterChange();
                          }}
                          className="bg-[#181818] border border-[#717171] text-[#f7f7f7] px-3 py-2 rounded-lg w-full text-sm"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setStartDate("");
                          setEndDate("");
                          setShowDateFilter(false);
                          handleFilterChange();
                        }}
                        className="text-xs text-[#a2a2a2] hover:text-[#f7f7f7] mt-2"
                      >
                        Clear Dates
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowStatusFilter(!showStatusFilter)}
                  className="bg-[#494949] flex gap-2 items-center justify-center px-5 py-2.5 rounded-full whitespace-nowrap"
                >
                  <img src={filterIcon} className="size-5" />
                  <p className="font-['Nunito',sans-serif] font-semibold leading-[14.4px] text-[#a2a2a2] text-xs tracking-[0.12px]">
                    Filter {(type || status) && "✓"}
                  </p>
                  <img src={arrowDown} className="size-5" />
                </button>
                {showStatusFilter && (
                  <div className="absolute top-full mt-2 right-0 bg-[#313131] border border-[#494949] rounded-xl p-4 z-10 min-w-[200px]">
                    <div className="flex flex-col gap-3">
                      {/* Type Filter */}
                      <div>
                        <p className="text-xs text-[#a2a2a2] mb-2">Type</p>
                        <select
                          value={type}
                          onChange={(e) => {
                            setType(e.target.value as any);
                            handleFilterChange();
                          }}
                          className="bg-[#181818] border border-[#717171] text-[#f7f7f7] px-3 py-2 rounded-lg w-full text-sm"
                        >
                          <option value="">All Types</option>
                          <option value="PERSONAL">Personal</option>
                          <option value="BUSINESS">Business</option>
                        </select>
                      </div>

                      {/* Status Filter */}
                      <div>
                        <p className="text-xs text-[#a2a2a2] mb-2">Status</p>
                        <select
                          value={status}
                          onChange={(e) => {
                            setStatus(e.target.value as any);
                            handleFilterChange();
                          }}
                          className="bg-[#181818] border border-[#717171] text-[#f7f7f7] px-3 py-2 rounded-lg w-full text-sm"
                        >
                          <option value="">All Statuses</option>
                          <option value="Active">ACTIVE</option>
                          <option value="Inactive">INACTIVE</option>
                          <option value="Closed">CLOSED</option>
                        </select>
                      </div>
                      <button
                        onClick={() => {
                          setType("");
                          setStatus("");
                          setShowStatusFilter(false);
                          handleFilterChange();
                        }}
                        className="text-xs text-[#a2a2a2] hover:text-[#f7f7f7] mt-2"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] w-[120px]"
                  />
                  <ColumnHeader
                    label="Date Created"
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] grow"
                  />
                  <ColumnHeader
                    label="PND"
                    className="bg-[var(--colors\/grey\/900,#313131)] border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] w-[80px]"
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

                {/* Customer rows */}
                {isLoading ? (
                  <div className="border-t border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center justify-center py-16">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00c7be] mb-4"></div>
                      <p className="font-['Nunito',sans-serif] font-normal leading-[22.4px] text-[#a2a2a2] text-sm">
                        Loading customers...
                      </p>
                    </div>
                  </div>
                ) : CUSTOMERS_DATA.length === 0 ? (
                  <div className="border-t border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center justify-center py-16">
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
                  CUSTOMERS_DATA.map((r: any, i: number) => {
                    const statusStyles = getStatusStyles(r.status);
                    const kycStyles = getKycStyles(r.kycStatus);

                    return (
                      <div
                        key={r.id || i}
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
                              to: `/customers/${r.reference || r.id}` as any,
                              state: {
                                ...r,
                                customerId: r.reference || r.id,
                              } as any,
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
                        <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center min-h-10 px-4 py-2 w-[120px]">
                          <p className="font-[family-name:var(--body\/small\/family,'Nunito:Regular',sans-serif)] font-[var(--body\/small\/weight,400)] leading-[22.4px] text-[14px] text-[color:var(--colors\/grey\/600,#a2a2a2)] tracking-[-0.28px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {r.phone}
                          </p>
                        </div>
                        <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] box-border flex items-center min-h-10 px-4 py-2 grow gap-1 text-[14px] text-[color:var(--colors\/grey\/600,#a2a2a2)]">
                          <p>{r.dateCreated}</p>
                        </div>
                        <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center justify-center min-h-10 px-4 py-2 w-[80px]">
                          <p className="font-[family-name:var(--body\/small\/family,'Nunito:Regular',sans-serif)] font-[var(--body\/small\/weight,400)] leading-[22.4px] text-[14px] text-[color:var(--colors\/grey\/600,#a2a2a2)]">
                            {r.pnd ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center min-h-10 px-4 py-2 w-[124px]">
                          <div
                            className={`${statusStyles.className} flex gap-1 items-center justify-center px-3 py-0.5 rounded-full min-w-[80px]`}
                          >
                            <p className="font-[family-name:var(--body\/caption\/family,'Nunito:Medium',sans-serif)] font-[var(--body\/caption\/weight,500)] leading-[19.2px] text-[12px] tracking-[0.48px]">
                              {statusStyles.text}
                            </p>
                          </div>
                        </div>
                        <div className="border-r-[0.5px] border-[var(--colors\/grey\/1000,#0a0a0a)] flex items-center min-h-10 px-4 py-2 w-[140px]">
                          <div
                            className={`${kycStyles.className} flex gap-1 items-center justify-center px-3 py-0.5 rounded-full min-w-[80px]`}
                          >
                            <p className="font-[family-name:var(--body\/caption\/family,'Nunito:Medium',sans-serif)] font-[var(--body\/caption\/weight,500)] leading-[19.2px] text-[12px] tracking-[0.48px]">
                              {kycStyles.text}
                            </p>
                          </div>
                        </div>
                        <button
                          aria-label="View customer"
                          onClick={() =>
                            navigate({
                              to: `/customers/${r.reference || r.id}` as any,
                              state: {
                                ...r,
                                customerId: r.reference || r.id,
                              } as any,
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
                  })
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between gap-6 px-4 py-2">
                  <p className="font-[family-name:var(--body\/caption\/family,'Nunito:Medium',sans-serif)] font-[var(--body\/caption\/weight,500)] leading-[19.2px] text-[color:var(--colors\/grey\/800,#494949)] text-[length:var(--body\/caption\/size,12px)] tracking-[0.48px]">
                    Showing {CUSTOMERS_DATA.length} of {total} Customers
                  </p>
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
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className={`border border-[var(--colors\/grey\/800,#494949)] rounded-full ${
                        page === 1 ? "opacity-30" : ""
                      }`}
                    >
                      <div className="flex gap-2 items-center justify-center overflow-clip px-4 py-2 rounded-[inherit]">
                        <p className="font-['Nunito',sans-serif] leading-[14.4px] text-[color:var(--colors\/grey\/800,#494949)] text-[12px] tracking-[0.12px]">
                          Previous
                        </p>
                      </div>
                    </button>
                    <div className="flex font-[family-name:var(--body\/caption\/family,'Nunito:Medium',sans-serif)] font-[var(--body\/caption\/weight,500)] gap-1 items-center text-[length:var(--body\/caption\/size,12px)] tracking-[0.48px]">
                      <p className="text-[color:var(--colors\/grey\/100,#f7f7f7)]">
                        {page}
                      </p>
                      <p className="text-[color:var(--colors\/grey\/800,#494949)]">
                        of
                      </p>
                      <p className="text-[color:var(--colors\/grey\/800,#494949)]">
                        {totalPages || 1}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page >= totalPages}
                      className={`border border-[var(--colors\/grey\/800,#494949)] rounded-full ${
                        page >= totalPages ? "opacity-30" : ""
                      }`}
                    >
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
