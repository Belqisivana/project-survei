export default function ReceiptCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-sm shadow-lg">
      <div className="receipt-edge" />
      <div className="bg-white px-6 py-6 text-center space-y-5 relative">
        {children}
      </div>
      <div className="receipt-edge" style={{ transform: "scaleY(-1)" }} />
    </div>
  );
}