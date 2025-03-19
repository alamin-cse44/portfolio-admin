import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Basa Finder",
  description: "Find Your Dream RentalComfort, convenience, and affordability all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${roboto.className} antialiased`}
        >
          <Toaster richColors position="top-center" />
          {children}
        </body>
      </html>
    </Providers>
  );
}
