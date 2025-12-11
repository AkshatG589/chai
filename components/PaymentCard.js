import { IndianRupee, User, Clock } from "lucide-react";
import dayjs from "dayjs";

export default function PaymentCard({ payment }) {
  const {
    sender,
    receiver,
    amount,
    comment,
    status,
    method,
    createdAt,
  } = payment;

  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-md flex justify-between items-start">
      
      {/* Left info */}
      <div>
        <div className="flex items-center gap-2 text-white text-lg font-semibold">
          <IndianRupee size={18} /> {amount}
        </div>

        <p className="text-gray-400 text-sm mt-1 capitalize">
          Status: <span className="text-gray-300">{status}</span>
        </p>

        {comment && (
          <p className="text-gray-300 text-sm mt-1">💬 {comment}</p>
        )}

        <div className="flex items-center gap-2 mt-2 text-gray-400 text-xs">
          <Clock size={14} />
          {dayjs(createdAt).format("DD MMM YYYY, hh:mm A")}
        </div>
      </div>

      {/* Right info */}
      <div className="text-right text-gray-300 text-xs">
        <p className="flex items-center gap-1 justify-end">
          <User size={14} /> From: {sender}
        </p>
        <p className="flex items-center gap-1 justify-end mt-1">
          <User size={14} /> To: {receiver}
        </p>

        <p className="mt-2 text-gray-400">{method.toUpperCase()}</p>
      </div>
    </div>
  );
}