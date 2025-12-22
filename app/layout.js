import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Shared/Navbar";
import Footer from "@/Components/Shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Project Pulse",
  description: "ProjectPulse: Real-time project health monitoring platform for IT teams. Track progress, collect client feedback, manage risks, and ensure project success with automated health scoring.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between min-h-screen`} >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
