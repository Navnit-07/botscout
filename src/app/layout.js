import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarToggle from "@/components/SidebarToggle";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cover bg-center bg-no-repeat min-h-screen`}
        style={{
    backgroundImage: "url('/background.svg')",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  }}
      >
        
       <SidebarToggle className="bg-purple-300 text-cyan-600 p-5 fixed"/>
        {children}
        <Toaster />
      </body>
    </html>
  );
}