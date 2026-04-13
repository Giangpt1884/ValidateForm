import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextJS Form Validation Demo | GPT",
  description: "Minh họa 2 phương pháp Validate Form: Thủ công vs Thư viện",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
