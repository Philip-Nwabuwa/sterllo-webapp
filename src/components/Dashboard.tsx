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
import DisputeResolutionChart from "./common/DisputeResolutionChart";
import Transactionvolumechart from "./common/Transactionvolumechart";
import TopCurrenciesChart from "./common/TopCurrenciesChat";

// Activity icon mapping
const activityIconMap: Record<string, { icon: string; iconBg: string }> = {
  wallet: { icon: walletActivityIcon, iconBg: "bg-[#f4f8aa]" },
  dispute_resolved: { icon: disputeActivityIcon, iconBg: "bg-emerald-100" },
  transfer: { icon: transferActivityIcon, iconBg: "bg-[#e3f2fd]" },
  customer: { icon: customerActivityIcon, iconBg: "bg-[#e3f2fd]" },
  dispute_filed: { icon: disputeRedActivityIcon, iconBg: "bg-[#fbe2e2]" },
};

export default function Dashboard() {
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery({
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

  const metrics = dashboardData?.data?.metrics || {};
  const activityItems = (dashboardData?.data?.recentActivity || []).map(
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
      <div className="flex gap-4 items-end pb-6">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <p className="font-[family-name:var(--headings\/subheading-1\/family,'Nunito:SemiBold',sans-serif)] font-[var(--headings\/subheading-1-bold\/weight,600)] leading-[28.8px] text-[color:var(--colors\/grey\/100,#f7f7f7)] text-[length:var(--headings\/subheading-1\/size,24px)] tracking-[0.24px]">
              Dashboard
            </p>
            <p className="font-[family-name:var(--body\/base\/family,'Nunito:Regular',sans-serif)] font-[var(--body\/base\/weight,400)] leading-[25.6px] text-[color:var(--colors\/grey\/600,#a2a2a2)] text-[length:var(--body\/base\/size,16px)] tracking-[0.024px]">
              Welcome back! Here's what's happening with your financial
              infrastructure.{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mx-auto">
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
          <Transactionvolumechart />
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

            <DisputeResolutionChart />
          </div>

          {/* Top Currencies Pie Chart */}
          <div className="bg-[#181818] rounded-3xl overflow-hidden flex flex-col flex-1">
            <div className="border-[#313131] border-b-[0.5px] border-solid px-4 py-2 shrink-0">
              <p className="font-['Nunito',sans-serif] font-normal leading-[25.6px] text-[#f7f7f7] text-base tracking-[0.024px]">
                Top Currencies
              </p>
            </div>
            <TopCurrenciesChart />
          </div>
        </div>
      </div>
    </div>
  );
}
