import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Kuali — Order rapi, produksi siap",
  description:
    "Asisten operasional WhatsApp-first untuk UMKM kuliner. Kuali membantu mengubah chat pesanan menjadi draft order, reminder pembayaran, dan rencana produksi harian.",
  keywords: ["UMKM", "kuliner", "catering", "WhatsApp", "order", "produksi"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#E8541A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-kuali-background min-h-screen">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
