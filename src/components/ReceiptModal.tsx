import processingReceiptIcon from "../assets/icons/processing-receipt-icon.svg";
import completedReceiptIcon from "../assets/icons/completed-receipt-icon.svg";
import failedReceiptIcon from "../assets/icons/failed-receipt-icon.svg";
import copyIcon from "../assets/icons/copy-icon.svg";
import closeIcon from "../assets/icons/close-icon.svg";

type TransactionStatus = "Processing" | "Completed" | "Failed";

export type ReceiptData = {
  service: string;
  amount: string;
  date: string;
  time?: string;
  fee?: string;
  openingBalance?: string;
  closingBalance?: string;
  referenceId?: string;
  status: TransactionStatus;
};

type ReceiptModalProps = {
  open: boolean;
  onClose: () => void;
  data: ReceiptData | null;
};

function getStatusBadge(status: TransactionStatus) {
  switch (status) {
    case "Processing":
      return {
        title: "Transaction Processing",
      };
    case "Completed":
      return {
        title: "Transaction Successful",
      };
    case "Failed":
      return {
        title: "Transaction Failed",
      };
  }
}

export default function ReceiptModal({
  open,
  onClose,
  data,
}: ReceiptModalProps) {
  if (!open || !data) return null;

  const { title } = getStatusBadge(data.status);

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-[6px] backdrop-filter bg-[rgba(0,0,0,0.5)] box-border content-stretch flex items-center justify-end p-6"
      role="dialog"
      aria-modal
      onClick={onClose}
    >
      <div
        className="bg-[#181818] box-border content-stretch flex flex-col gap-0 h-[94vh] max-h-[940px] items-center overflow-clip rounded-[40px] w-[532px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-[#313131] border-b-[0.5px] border-solid box-border content-stretch flex flex-col gap-6 items-center justify-center p-6 relative w-full">
          <div>
            {/* Status overlay icon */}
            {data.status === "Completed" && (
              <img
                src={completedReceiptIcon}
                alt="Completed"
                className="size-full"
              />
            )}
            {data.status === "Processing" && (
              <img
                src={processingReceiptIcon}
                alt="Processing"
                className="size-full"
              />
            )}
            {data.status === "Failed" && (
              <img src={failedReceiptIcon} alt="Failed" className="size-full" />
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-6 block cursor-pointer overflow-visible size-6"
          >
            <img src={closeIcon} alt="Close" className="size-full" />
          </button>

          <div className="flex flex-col items-center text-center">
            <p className="font-['Nunito',sans-serif] font-semibold text-[20px] leading-[28px] text-[#717171]">
              {title}
            </p>
          </div>
        </div>

        <div className="basis-0 box-border content-stretch flex flex-col gap-6 grow items-center min-h-px min-w-px p-6 relative w-full">
          <div className="content-stretch flex flex-col gap-3 items-center text-center">
            <p className="font-['Nunito',sans-serif] font-semibold text-[18px] leading-[25.2px] text-[#494949]">
              Amount
            </p>
            <p className="font-['Nunito',sans-serif] font-semibold text-[32px] leading-[38.4px] text-[#c0c0c0]">
              {data.amount}
            </p>
          </div>

          <div className="border-[#313131] border rounded-[16px] w-full overflow-hidden">
            <div className="border-b border-[#313131] px-6 py-3">
              <p className="font-['Nunito',sans-serif] font-semibold text-[18px] leading-[25.2px] text-[#c0c0c0]">
                Payment Details
              </p>
            </div>
            <div className="w-full">
              <Row label="Service" value={data.service} />
              {data.referenceId && (
                <Row label="Reference ID" value={data.referenceId} copyable />
              )}
              <Row label="Date" value={data.date} />
              {data.time && <Row label="Time" value={data.time} />}
              {data.fee && <Row label="Fee" value={data.fee} />}
              {data.openingBalance && (
                <Row label="Opening Balance" value={data.openingBalance} />
              )}
              {data.closingBalance && (
                <Row label="Closing Balance" value={data.closingBalance} />
              )}
            </div>
          </div>
        </div>

        <div className="p-6 w-full">
          <div className="flex items-center justify-center">
            <p className="font-['Nunito',sans-serif] text-[16px] leading-[19.2px] underline text-[#717171]">
              <span>Need Help? </span>
              <span className="text-[#C0C0C0]">Contact Support</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  copyable,
}: {
  label: string;
  value: string;
  copyable?: boolean;
}) {
  return (
    <div className="border-b last:border-b-0 border-[#313131] flex items-center max-h-[50px] px-6 py-3">
      <div className="basis-0 grow">
        <p className="font-['Nunito',sans-serif] text-[16px] leading-[25.6px] text-[#717171]">
          {label}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-['Nunito',sans-serif] text-[16px] leading-[25.6px] text-[#717171] text-right whitespace-pre">
          {value}
        </p>
        {copyable && (
          <button
            onClick={() => navigator.clipboard.writeText(value)}
            className="bg-[#313131] border border-[#494949] rounded-full p-2"
            aria-label="Copy"
          >
            <img src={copyIcon} alt="Copy" className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
