import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/global/Navbar";
import "./globals.css";
import "@/utils/connectToDb";
import SessionProvider from "@/components/Auth/SessionProvider";
import QueryClientProvider from "@/components/global/QueryClientProvider";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen text-black bg-[#000] ${montserrat.className}`}>
        <QueryClientProvider>
          <SessionProvider>
            <Navbar />
            <main className="p-6 flex-1 flex flex-col">
              {children}
            </main>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html >
  );
}
