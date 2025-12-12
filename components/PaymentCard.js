import { IndianRupee, User, Clock, MessageSquare } from "lucide-react";
import dayjs from "dayjs";

export default function PaymentCard({ payment }) {
  const {
    senderUsername,
    receiverUsername,
    amount,
    comment,
    status,
    method,
    createdAt,
  } = payment;

  // Status color mapping
  const statusColors = {
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    failed: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-sm hover:bg-white/10 transition-all">

      {/* TOP: Amount + status */}
      <div className="flex items-center justify-between">
        
        {/* Amount */}
        <div className="flex items-center gap-2 text-white text-xl font-bold">
          <IndianRupee size={20} />
          {amount}
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
            statusColors[status] || "bg-gray-500/20 text-gray-300 border-gray-500/20"
          }`}
        >
          {status}
        </span>
      </div>

      {/* COMMENT SECTION */}
      {comment && (
        <p className="text-gray-300 text-sm mt-3 flex items-center gap-2">
          <MessageSquare size={15} className="opacity-70" /> {comment}
        </p>
      )}

      {/* Divider */}
      <div className="border-t border-white/10 my-3"></div>

      {/* USER INFO + TIME */}
      <div className="flex justify-between items-end">

        {/* Left: Sender → Receiver */}
        <div className="text-sm text-gray-300 space-y-1">
          <p className="flex items-center gap-2">
            <User size={15} className="opacity-60" />
            <span className="text-gray-400">From:</span>{" "}
            <span className="text-white font-medium">@{senderUsername}</span>
          </p>

          <p className="flex items-center gap-2">
            <User size={15} className="opacity-60" />
            <span className="text-gray-400">To:</span>{" "}
            <span className="text-white font-medium">@{receiverUsername}</span>
          </p>

          <p className="text-gray-400 text-xs mt-2 tracking-wide">
            Method: <span className="text-gray-300">{method.toUpperCase()}</span>
          </p>
        </div>

        {/* Right: Time */}
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Clock size={14} className="opacity-60" />
          {dayjs(createdAt).format("DD MMM YYYY, hh:mm A")}
        </div>
      </div>
    </div>
  );
}