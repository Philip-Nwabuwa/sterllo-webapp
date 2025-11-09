import { useQuery } from "@tanstack/react-query";

// Reusable Components
import MetricCard from "./dashboard/MetricCard";
import ActivityItem from "./dashboard/ActivityItem";

// Metric Icons
import activeCustomersIcon from "../assets/icons/active-customers-icon.svg";
import walletsMetricIcon from "../assets/icons/wallets-metric-icon.svg";
import transactionsIcon from "../assets/icons/transactions-icon.svg";
import disputesIcon from "../assets/icons/disputes-icon.svg";
import uptimeIcon from "../assets/icons/uptime-icon.svg";

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

// Activity icon mapping
const activityIconMap: Record<string, { icon: string; iconBg: string }> = {
  wallet: { icon: walletActivityIcon, iconBg: "bg-[#f4f8aa]" },
  dispute_resolved: { icon: disputeActivityIcon, iconBg: "bg-emerald-100" },
  transfer: { icon: transferActivityIcon, iconBg: "bg-[#e3f2fd]" },
  customer: { icon: customerActivityIcon, iconBg: "bg-[#e3f2fd]" },
  dispute_filed: { icon: disputeRedActivityIcon, iconBg: "bg-[#fbe2e2]" },
};

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardMetrics"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/metrics");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard metrics");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="bg-neutral-950 min-h-screen w-full p-6 flex items-center justify-center">
        <div className="text-[#f7f7f7] text-xl font-['Nunito',sans-serif]">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-950 min-h-screen w-full p-6 flex items-center justify-center">
        <div className="text-red-400 text-xl font-['Nunito',sans-serif]">
          Error loading dashboard: {error.message}
        </div>
      </div>
    );
  }

  const metrics = data?.data?.metrics || {};
  const activityItems = (data?.data?.recentActivity || []).map(
    (activity: any) => {
      const iconData = activityIconMap[activity.type] || activityIconMap.wallet;
      return {
        icon: iconData.icon,
        iconBg: iconData.iconBg,
        title: activity.title,
        subtitle: activity.subtitle,
        time: activity.time,
      };
    }
  );

  return (
    <div
      className="bg-neutral-950 min-h-screen w-full p-6"
      data-name="Dashboard"
    >
      {/* Main Grid Layout */}
      <div className="grid grid-cols-2 gap-6 max-w-[1488px] mx-auto">
        {/* Metrics Container - Spans full width */}
        <div className="col-span-2 flex gap-6 items-center justify-center">
          <MetricCard
            icon={activeCustomersIcon}
            iconBg="bg-[#97ab27]"
            iconBorder="border-[#c8da5d]"
            title="Active Customers"
            value={metrics.activeCustomers?.value || "0"}
            change={metrics.activeCustomers?.change}
            changeType={metrics.activeCustomers?.changeType as "up" | "down"}
            changeText={metrics.activeCustomers?.changeText}
          />
          <MetricCard
            icon={walletsMetricIcon}
            iconBg="bg-[#00c7be]"
            iconBorder="border-[#00e2d8]"
            title="Total Wallets"
            value={metrics.totalWallets?.value || "0"}
            change={metrics.totalWallets?.change}
            changeType={metrics.totalWallets?.changeType as "up" | "down"}
            changeText={metrics.totalWallets?.changeText}
          />
          <MetricCard
            icon={transactionsIcon}
            iconBg="bg-[#0040c1]"
            iconBorder="border-[#004eeb]"
            title="Transactions Today"
            value={metrics.transactionsToday?.value || "0"}
            change={metrics.transactionsToday?.change}
            changeType={metrics.transactionsToday?.changeType as "up" | "down"}
            changeText={metrics.transactionsToday?.changeText}
          />
          <MetricCard
            icon={disputesIcon}
            iconBg="bg-[#93370d]"
            iconBorder="border-[#b54708]"
            title="Pending Disputes"
            value={metrics.pendingDisputes?.value || "0"}
          />
          <MetricCard
            icon={uptimeIcon}
            iconBg="bg-[#085d3a]"
            iconBorder="border-[#067647]"
            title="API Uptime"
            value={metrics.apiUptime?.value || "0%"}
          />
        </div>

        {/* Transaction Volume Chart - Left Column */}
        <div className="bg-[#181818] rounded-3xl overflow-hidden flex flex-col">
          <div className="border-[#313131] border-b-[0.5px] border-solid px-4 py-2">
            <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px]">
              Transaction Volume
            </p>
          </div>
          <div className="flex items-center justify-center p-4 h-[304px]">
            <img
              alt="Transaction Chart"
              className="max-w-full max-h-full"
              src={transactionChart}
            />
          </div>
        </div>

        {/* Recent Activity Feed - Right Column, spans 2 rows */}
        <div className="bg-[#181818] rounded-3xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex flex-col row-span-2">
          <div className="border-[#313131] border-b-[0.5px] border-solid p-4 shrink-0">
            <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px]">
              Recent Activity
            </p>
          </div>
          <div className="flex flex-col justify-between py-4 flex-1 overflow-y-auto">
            {activityItems.map((item: any, index: number) => (
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

        {/* Bottom row with two charts - Left Column */}
        <div className="flex gap-6">
          {/* Dispute Resolution Chart */}
          <div className="bg-[#181818] rounded-3xl overflow-hidden flex flex-col flex-1">
            <div className="border-[#313131] border-b-[0.5px] border-solid px-4 py-2 shrink-0">
              <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px]">
                Dispute Resolution
              </p>
            </div>

            {/* Bar Chart Area */}
            <div className="flex-1 overflow-hidden p-4">
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
                  <div
                    key={index}
                    className="flex flex-col items-center gap-1 w-8"
                  >
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
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                  (day) => (
                    <p
                      key={day}
                      className="font-['Nunito',sans-serif] font-medium text-[#494949] text-[10px] text-center tracking-[0.5px] uppercase"
                    >
                      {day}
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="border-[#313131] border-t-[0.5px] border-solid flex gap-8 items-center justify-center px-4 py-2 shrink-0">
              <div className="flex gap-1 items-center">
                <div className="size-2">
                  <img
                    alt="Pending"
                    className="block max-w-none size-full"
                    src={pendingLegendIcon}
                  />
                </div>
                <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[#dc6803] text-xs text-center text-nowrap tracking-[0.48px] whitespace-pre">
                  Pending
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="size-2">
                  <img
                    alt="Resolved"
                    className="block max-w-none size-full"
                    src={resolvedLegendIcon}
                  />
                </div>
                <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[#079455] text-xs text-center text-nowrap tracking-[0.48px] whitespace-pre">
                  Resolved
                </p>
              </div>
            </div>
          </div>

          {/* Top Currencies Pie Chart */}
          <div className="bg-[#181818] rounded-3xl overflow-hidden flex flex-col flex-1">
            <div className="border-[#313131] border-b-[0.5px] border-solid px-4 py-2 shrink-0">
              <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px]">
                Top Currencies
              </p>
            </div>
            <div className="flex gap-9 items-center justify-center overflow-hidden p-4 flex-1">
              <div className="flex items-center justify-center py-[22px]">
                <div className="size-[150px]">
                  <img
                    alt="Pie Chart"
                    className="block max-w-none size-full"
                    src={pieChart}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <div className="flex gap-1 items-center">
                  <div className="size-2">
                    <img
                      alt="EUR"
                      className="block max-w-none size-full"
                      src={eurLegendIcon}
                    />
                  </div>
                  <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[#ff2d55] text-xs tracking-[0.48px]">
                    EUR (10%)
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="size-2">
                    <img
                      alt="GBP"
                      className="block max-w-none size-full"
                      src={gbpLegnedIcon}
                    />
                  </div>
                  <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[#2970ff] text-xs tracking-[0.48px]">
                    GBP (15%)
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="size-2">
                    <img
                      alt="NGN"
                      className="block max-w-none size-full"
                      src={ngnLegendIcon}
                    />
                  </div>
                  <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[#bad133] text-xs tracking-[0.48px]">
                    NGN (45%)
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="size-2">
                    <img
                      alt="USD"
                      className="block max-w-none size-full"
                      src={usdLegendIcon}
                    />
                  </div>
                  <p className="font-['Nunito',sans-serif] font-medium leading-[19.2px] text-[#17b26a] text-xs tracking-[0.48px]">
                    USD (30%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
