import WavingMascot from "./WavingMascot";

export default function GreetingBubble({
  avatarSrc,
  message,
}: {
  avatarSrc: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <WavingMascot src={avatarSrc} size={84} />
      <p
        className="text-sm leading-relaxed max-w-[88%] mx-auto"
        style={{ color: "#6B6558" }}
      >
        {message}
      </p>
    </div>
  );
}