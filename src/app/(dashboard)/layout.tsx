import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* left sidebar */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] flex flex-col items-start justify-start py-4 px-4 flex-shrink-0">
        <Link href="/" className="flex items-center lg:justify-start gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          {/* 👇 Only visible on large screens */}
          <span className="hidden lg:inline font-semibold text-lg">
            MySchool
          </span>
        </Link>
        <Menu />
      </div>

      {/* right side */}
      <div className="flex-1 bg-[#F7F8FA] overflow-y-auto overflow-x-hidden flex flex-col min-w-0">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
