import Image from "next/image";

export default function WavingMascot({
  src,
  size = 88,
}: {
  src: string;
  size?: number;
}) {
  return (
    <div
      className="relative shrink-0 rounded-full overflow-hidden mascot-float"
      style={{
        width: size,
        height: size,
        // Cincin kuning brand + jarak krem â€” "menjinakkan" foto berwarna
        // asing supaya tetap nyatu sama palet halaman.
        boxShadow: "0 0 0 3px #FAF8F0, 0 0 0 5px #F8EC30",
      }}
    >
      <Image
        src={src}
        alt="Admin"
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </div>
  );
}