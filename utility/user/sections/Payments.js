export default function Payment({ payment }) {
  if (!payment) return null;

  const { bankAccount, upiId, paypal, qrImage } = payment;

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <h2 className="text-xl text-white font-medium mb-4">Payment Information</h2>

      {bankAccount && (
        <div className="text-gray-300 mb-3">
          <p>Bank: {bankAccount.bankName}</p>
          <p>Acc No: {bankAccount.accountNumber}</p>
          <p>IFSC: {bankAccount.ifsc}</p>
        </div>
      )}

      {upiId && <p className="text-gray-300 mb-3">UPI: {upiId}</p>}

      {paypal && <p className="text-gray-300 mb-3">PayPal: {paypal}</p>}

      {qrImage && (
        <img src={qrImage} className="w-40 h-40 rounded-lg mt-3" />
      )}
    </div>
  );
}