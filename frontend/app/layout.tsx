import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Survei Kepuasan",
  description: "Ceritakan pengalamanmu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
